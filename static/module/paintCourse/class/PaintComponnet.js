/*
	@画图组件 封装成一个对象paintComponnet by：苗梦柯
*/

var paintComponnet = {

    sadGifURL:"../../../images/sad.png",//错误表情图片的URL位置
    emotionPara:{
        isShowEmotion:true,//是否显示表情
        showTime:500,//显示表情时间
        hideTime:500,//隐藏表情时间
        offsetX:0,//表情图X偏移量，本来是0在组件左面的，后面测试很多都显示不出来被，统一改为组件左上方
        offsetY:0//表情图Y偏移量
    },
	selectColor:"#999999",
	btnArr:null,
	colorArr:null,
	paintAreaArr:null,
	rightAnsArr:null,
	orinalColorArr:[],
	selectColorArr:[],
	tempRightCount:0,
	doneArr:[],
	b:true,
	path:(document.URL.split("/").pop()),
	data:"",
	serverDataObj:null,
	
	//初始化
	init:function (){
		var root = arguments[0] ? arguments[0] : null;//JS设置一个默认参数，可省略
		var delyTime = setTimeout(delyFun,50);
		function delyFun(){
			clearTimeout(delyTime);
			//paintComponnet.serverDataObj = paintComponnet.getDataFromCookie();
			fzStudyData.getStudyData(paintComponnet.path,paintComponnet.getDataCallBack) ;
			// console.log(paintComponnet.path+"从服务器获取的做题结果是"+paintComponnet.serverDataObj);
			/*
			//测试数据
			paintComponnet.serverDataObj = paintComponnet.validateDataFromCookie("area1,#FF9999");
			paintComponnet.tempResult ="|area1,#FF9999";
			*/
			//给调色板添加点击事件
			var i = 0;
			for(i=0;i<paintComponnet.btnArr.length;i++){
				paintComponnet.btnArr[i].name = "btn" + (i+1);
				paintComponnet.btnArr[i].addEventListener("click", paintComponnet.mouseClickHandle);
			}
			/*
			//获取已经做对题目的数量
			for(var key in paintComponnet.serverDataObj){
				paintComponnet.tempRightCount++;
			}
			*/
			//给上色区域添加点击事件
			var orinalColorArrL = paintComponnet.orinalColorArr.length;
			for(i=0;i<paintComponnet.paintAreaArr.length;i++){
				if(orinalColorArrL==0){
					//判断原始数组是否为空，是空值的话全部设置为白色
					paintComponnet.orinalColorArr[i]="#FFFFFF";
				}
				paintComponnet.selectColorArr[i] = paintComponnet.orinalColorArr[i];
				paintComponnet.paintAreaArr[i].name = "area" + (i+1);
				
				if(paintComponnet.serverDataObj==null || paintComponnet.tempRightCount!=paintComponnet.rightAnsArr.length){
					//不相等的时候说明还有正确答案没有选择出来，给上色区域添加点击事件
					paintComponnet.paintAreaArr[i].addEventListener("click", paintComponnet.arearClick);
					stage.enableMouseOver();
					paintComponnet.paintAreaArr[i].cursor = "pointer";
				}
			}
					
			//显示答案
			if(root&&root.ansBtn){
				root.ansBtn.addEventListener("click",paintComponnet.showAnswer);
			}
			
			//重置
			if(root&&root.resetBtn){
				root.resetBtn.addEventListener("click",paintComponnet.reset);
			}
			
		}
	},
	
	getDataCallBack:function(value){
       paintComponnet.serverDataObj = paintComponnet.validateDataFromCookie(value) ;
	   paintComponnet.tempRightCount = 0;
	   for(var i=0;i<paintComponnet.paintAreaArr.length;i++){
			if(paintComponnet.serverDataObj!=null && paintComponnet.serverDataObj["area" + (i+1)]){
				//说明该区域已经上过色，显示做题记录
				var rgbColor = paintComponnet.getRGBColor(paintComponnet.serverDataObj["area" + (i+1)]);
				var rgbColorArr = paintComponnet.getRGBColorArr(rgbColor);
				//console.log(paintComponnet.serverDataObj,"serverDataObjserverDataObj",paintComponnet.serverDataObj["area" + (i+1)],rgbColor,rgbColorArr);					
				paintComponnet.setColor(paintComponnet.paintAreaArr[i],rgbColorArr[0],rgbColorArr[1],rgbColorArr[2]);
				paintComponnet.paintAreaArr[i].removeEventListener("click", paintComponnet.arearClick);
				paintComponnet.paintAreaArr[i].mouseEnabled = false;
				paintComponnet.doneArr[paintComponnet.paintAreaArr[i].name] = paintComponnet.serverDataObj["area" + (i+1)];
				paintComponnet.tempRightCount++;
			}
		}
		if(paintComponnet.tempRightCount == paintComponnet.rightAnsArr.length){
			//说明所有题目全部做完了，禁止所有点击
			paintComponnet.isEnabledPaint(false,paintComponnet.btnArr);
			paintComponnet.isEnabledPaint(false,paintComponnet.paintAreaArr);
		}
    },
    tempResult:"",
    validateDataFromCookie:function (result){
      //var result = "area1,#FF00FF";//模仿数据库传过来的数据，这个是一组数据，用更多数据做测试，请用|分隔
		if (result == "" || result == null || result == undefined){
			return null;
		}else{
			paintComponnet.tempResult = "|"+result;
			var arr = result.split("|");
			var obj = [];
			for(var j= 0;j<arr.length;j++){
				var tempArr = arr[j].split(",");
				obj[tempArr[0]] = tempArr[1];
			}
			return obj;
		}	
	},
	
	//保存做题数据
	saveDataToCookie:function(data){
        fzStudyData.saveStudyData(paintComponnet.path,data)
	},
	
	arearClick:function (e) {
		var index = Number(String(e.currentTarget.name).substr(4));
		var rightColor = paintComponnet.rightAnsArr[index-1];
		// console.log("当前涂色的区域是",e.currentTarget.name,"所上的颜色是",paintComponnet.selectColor,"该区域正确的答案是",rightColor);
		var rgbColor = paintComponnet.getRGBColor(paintComponnet.selectColor);
		var rgbColorArr = paintComponnet.getRGBColorArr(rgbColor);
		//将用户选择的答案存入数组
		paintComponnet.selectColorArr[index-1] = paintComponnet.selectColor;
	
		if(paintComponnet.rightAnsArr.length > 0){
			if(paintComponnet.selectColor==rightColor||(paintComponnet.rightAnsArr.indexOf(e.currentTarget)!=-1)){
				//播放正确声音
				SoundEffect.playRight();
				paintComponnet.tempRightCount++;
				paintComponnet.setColor(e.currentTarget,rgbColorArr[0],rgbColorArr[1],rgbColorArr[2]);
				e.currentTarget.mouseEnabled = false;//点击正确后禁止在进行上色了
				paintComponnet.doneArr[e.currentTarget.name] = paintComponnet.selectColor;
			}else{
				SoundEffect.playWrong();
                //展示错误动画
                var mc = e.currentTarget;
                if(paintComponnet.emotionPara.isShowEmotion) {
                    paintComponnet.wrongMovieFun(mc,mc.x - (mc.scaleX * mc.nominalBounds.width) * 0.5 + paintComponnet.emotionPara.offsetX - 35 + 70, mc.y - (mc.scaleY * mc.nominalBounds.height) * 0.5 + paintComponnet.emotionPara.offsetY + 30 - 70);
                }
				//做错的话选择的颜色还原
				var index = paintComponnet.paintAreaArr.indexOf(e.currentTarget);
				paintComponnet.selectColorArr[index] = paintComponnet.orinalColorArr[index];
			}
		}else{
			paintComponnet.setColor(e.currentTarget,rgbColorArr[0],rgbColorArr[1],rgbColorArr[2]);
			paintComponnet.doneArr[e.currentTarget.name] = paintComponnet.selectColor;
		}

		if(paintComponnet.rightAnsArr.length!=0&&paintComponnet.rightAnsArr.length===paintComponnet.tempRightCount){
			//正确答案都找出来了，禁止做题
			paintComponnet.isEnabledPaint(false,paintComponnet.paintAreaArr);
            paintComponnet.isEnabledPaint(false,paintComponnet.btnArr);
		}
		
		//每次点击都保存数据到后台
		paintComponnet.data = "";//每次清空
		
		//console.log("已经做过的组件名字" + paintComponnet.doneArr.length,paintComponnet.doneArr);
		for(var key in paintComponnet.doneArr){
			paintComponnet.data += key +","+ paintComponnet.doneArr[key]+"|";
		}
		
		paintComponnet.data = (paintComponnet.data).substr(0,(paintComponnet.data).length-1);//剔除最后一个斜杠
		//判断是否已经拼接过已经做的题目字符串
		if(paintComponnet.data.indexOf(paintComponnet.tempResult)==-1){
			paintComponnet.data += paintComponnet.tempResult;
		}
		paintComponnet.saveDataToCookie(paintComponnet.data);
		// console.log("向服务器传送的保存数据是：data=" + paintComponnet.data);
				
	},

	mouseClickHandle:function (e){
		var index = Number(String(e.currentTarget.name).substr(3));
		paintComponnet.selectColor = paintComponnet.colorArr[index-1];
        paintComponnet.setShadowFileter(e.currentTarget,paintComponnet.colorArr[index-1]);//设置按钮点击的阴影效果
		//console.log(paintComponnet.selectColor);
	},

	//应用滤镜给影片剪辑的shape对象上色
	setColor:function (displayObject, redOffset, greenOffset, blueOffset) {
		for (var i = 0; i < displayObject.numChildren; i++) {
			var shape = displayObject.getChildAt(i);
			var colorFilters = new createjs.ColorFilter(0, 0, 0, 1, redOffset, greenOffset, blueOffset, 1)
			shape.filters = [colorFilters];
			shape.cache(shape.x - shape.parent.nominalBounds.width * 0.5, shape.y - shape.parent.nominalBounds.height * 0.5, shape.parent.nominalBounds.width, shape.parent.nominalBounds.height);
		}
	},

	//将颜色值转换为RGB的格式,
	getRGBColor:function (hex) {
		var sColor = hex.toLowerCase();
		if(sColor.length === 4){
			var sColorNew = "#";
			for(var i=1; i<4; i+=1){
				sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1)); 
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for(var i=1; i<7; i+=2){
			sColorChange.push(parseInt("0x"+sColor.slice(i,i+2))); 
		}
		return "RGB(" + sColorChange.join(",") + ")";
	},

	//将RGB三个颜色的值放到数组里面
	getRGBColorArr:function (RGB) {
		var index = RGB.indexOf("(");
		var colorStr = RGB.slice(index+1,RGB.length-1);
		return colorStr.split(",");
	},

    wrongMovieFun:function(mc,x,y){
        mc.mouseEnabled = false;//防止多次点击提交
        var bitmap = new createjs.Bitmap(paintComponnet.sadGifURL);
        if(!bitmap.parent){
            //if(bitmap.getBounds()!=null&&bitmap.getBounds()!=undefined){
            //    bitmap.regX = bitmap.getBounds().width*0.5;
            //    bitmap.regY = bitmap.getBounds().height*0.5;
            //    console.log("BITmP",bitmap.regX,bitmap.regY);
            //}
            bitmap.regX = 37;
            bitmap.regY = 35.5;
            bitmap.x = x;
            bitmap.y = y;
            stage.addChild(bitmap);
            bitmap.alpha = 0;
            bitmap.scaleX = 0;
            bitmap.scaleY = 0;
            createjs.Tween.get(bitmap,{loop:false},true)
                .to({alpha:1,scaleX:1,scaleY:1},500,createjs.Ease.elasticInOut)
                .to({alpha:1,scaleX:1,scaleY:1},paintComponnet.emotionPara.showTime,createjs.Ease.quartInOut)
                .to({alpha:0,scaleX:0,scaleY:0},paintComponnet.emotionPara.hideTime,createjs.Ease.elasticInOut)
                .call(handleComplete);

            function handleComplete() {

                //渐变完成执行
                stage.removeChild(bitmap);
                //延时结束后本组题目还没有做完，错误选项允许点击
                // console.log(mc.name,paintComponnet.rightAnsArr.length,paintComponnet.tempRightCount,"paintComponnet.doneArrpaintComponnet.doneArr")
                if(paintComponnet.rightAnsArr.length!=paintComponnet.tempRightCount){
                    mc.mouseEnabled = true;
                }
            }

        }
        stage.update();
    },


    //显示答案
	showAnswer:function (){
		var rgbColor;
		var rgbColorArr;
		if(paintComponnet.b&&paintComponnet.rightAnsArr.length>0){
			for(i=0;i<paintComponnet.rightAnsArr.length;i++){
				rgbColor = paintComponnet.getRGBColor(paintComponnet.rightAnsArr[i]);
				rgbColorArr = paintComponnet.getRGBColorArr(rgbColor);
				paintComponnet.setColor(paintComponnet.paintAreaArr[i],rgbColorArr[0],rgbColorArr[1],rgbColorArr[2]);
			}
			//禁用鼠标事件
			paintComponnet.isEnabledPaint(false,paintComponnet.paintAreaArr);
            paintComponnet.isEnabledPaint(false,paintComponnet.btnArr);
			paintComponnet.b = false;
		}else if(!paintComponnet.b&&paintComponnet.rightAnsArr.length>0){
			for(i=0;i<paintComponnet.selectColorArr.length;i++){
				rgbColor = paintComponnet.getRGBColor(paintComponnet.selectColorArr[i]);
				rgbColorArr = paintComponnet.getRGBColorArr(rgbColor);
				paintComponnet.setColor(paintComponnet.paintAreaArr[i],rgbColorArr[0],rgbColorArr[1],rgbColorArr[2]);
			}
			//响应鼠标事件
			paintComponnet.isEnabledPaint(true,paintComponnet.paintAreaArr);
            paintComponnet.isEnabledPaint(true,paintComponnet.btnArr);
			paintComponnet.b = true;
		}
	},

	//重置组件
	reset:function (){
		
		for(i=0;i<paintComponnet.orinalColorArr.length;i++){
			var rgbColor = paintComponnet.getRGBColor(paintComponnet.orinalColorArr[i]);
			var rgbColorArr = paintComponnet.getRGBColorArr(rgbColor);
			paintComponnet.setColor(paintComponnet.paintAreaArr[i],rgbColorArr[0],rgbColorArr[1],rgbColorArr[2]);
			paintComponnet.selectColorArr[i] = paintComponnet.orinalColorArr[i];
		}
		paintComponnet.isEnabledPaint(true,paintComponnet.paintAreaArr);
        paintComponnet.isEnabledPaint(true,paintComponnet.btnArr);
		paintComponnet.b = true;
		paintComponnet.tempRightCount = 0;
		paintComponnet.doneArr = [];
		paintComponnet.data = "";
	},
    //给元件添加一个阴影滤镜
    dis:null,
    setShadowFileter:function(displayObject){
        var colorValue = arguments[1] ? arguments[1] : "#000000";//JS设置一个默认参数，可省略
        if(paintComponnet.dis!=null && paintComponnet.dis!=undefined){
            paintComponnet.dis.shadow = new createjs.Shadow("#000000", 0, 0, 0);
        }
        if(displayObject!=null){
            displayObject.shadow = new createjs.Shadow(colorValue, 2, 2, 20);
        }

        paintComponnet.dis = displayObject;

    },
	//禁用或者启用上色
	isEnabledPaint:function(b,paintArr){
		if(typeof b === "boolean"){
			for(i=0;i<paintArr.length;i++){
				paintArr[i].mouseEnabled = b;
                if(paintComponnet.btnArr.indexOf(paintArr[i])!=-1){
                    paintComponnet.setShadowFileter(null);//还原按钮点击效果
                }
			}
		}
	},
	
	//创建颜色选择器，预留，暂时没用
	creatElentmentSelector:function (x, y) {
		var colorSelector = document.createElement("INPUT");
		colorSelector.setAttribute("type", "color");
		colorSelector.style.position = "absolute";
		colorSelector.className = "colorSelector";
		colorSelector.style.left = x + "px";
		colorSelector.style.top = y + "px";
		document.body.appendChild(colorSelector);
		return colorSelector;
	}
}
