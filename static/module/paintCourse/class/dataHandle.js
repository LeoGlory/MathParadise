/*
@学习数据控制类    @author:王辉

  ----------------------------------------------------------------------------

*/

var fzStudyData = {
  operator:projectFactory(checkPlatform()),
  //学习数据获取
  getStudyData:function(objName,callBack){
    var data = fzStudyData.operator.getStudyData(objName,callBack);
   // return data;
  },
  //学习数据保存
  saveStudyData:function(objName,objValue){
    //console.log("fzStudyData saveStudyData")
    fzStudyData.operator.saveStudyData(objName,objValue);
  },
  //学习数据删除(仅C++调用)
  deleteStudyData:function(objName){
    fzStudyData.operator.deleteStudyData(objName);
  },
  //打印调试信息
  logInf:function(txt){
    fzRecorder.operator.logInf(txt);
  },
  //创建自动播放 2016-10-14
  createAudio:null,
  //暂停动画声音 2016-10-14
  pauseAudio:null,

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
//工厂模式，根据当前操作系统，选择对应的接口
function projectFactory(param){
  //console.log("projectFactory");
  var operator;
  //C++端
  if(param==0)
  {
    operator = {
      getStudyData:function(objName,callBack){
        if(window.getStudyDataCpp == null){
            return ""
        }else{
          var value =  window.getStudyDataCpp(objName);
          callBack(value)
        } 
      },
      //学习数据保存,存入对象名和对应的值
      saveStudyData:function(objName,objValue){
        if(window.saveStudyDataCpp == null){
            return ""
        }else{
          window.saveStudyDataCpp(objName,objValue);
        } 
      },
      //学习数据删除(仅C++调用)
      deleteStudyData:function(objName){
        if(window.deleteStudyDataCpp == null){
          return ""
        }else{
            window.deleteStudyDataCpp(objName);
        } 
      },
      //打印调试信息
      logInf:function(txt){
        if(window.logInfCpp == null){
          return ""
        }else{
            window.logInfCpp(txt);
        } 
      },
    }
  }
  else if(param==1 || param==2){
    operator = {
      getStudyData:function(objName,callBack) {
        if(!window.WebViewJavascriptBridge)
            {
              return;
            }
            var data = objName;
            window.WebViewJavascriptBridge.callHandler(
                'getStudyData'
                , data
                , function(responseData) {
                    //console.log("获取学习数据 "+responseData);
                    callBack(responseData);
                    return responseData;
                }
            );
      },
      saveStudyData:function(objName,objValue) {
        if(!window.WebViewJavascriptBridge)
            {
              return;
            }
            var data = {"name":objName,"value":objValue};
            window.WebViewJavascriptBridge.callHandler(
                'saveStudyData'
                , data
                , function(responseData) {
                    //console.log("储存学习数据 "+responseData);
                }
            );
      },
      deleteStudyData:function(objName) {
        if(!window.WebViewJavascriptBridge)
            {
              return;
            }
            /*var data = objName;
            window.WebViewJavascriptBridge.callHandler(
                'deleteStudyData'
                , objName
                , function(responseData) {
                    console.log("删除学习数据 "+responseData);
                }
            );*/
      },
      logInf:function(txt) {
        if(!window.WebViewJavascriptBridge)
            {
              return;
            }
            var data = txt;
            window.WebViewJavascriptBridge.callHandler(
                'logInf'
                , data
                , function(responseData) {
                    //console.log("打印调试信息 "+responseData);
                }
            );
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
        //创建自动播放 //2016-10-14
        bridge.registerHandler('createAudio', function(data, responseCallback) {
        //log('ObjC called testJavascriptHandler with', data)
             
             //var obj = JSON.parse(data)
             //responseCallback(obj)
            if(fzStudyData.createAudio!=null)
            {
              fzStudyData.createAudio(data);
            }
             responseCallback("createAudio: "+data);
                               
      });
        //创建自动播放 //2016-10-14
        bridge.registerHandler('pauseAudio', function(data, responseCallback) {
        //log('ObjC called testJavascriptHandler with', data)
             
             //var obj = JSON.parse(data)
             //responseCallback(obj)
            if(fzStudyData.pauseAudio!=null)
            {
              fzStudyData.pauseAudio(data);
            }
             responseCallback("pauseAudio: "+data);
                               
      });

    })
  }
  return operator;
}
//兼容之前拖动课件在帧上调用这三个方法
/*function getStudyData(objName){    
        
}
function saveStudyData(objName,objValue){  
 
}
function deleteStudyData(objName)
{
   
}*/