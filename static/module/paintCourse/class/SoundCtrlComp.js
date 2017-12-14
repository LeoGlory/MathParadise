/*
	@声音播放控制类    @author:谭启亮
	@功能：暂停、播放、上一句、下一句。实例名要求：上一句：prevBtn,下一句：nextBtn,播放暂停组合：playMovie
	public:
		SoundCtrlComp或者fzSoundControler:对声音控制器的引用
		---------------------------------------------------------------------------
		bindControler(mycanva,sndList)//将画布绑定进来，便于操作舞台上的按钮
		params{
			mycanva:An舞台，在外面调用该函数时，传this
			sndList:声音列表数组，完整路径
		}
		用法：SoundCtrlComp.bindControler(this,["snd1.mp3","snd2.mp3","snd3.mp3"]);
		----------------------------------------------------------------------------

*/
var SoundCtrlComp = {
	_sndCtrler:null,//声音对象
	_soundList:[],//声音列表
	_soundIndex:0,//声音索引
	_interval:2,//句间隔时间，单位秒
	isPlaying:false,//是否正在播放
	delay:0,//定时器引用
	_mycanva:null, //画布引用，An的画布，含有播放、暂停、上下句按钮等
	
	bindControler:function(mycanva,sndList)
	{
		SoundCtrlComp.stopSound();
		SoundCtrlComp._mycanva = mycanva;
		SoundCtrlComp.setSoundList(sndList);
		SoundCtrlComp._mycanva.prevBtn.mouseEnabled = false;
		if(sndList.length<2)
		{
			SoundCtrlComp._mycanva.prevBtn.visible = false;
			SoundCtrlComp._mycanva.nextBtn.visible = false;
			//只有一个声音的话，播放按钮放在左边
			SoundCtrlComp._mycanva.playMovie.x = SoundCtrlComp._mycanva.prevBtn.x;
		}
		else
		{
			SoundCtrlComp._mycanva.prevBtn.visible = true;
			SoundCtrlComp._mycanva.nextBtn.visible = true;
		}
		SoundCtrlComp._mycanva.prevBtn.addEventListener("click",SoundCtrlComp.prevSound);
		SoundCtrlComp._mycanva.nextBtn.addEventListener("click",SoundCtrlComp.nextSound);
		SoundCtrlComp._mycanva.playMovie.addEventListener("click",SoundCtrlComp.playAndPause);
	},
	playAndPause:function()
	{
		if(SoundCtrlComp._mycanva.playMovie.currentFrame==0)
		{
			SoundCtrlComp.playSound();
			SoundCtrlComp._mycanva.playMovie.gotoAndStop(1);
		}
		else
		{
			SoundCtrlComp.pauseSound();
			SoundCtrlComp._mycanva.playMovie.gotoAndStop(0);
		}
	},
	playSound:function (index)
	{
		//这里不能用if(!index){}  因为index=0的时候，!index ==true，所以要老老实实写undefined

		if(index==undefined)
		{
			if(SoundCtrlComp._sndCtrler)
			{
				SoundCtrlComp.continueSound();
				return;
			}
			else
			{
				index = 0;
			}
		}
		if(index>=0 && index<SoundCtrlComp._soundList.length)
		{
			if(!SoundCtrlComp._sndCtrler)
			{
				SoundCtrlComp._sndCtrler = new Audio(SoundCtrlComp._soundList[index]);
				SoundCtrlComp.eventTester("canplaythrough");
				SoundCtrlComp.eventTester("ended");
				SoundCtrlComp.eventTester("error");
				//SoundCtrlComp.eventTester("loadstart");
				SoundCtrlComp.eventTester("pause");
				//SoundCtrlComp.eventTester("play");
				SoundCtrlComp.eventTester("playing");
				//SoundCtrlComp.eventTester("progress");
				//SoundCtrlComp.eventTester("seeked");
				//SoundCtrlComp.eventTester("volumechange");
				//SoundCtrlComp.eventTester("waiting");
				SoundCtrlComp._sndCtrler.addEventListener("pause",SoundCtrlComp.onSoundPause);
				SoundCtrlComp._sndCtrler.addEventListener("ended",SoundCtrlComp.onPlayComplete);
			}
			else
			{
				SoundCtrlComp._sndCtrler.src=SoundCtrlComp._soundList[index];
			}
			SoundCtrlComp._sndCtrler.play();
			SoundCtrlComp.isPlaying = true;
			//SoundCtrlComp.eventTester("abort");
			//SoundCtrlComp.eventTester("canplay");
			
		}
		//console.log("sound play index="+index);
		
	},
	stopSound:function()
	{
		//console.log("stop sound");
		if(SoundCtrlComp._sndCtrler)
		{
			SoundCtrlComp._sndCtrler.pause();
			SoundCtrlComp._sndCtrler.currentTime=0;
			SoundCtrlComp._sndCtrler = null;
			SoundCtrlComp._soundIndex = 0;
		}
	},
	pauseSound:function()
	{
		//console.log("pause sound");
		SoundCtrlComp.isPlaying = false;
		if(SoundCtrlComp._sndCtrler)
		{
			SoundCtrlComp._sndCtrler.pause();
		}
		clearTimeout(SoundCtrlComp.delay);
		//console.log("暂停了，清除SoundCtrlComp.delay计时")
	},
	continueSound:function()
	{
		//console.log("continue sound");
		if(SoundCtrlComp._sndCtrler)
		{
			if(!SoundCtrlComp._sndCtrler.ended)
			{
				SoundCtrlComp.isPlaying = true;
				SoundCtrlComp._sndCtrler.play();
			}
			else
			{
				SoundCtrlComp.nextSound();
			}
			
		}
	},
	nextSound:function()
	{
		SoundCtrlComp.pauseSound();
		//console.log("next sound");
		SoundCtrlComp._soundIndex++;
		SoundCtrlComp.playSound(SoundCtrlComp._soundIndex);
		SoundCtrlComp._mycanva.prevBtn.mouseEnabled = true;
		SoundCtrlComp._mycanva.playMovie.gotoAndStop(1);
		if(SoundCtrlComp._soundIndex+1>=SoundCtrlComp._soundList.length)
		{
			SoundCtrlComp._mycanva.nextBtn.mouseEnabled = false;
		}
	},
	prevSound:function()
	{
		SoundCtrlComp.pauseSound();
		//console.log("prev sound");
		SoundCtrlComp._soundIndex--;
		SoundCtrlComp.playSound(SoundCtrlComp._soundIndex);
		SoundCtrlComp._mycanva.nextBtn.mouseEnabled = true;
		SoundCtrlComp._mycanva.playMovie.gotoAndStop(1);
		if(SoundCtrlComp._soundIndex==0)
		{
			SoundCtrlComp._mycanva.prevBtn.mouseEnabled = false;
		}
	},
	setSoundList:function(arr,interval)
	{
		//console.log("set soundlist length="+arr.length);
		SoundCtrlComp._soundList = arr.slice();
		SoundCtrlComp._soundIndex = 0;
		if(interval)
		{
			SoundCtrlComp._interval = interval;
		}
	},
	onPlayComplete:function()
	{
		if(SoundCtrlComp._soundIndex+1>=SoundCtrlComp._soundList.length)
		{
			//console.log("all sounds over");
			SoundCtrlComp._sndCtrler = null;
			SoundCtrlComp._soundIndex = 0;
			var canvas = document.getElementById("canvas");
			var event = new CustomEvent('SOUND_COMPLETE', {bubbles: true, cancelable: false});
			canvas.dispatchEvent(event);
			SoundCtrlComp._mycanva.playMovie.gotoAndStop(0);
			SoundCtrlComp._mycanva.prevBtn.mouseEnabled = false;
			SoundCtrlComp._mycanva.nextBtn.mouseEnabled = true;
		}
		else
		{
			SoundCtrlComp.delay = setTimeout(SoundCtrlComp.delayComplete,SoundCtrlComp._interval*1000);
		}
		
	},
	delayComplete:function()
	{
		//console.log("SoundCtrlComp.delay时间到，下一句")
		clearTimeout(SoundCtrlComp.delay);
		SoundCtrlComp.nextSound();
	},

	onSoundPause:function()
	{
		SoundCtrlComp.isPlaying = false;
	},
	//声音测试
	eventTester:function(e)
	{  
	    SoundCtrlComp._sndCtrler.addEventListener(e,function()
	    {  
	    	var time = new Date();
	    	var timeStr = time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
	    	//console.log(timeStr,"->",e);  
	    });  

	}

	
}
var fzSoundControler = SoundCtrlComp;


