/* 设置 */
<template>
  <section class="setGroup">
    <section class="MainPage" v-if="!onRegistered">
      <div class="commonLoad">
        <div class="title">登录</div>
        <div class="user">
          <span class="icon icon1"><b></b></span>
          <input type="text" class="input" placeholder="请输入手机号">
        </div>
        <div class="password">
          <span class="icon icon2"><b></b></span>
          <input type="password" class="input" placeholder="请输入密码">
        </div>
        <a class="lostPass" @click="">忘记密码</a>
        <div class="loadBtn" @click="load">登录</div>
        <a class="registered" @click="registered">注册新账号</a>
      </div>
      <back-main v-show="this.$store.state.a.isLoaded"></back-main>
    </section>
    <section class="registeredPage" v-if="onRegistered">
      <div class="registeredGroup">
        <div class="title">注册</div>
        <div class="user">
          <span class="icon icon1"><b></b></span>
          <input type="text" class="input" placeholder="请输入手机号">
        </div>
        <div class="verification">
          <div class="onePart">
            <span class="icon icon3"><b></b></span>
            <input type="text" class="input" placeholder="请输入6位数验证码">
          </div>
          <span class="getCode">获取验证码</span>
        </div>
        <div class="password">
          <span class="icon icon2"><b></b></span>
          <input type="password" class="input" placeholder="请输入6位数密码,使用数字跟字母">
        </div>
        <div class="loadBtn">注册</div>
        <div class="loadNow" @click="registered">已有账号直接登录</div>
        <div class="closeBtn" @click="registered"></div>
      </div>
    </section>
    <div class="loadMovie" @click="fullScreen"></div>
  </section>
  
</template>

<script>
  import backMain from '../common/back'
  export default {
    name: 'set',
    data () {
      return {
        title: '',
        onRegistered: false
      }
    },
    components: {
      backMain
    },
    mounted () {
      this.initSet()
      this.fullScreen()
    },
    methods: {
      initSet () {
        this.pauseBgSnd()
        if (!this.$store.state.a.isLoaded) {
          var movie = document.getElementsByClassName('loadMovie')[0]
          this.$emit('click')
          movie.style.display = 'block'
          var id = setTimeout(function () {
            movie.style.display = 'none'
            clearTimeout(id)
          }, 2000)
        }
      },
      load () {
        this.$store.state.a.isLoaded = true
        this.$router.push({name: 'main'})
        this.continueBgSnd()
      },
      registered () {
        this.onRegistered = !this.onRegistered
      },
      fullScreen () {
        var element = document.documentElement
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        }
        var topContainer = document.getElementsByTagName('html')[0]
        /* var container = document.getElementsByTagName('body')[0]
        var winWidth = document.documentElement.clientWidth */
        var winHeight = document.documentElement.clientHeight
        var fontScale = winHeight / 750
        topContainer.style.fontSize = fontScale * 20 + 'px'
        /* topContainer.style.width = winWidth * fontScale + 'px'
        topContainer.style.height = winHeight + 'px'
        container.style.width = winWidth * fontScale + 'px'
        container.style.height = winHeight + 'px' */
        /* var group = document.getElementsByClassName('setGroup')[0] */
      }
    }
  }
</script>
<style scoped>
  @import '../../style/common.scss';
  .setGroup{width: 66.7rem;height: 37.5rem;background: url(../../../static/img/play_bg.png) no-repeat;background-size:100%;}

  .MainPage{width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;flex-direction:column ;}
  .commonLoad{width: 35rem;height: 30rem;display: flex;justify-content: space-around;flex-direction:column ;align-items: center}
  .title{font-size: 2.4rem;text-align: center;font-family: '微软雅黑,黑体,宋体';color: #1B2754;}
  .loadBtn{width: 26.3rem;height: 3.9rem;line-height: 3.9rem;font-size: 1.8rem;text-align: center;background:url(../../../static/img/anniu.png) no-repeat;
    color: #fff;background-size: 100% 100%;}
  .commonLoad .registered{font-size: 1.6rem;color: #283359;}
  .user,.password{width: 35rem;height: 3.8rem;font-size: 2rem;border-radius:1.9rem;border: none;background-color: #fff;}
  .icon{width:3rem;height: 3rem;background-size: 100%;display: inline-block;display: flex;justify-content: center;align-items: center}
  .icon b{width:1.6rem;height: 1.6rem;background-size: 100%;display: inline-block;}
  .user{display: flex;justify-content: center;align-items: center;}
  .password{display: flex;justify-content: center;align-items: center;}
  .icon1 b{background: url(../../../static/img/shouji.png) no-repeat;background-size:100%;}
  .icon2 b{background: url(../../../static/img/password.png) no-repeat;background-size:100%;}
  .input{width: 30rem;height: 3rem;font-size: 1.6rem;border: none;color:#666666;}
  .lostPass{font-size: 1.3rem;color: #283359;align-self: flex-end;}

  .registeredPage{width: 100%;height: 100%;display: flex;justify-content: space-around;align-items: center;flex-direction:column;position: relative}
  .registeredGroup{width: 35rem;height: 30rem;display: flex;justify-content: space-around;align-items: center;flex-direction:column;}
  .verification{display: flex;justify-content: space-around;align-items: center;width: 35rem;height: 3.8rem;font-size: 2rem;}
  .verification .onePart {width: 24rem;height: 3.8rem;border-radius:1.9rem;border: none;background-color: #fff;display: flex;justify-content: center;align-items: center;}
  .icon3 b{background: url(../../../static/img/biji.png) no-repeat;background-size:100%;}
  .verification .input{width: 19rem;}
  .loadNow{font-size: 1.6rem;color: #283359;}
  .getCode{background: url(../../../static/img/anniu_01.png) no-repeat;width: 10rem;height: 3.8rem;background-size: 100% 100%;color: #fff;
    font-size: 1.6rem;line-height: 3.8rem;text-align: center}
  .closeBtn{background: url(../../../static/img/close.png) no-repeat;width:4.05rem;height: 4.3rem;position: absolute;right: 2rem;top: 2rem;background-size:100%;}

  .name{font-size: 2.5rem;}

  .loadMovie{width: 66.7rem;height: 37.5rem;background: url(../../../static/img/loadMovie.gif) no-repeat;position: absolute;left: 0;top: 0;display: none;background-size:100%;}
</style>