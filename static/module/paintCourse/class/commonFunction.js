/*
	@弹出提示类    @author:王辉
	----------------------------------------------------------------------------
 */
//app端资源追加结构
var files=new Array();
var pageNum="";
var srcUrl="";
var type; //传值type;
var aTmp;
var isPc=false;
var jsonDb;//json数据
//以下四个参数为URL带入的,格式如：11AS1.html?unitId=1_1_1&sourceId=1_1_1_1_1_1&bookId=1&typeId=0
var typeId=request("typeId");
var bookId=request("bookId");
var unitId=request("unitId");
var sourceId=request("sourceId");
var rootDir="";//网页根目录
var isVertical=true;//是否是竖屏，true为全屏时竖直方向

var ishorizontal=false;//初始时的屏幕比 flase 横屏 true 竖屏
var flag = true;
var initialScale = 1.0;

browserRedirectFun();
//动态添加meta属性
var oMeta = document.createElement('meta');
var mac=checkPlatform();
if(mac==1){//安卓
    oMeta.setAttribute('content','width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0');
}
else if(mac==2 && window.devicePixelRatio >=2){//苹果
    oMeta.setAttribute('content','width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0');
    initialScale = 1;
    
}else{
    oMeta.setAttribute('content','width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0');
}
//oMeta.setAttribute('content','width=device-width, initial-scale=0.33, user-scalable=0, minimum-scale=0.33, maximum-scale=0.33');
oMeta.setAttribute('name','viewport');
var first=document.getElementsByTagName('title')[0];
var header = document.getElementsByTagName("head")[0];
header.insertBefore(oMeta,first);//在title元素之前插入

//判断浏览设备
function browserRedirectFun() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    //document.writeln("您的浏览设备为：");
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        //document.writeln("phone");
        //alert("我是移动端");
        appAction();
        isPc=false;
    } else {
        //document.writeln("pc");
        //alert("我是pc端")
        //pcAction();
        appAction();
        isPc=true;
    }   
}

function demoFunction(mycanvas){
    
}

var talkAnimateControler;
//pc端资源追加结构
function pcAction(){
    //判断课件资源：排除动画
    if(!talkAnimateControler){
        AddDome();
    }
}

function AddDome(){
    var header1 = document.getElementsByTagName("head")[0];
    var style = document.createElement("style"); // 创建一个元素节点
    style.type = "text/css";
    style.innerHTML="body{width:720px;height:1280px;margin:0 auto;display:block;}canvas{width:75%;height:75%;margin:0 auto;display:block;}";
    insertAfter(style,header1); // 因为js没有直接追加到指定元素后面的方法 所以要自己创建一个方法
}
//在指定节点后加载文件
function insertAfter(newElement, targetElement){ // newElement是要追加的元素 targetElement 是指定元素的位置
    var parent = targetElement.parentNode; // 找到指定元素的父节点
    if( parent.lastChild == targetElement ){ // 判断指定元素的是否是节点中的最后一个位置 如果是的话就直接使用appendChild方法
        parent.appendChild( newElement, targetElement);
    }else{
        parent.insertBefore( newElement,targetElement.nextSibling);
    }
}
//在指定节点前加载文件
function insertBefore(newElement, targetElement ){
    var parent = targetElement.parentNode;
    parent.insertBefore(newElement, targetElement);
}

//将js或css文件加载到title节点后面
function insertTitleAfter(newElement){
    var parent = document.getElementsByTagName("head")[0];
    var title = document.getElementsByTagName("title")[0];
    //parent.insertBefore(newElement,title.nextSibling);
}

function appAction(){
    AddScript();
}


//全屏播放
function maxWin(){
    showToolbar(false);//隐藏工具栏
    $(".top").hide();
    $(".footer").hide();
    isVertical=false;
}

//退出全屏
function minWin(){
    showToolbar(true);//显示工具栏
    $(".top").show();
    $(".footer").show();
    isVertical=true;
}

//是否显示或隐藏顶部工具栏
function showToolbar(isshow){
    var data = {"isshow":isshow};
    window.WebViewJavascriptBridge.callHandler(
	   'showToobar'
	   , data
	   , function(responseData) {                                               
		   if(isshow == flase){
				onCustomResize();
		   }
	   }
   );
}

function AddScript(){
    var headHtml,footHtml,targetObj,obj1,obj2;
    //加载脚本和CSS文件
    var a=checkPlatform();
    if(window.devicePixelRatio >=2 && a==2){
       // loadjscssfile("css/ios.css","css");
    }
    loadjscssfile("css/example.css","css");   
    loadjscssfile("css/dialog_skin.css","css");
    var scripts = [
                   "js/jquery-1.10.2.min.js",
                   "js/db.js",
                   "dialog/dialog-min.js",
                   "dialog/dialog-plus-min.js"
                   ];
    //一加载完成后就可以使用jquery
    seriesLoadScripts(scripts,function(){
	  var typeTitle="";
	  var u = window.location.href;
	  u=u.replace("source","*source");
	  rootDir=u.split('*')[0];//网页根目录
	  //切换数据源并赋给全局变量;
	  if(bookId==1){
	  jsonDb=dataJson1;
	  }
	  else if(bookId==2){
	  jsonDb=dataJson2;
	  }
	  //添加上下工具栏
	  headHtml="";
	  headHtml += '	<div class="fix_h_3c ">';
	  headHtml += '		<div class="fix_h_L w1"><a href="'+rootDir+'list.html?bookId='+bookId+'&typeId='+typeId+'"></a></div>';
	  headHtml += '		<div class="fix_h_M"></div>';
	  headHtml += '		<div class="fix_h_R w1"><a href="javascript:showMenu()" id="menuObj"></a></div>';
	  headHtml += '	</div>';
	  footHtml="";
	  footHtml += '	<div class="fix_f_3c">';
	  footHtml += '		<div class="fix_f_L w2"><a id="prevA" href="#none"></a></div>';
	  footHtml +='		<div class="fix_f_M"></div>';
	  footHtml +='		<div class="fix_f_R w2"><a id="nextA" href="#none"></a></div>';
	  footHtml +='	</div>';
	  targetObj=document.getElementsByTagName("canvas")[0];
	  obj1=document.createElement("div");
	  obj1.className="top";
	  obj1.innerHTML=headHtml;
	  insertBefore(obj1,targetObj);
	  obj2=document.createElement("div");
	  obj2.className="footer";
	  obj2.innerHTML=footHtml;
	  insertAfter(obj2, targetObj);
	  //禁用双击事件
	  //simulateDblClickTouchEvent($("body"));
	  loadMenu();//预加载菜单数据及相关的样式设置
	});
}
//触屏禁用双击事件
//用法： 
//simulateDblClickTouchEvent($('#example'));
function simulateDblClickTouchEvent(oo)
{
	var $oo = !oo?{}:$(oo);
	if( !$oo[0] ){ return false; }
	$oo.bind('touchend', function(e)
	{
		var ot = this,
		ev = e.originalEvent;
		if(ev && typeof ev.touches == 'object' && ev.touches.length > 1){ return; }
		ot.__taps = (!ot.__taps)?1:++ot.__taps;
		if( !ot.__tabstm ) // don't start it twice
		{
			ot.__tabstm = setTimeout( function()
			{
				if( ot.__taps >= 2 )
				{ ot.__taps = 0;
					$(ot).trigger('dblclick'); 
				}
				ot.__tabstm = 0;
				ot.__taps = 0;
			},800);
		}
	});
	return true;
}


//弹出列表菜单
function showMenu(){
    $("#mask").show();
    $("#droplist").animate({width: '+80%'}, "fast");
}
//关闭列表菜单
function closMenu(){
    $("#mask").hide();
    $("#droplist").animate({width: '+0%'}, "fast");
}
//预加载菜单数据及相关的样式设置
function loadMenu(){
    var curUnitTitle="";
    var str="";
    str+='<ul>';
    //从son中获取单元列表并组装HTML结构
    var obj =eval(jsonDb);
    $(obj).each(function(index){
		var unitListArray=obj[index].unitChild;
		for(var i=0;i<unitListArray.length;i++){
			var modelobj=unitListArray[i].modeChild;
			var curUnitId=unitListArray[i].unitId;
			var unitTitle=unitListArray[i].uintName;
			if(curUnitId==unitId){
				var linkArr=[];//各分类下所有链接地址数组
				var linksNum=0;
				var curItemIndex=0;//当前资源在数组中的顺序号
				
				for(var n=0;n<modelobj.length;n++){
					var stemobj=modelobj[n].stemChild;
					for(var m=0;m<stemobj.length;m++){
						var sourceobj=stemobj[m].sourceChild;
						var curStemId=stemobj[m].stemId;
						var listName=stemobj[m].stemName
						var firstUrl="";
						var sourceIndex=0;						
						var urlStemId=sourceId.substr(0,sourceId.length-2);
						var isCurSource=false;
						var urlArray=[];
						var itemsCount=0;
						if(urlStemId==curStemId){
							isCurSource=true;
						}
						var isFind=false;
						innerloop://嵌套循环
						for(var p=0;p<sourceobj.length;p++){
							var curSourceId=sourceobj[p].sourceId;
							var sourceType=sourceobj[p].typeId;
							
							//找到与当前URL资源匹配的内容
							if(sourceId==curSourceId){								
								//修改当前资源的标题名称
								curUnitTitle=unitTitle;
								var topTitle="";
								if(sourceType==1){topTitle="练习"}
								else if(sourceType==2){topTitle="故事"}
								else if(sourceType==3){topTitle="歌曲"}
								var titleWrap=document.getElementsByClassName("fix_h_M")[0];
								titleWrap.innerHTML=topTitle;
								//资源页码序号								
								var pageStr=sourceobj[p].pageNum;
								//alert("进入"+pageStr);
								$(".fix_f_M").html(pageStr);								
							}
							//只取第一个动画路径
							if(typeId==0){//如果类型为全部，就只取第一个即可...
								firstUrl=rootDir+sourceobj[0].sourceUrl+'?unitId='+unitId+'&sourceId='+sourceobj[0].sourceId+'&bookId='+bookId+'&typeId='+typeId;
								//将当前大题下所有小题的资源地址存入数组中，供翻页控件使用。
								linkArr.push(sourceobj[p].sourceUrl+'?unitId='+unitId+'&sourceId='+curSourceId+'&bookId='+bookId+'&typeId='+typeId);
								if(sourceId==curSourceId){
									curItemIndex=linksNum;
								}
								linksNum++;
							}
							else{
								if(typeId==sourceType){
									if(!isFind){
										//只需要找到一个
										firstUrl=rootDir+sourceobj[p].sourceUrl+'?unitId='+unitId+'&sourceId='+curSourceId+'&bookId='+bookId+'&typeId='+typeId;
										isFind=true;
									}
									//将当前大题下所有小题的资源地址存入数组中，供翻页控件使用。
									linkArr.push(sourceobj[p].sourceUrl+'?unitId='+unitId+'&sourceId='+curSourceId+'&bookId='+bookId+'&typeId='+typeId);
									if(sourceId==curSourceId){
										curItemIndex=linksNum;
									}
									linksNum++;
								}
							}
						}
							
						if(firstUrl!=""){
							//alert(firstUrl);
							str+='<li><a href="'+firstUrl+'">'+listName+'</a></li>';
						}
					}
				}
				//alert("当前顺序号："+curItemIndex);
				//alert(linkArr.length);
				creatPageLinks(linkArr,curItemIndex)
			}
		}
	})
    str+='</ul>';
    str='<div class="menuTitle">目录</div>'+str;
    //将菜单内容生成到body中
    maskBox=document.createElement("div");
    maskBox.id="mask";
    menuBox=document.createElement("div");
    menuBox.id="droplist";
    menuBox.innerHTML=str;
    var curLinkObj=document.getElementsByTagName("body")[0];
    curLinkObj.appendChild(maskBox);
    curLinkObj.appendChild(menuBox);
    //下拉菜单关闭事件
    $(maskBox).on('click', function(){
       closMenu();//关闭菜单
    })
}

//自动创建左右翻页按钮的地址
function creatPageLinks(linkArr,itemIndex){
    //前后翻页按钮事件
    if(linkArr.length>0){
        var nextUrl=rootDir+linkArr[itemIndex+1];
        //修改下一页链接地址
        if(itemIndex>0){
            var prevUrl=rootDir+linkArr[itemIndex-1];
            if(itemIndex==linkArr.length-1){
                $("#nextA").hide();
            }
            else{
                $("#nextA").show();
                $("#nextA").attr("href",nextUrl);
            }
            $("#prevA").show();
            $("#prevA").attr("href",prevUrl);
        }
        else{
			$("#prevA").hide();
			if(linkArr[itemIndex+1]==undefined){
				$("#nextA").hide();
			}
			else{
				$("#nextA").attr("href",nextUrl);
			}           
        }
    }
}

//动态改变资源标头类型
function ChangeTitle(sourceType){
    var titHtml="";
    if(sourceType==1){
        titHtml="练习";
    }
    else if(sourceType==2){
        titHtml="故事";
    }else if(sourceType==3){
        titHtml="歌曲";
    }
    var titleWrap=document.getElementsByClassName("fix_h_M")[0];
    titleWrap.innerHTML=titHtml;
    //$(".fix_h_M"e).html(titHtml);
}

/**
 * 串联加载指定的脚本
 * 串联加载[异步]逐个加载，每个加载完成后加载下一个
 * 全部加载完成后执行回调
 * @param array|string 指定的脚本们
 * @param function 成功后回调的函数
 * @return array 所有生成的脚本元素对象数组
 */
function seriesLoadScripts(scripts,callback) {
    if(typeof(scripts) != "object") var scripts = [scripts];
    var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
    var s = new Array(), last = scripts.length - 1, recursiveLoad = function(i) {  //递归
        s[i] = document.createElement("script");
        s[i].setAttribute("type","text/javascript");
        s[i].onload = s[i].onreadystatechange = function() { //Attach handlers for all browsers
            if(!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
                if(i != last) recursiveLoad(i + 1); else if(typeof(callback) == "function") callback();
            }
        }
        s[i].setAttribute("src",scripts[i]);
        //HEAD.appendChild(s[i]);
    };
    recursiveLoad(0);
}

// JavaScript动态添加js或CSS文件
function loadjscssfile(filename,filetype){
    var fileref;
    if(filetype == "js"){
        fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);
    }else if(filetype == "css"){
        fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);
    }
    if(typeof fileref != "undefined"){
        insertTitleAfter(fileref)
        //document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

// CAVAS动画自适应窗体
var c_canvas;
if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', onCustomLoaded, false); //firefox
    window.addEventListener('resize', onCustomResize, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', onCustomLoaded); //IE
    window.attachEvent('resize', onCustomResize); //IE
}

//var c_canvas=document.getElementById("canvas");//canvas对象
//if(c_canvas)onCustomResize(null);
/**
 * 加载完成
 */
function onCustomLoaded(e) {
    c_canvas = document.getElementById("canvas");
    onCustomResize(null);
}

/**
 * 窗口尺寸变化时，等比缩放，居中canvas
 */
function onCustomResize(e) {
    //console.log("resize");
    if (!c_canvas) return;
    var w = parseInt(c_canvas.width);
    var h = parseInt(c_canvas.height);
    var size = getViewPortSize();
    var screenScale = window.devicePixelRatio;
    
    if(flag){
        
        if(h>w){
            
            ishorizontal = true;
        }else{
            
            ishorizontal = false;
        }
        
    }
    flag = false;   
    
    var mac=checkPlatform();
    if(mac==1){//安卓
        screenScale = 1;
    }
    else if(mac==2){//苹果        
        screenScale = window.devicePixelRatio;
    }
    else{//pc
        
    }
    c_canvas.style.position = "absolute";
    if(isPc){//电脑端
        var scale = Math.min(size.w / w, size.h / h);
        //alert(scale);
        c_canvas.style.width = w * scale + "px";
        c_canvas.style.height = h * scale + "px";
        c_canvas.style.left = (size.w - w * scale) / 2 + "px";
        c_canvas.style.top = "0px";
    }
    else{//移动端
        var defaultWidth = 720;
        var defaultHeigh = 1280;
        var topBarHeigh =  40 / initialScale;
        var canvasScale =  defaultHeigh/defaultWidth;
        var threshold = 0;//阈值
        var screenWidth = size.w;
        var screenHeigh = size.h;
        var top = 0;
        var left = 0;
        var canvasWidth;
        
        var canvasHeigh;
        //alert(defaultHeigh);
        if(isVertical){
            //竖屏
            canvasWidth = screenWidth;
            canvasHeigh = screenWidth*canvasScale;            
            if(canvasHeigh > screenHeigh - topBarHeigh){                
                //canvasHeigh =screenHeigh - topBarHeigh;
            }            
            if(ishorizontal){                
                canvasHeigh = screenHeigh-40;
                canvasWidth = screenHeigh/canvasScale;                
                left = (screenWidth - canvasWidth)/2;                
                top = -topBarHeigh;
            }          
        }else{
            //横屏
            topBarHeigh = 0;
            canvasWidth = screenWidth;
            canvasHeigh = screenWidth*canvasScale;
            if(canvasHeigh - screenHeigh >=threshold){
                //canvas 太高了
                canvasHeigh = screenHeigh;
                canvasWidth = screenHeigh/canvasScale;
                left = (screenWidth - canvasWidth)/2;
            }else if(canvasHeigh - screenHeigh <= -threshold){
                //canvas 太宽了
                canvasWidth = screenWidth;
                canvasHeigh = screenWidth*canvasScale;
                top = (screenHeigh - canvasHeigh)/2;
            }
        }
        c_canvas.style.top = topBarHeigh +top + "px";
        c_canvas.style.height = canvasHeigh + "px";
        c_canvas.style.width = canvasWidth + "px";
        c_canvas.style.left = left+ "px";
    }
}

/**
 * 获取浏览器窗口的可视区域的宽度
 * @return {[type]} [description]
 */
function getViewPortSize() {
    var o = {
        "w": NaN,
        "h": NaN
    };
    o.w = document.documentElement.clientWidth || document.body.clientWidth;
    o.h = document.documentElement.clientHeight || document.body.clientHeight;
    return o;
}

/*--获取网页传递的参数：
 如获取Default.aspx?ID=123这个URL中ID的值时，调用方法：request("ID")
 --*/
function request(paras)
{
    var url = location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {}
    for (i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return returnValue;
    }
}
//检测系统
function checkPlatform(){
    //console.log("checkPlatform");
    var system =
    {   
        win : false,   
        mac : false,   
        xll : false   
    };   
    //检测平台    
    var p = navigator.platform;    
    
    system.win = p.indexOf("Win") == 0;   
    system.mac = p.indexOf("Mac") == 0;   
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0); 
    //跳转语句    
    if(system.win||system.mac||system.xll)
    { 
        //console.log("PC端");
        return 0;
    }
    else
    {
        if(navigator.userAgent.indexOf("Mac")<0)
        {
            //console.log("安卓端");
            return 1;
        }
        else
        {
            //console.log("苹果端");
            return 2;
        }
        
    }
}

//添加 callback
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }		  
    if(checkPlatform() == 1){
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
		  callback(WebViewJavascriptBridge)
		  }, false)
        return;
    }		  
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
setupWebViewJavascriptBridge(function(bridge) {
                             
	if(checkPlatform() == 1){
	bridge.init(function(message, responseCallback) {                                            
	 log('JS got a message', message)
	 var data = { 'Javascript Responds':'Wee!' }
	 log('JS responding with', data)
	 responseCallback(data)
	 })
	}
	bridge.registerHandler('closeMinWin', function(data, responseCallback) {
		judgeFullScreen(2);		
	})
})

//定时关闭的对话杠，参数为内容和定时时间
function autoCloseMsg(title,time){
	var d = dialog({
		padding:10,
		skin:'timeWin',					
		content: title
	});
	d.showModal();
		setTimeout(function () {
	d.close().remove();
	}, time);	
}