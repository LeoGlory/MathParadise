import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import util from './plugins/util'

Vue.config.productionTip = false
/* 公用方法 */
Vue.use(util)
// 路由跳转
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
}
/* eslint-disable no-new */
document.addEventListener('deviceready', function () {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
  window.navigator.splashscreen.hide()
}, false)
/* 隐藏浏览器网址栏 */
window.onload = function () {
  /* console.log('window.onload')
  if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
    var bodyTag = document.getElementsByTagName('body')[0]
    bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px'
  }
  setTimeout(function () {
    window.scrollTo(0, 1)
  }, 0) */
  /* // 判断各种浏览器，找到正确的方法
  function launchFullscreen (element) {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
  }
  // 启动全屏!
  launchFullscreen(document.documentElement)  *//* 整个网页 */
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
