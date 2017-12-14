/* 冒险岛涂色题 */
<template>
  <section class="colorGroup">
    <!-- <h2 class="text-center" style="text-align:center">{{title}}</h2> -->
    <back-main></back-main>
    <next-course v-show="goNext" v-on:goNextCourse="showNextCourse"></next-course>
    <div class="submitBtn" @click="checkAnswer"></div>
    <iframe src="../../../../../static/module/paintCourse/paintCourse.html" frameborder="0" id="myIframe"></iframe>
    <audio src="" id="audio"></audio>
  </section>
</template>

<script>
  import backMain from '../../../common/back'
  import nextCourse from '../../../common/nextCourse'
  export default {
    name: 'showStory',
    data () {
      return {
        title: '冒险岛涂色题',
        path: '',
        goNext: false
      }
    },
    mounted () {
      this.initVideo()
    },
    methods: {
      initVideo () {
        console.log('initVideo')
        var iframe = document.getElementById('myIframe')
        if (iframe.attachEvent) {
          iframe.attachEvent('onload', this.loadIframe)
        } else {
          iframe.onload = this.loadIframe
        }
        /* var iframe = document.getElementById('myIframe')
        iframe.onreadystatechange(function () {
          var iframeWindow = document.getElementById('myIframe').contentWindow
          var doc = iframeWindow.document
          var c = doc.getElementById('canvas')
          console.log(c)
          c.style.width = document.documentElement.clientWidth
          c.style.height = document.documentElement.clientHeight
        }) */
      },
      playWrong () {
        var audio = document.getElementById('audio')
        audio.src = '../../../../../static/mp3/wrong.mp3'
        audio.play()
      },
      playRight () {
        var audio = document.getElementById('audio')
        audio.src = '../../../../../static/mp3/ling.mp3'
        audio.play()
      },
      checkAnswer () {
        /* this.goNext = true */
        this.showNextCourse()
      },
      showNextCourse () {
        try {
          this.$store.state.a.videoBank.forEach(function (element) {
            if (this.$route.params.userName === element.belong && element.index === this.$route.params.userIndex) {
              let index = element.index + 1
              this.$store.state.a.routeRate++
              this.$router.push({name: 'showStory2', params: {userName: element.belong, userIndex: index}})
              throw this.BreakException
            }
          }, this)
        } catch (e) {
          if (e !== this.BreakException) throw e
        }
      },
      loadIframe () {
        var doc = document.getElementById('myIframe').contentWindow.document
        var c = doc.getElementById('canvas')
        console.log(c)
        c.width = document.documentElement.clientWidth
        c.height = document.documentElement.clientHeight
      }
    },
    components: {
      backMain,
      nextCourse
    }
  }
</script>
<style scoped>
  @import '../../../../style/common.scss';
  .colorGroup{width: 66.7rem;height: 37.5rem;background: #A8D8FF;position: relative;overflow: hidden}
  .submitBtn{width: 9.75rem;height:4.1rem;background: url(../../../../../static/img/done.png) no-repeat;background-size: 100%;position: absolute;right: 50%;bottom: 1rem;
    margin-right: -4.875rem;cursor: pointer}
  #myIframe{width: 100%;height: 100%;}
</style>