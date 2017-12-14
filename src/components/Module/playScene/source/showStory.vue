/* 视频动画 */
<template>
  <section class="videoGroup">
    <video id="video" v-bind:src="path" controls autoplay></video>
    <back-main></back-main>
    <next-course v-show="goNext" v-on:goNextCourse="showNextCourse"></next-course>
    <vodal :show="showPanel" animation="flip" @hide="showPanel = false" @resetCourse="resetCourse" @backMain="backMain" :starCount="checkedRight"></vodal>
  </section>
</template>

<script>
  import backMain from '../../../common/back'
  import nextCourse from '../../../common/nextCourse'
  import vodal from '../../../common/Vodal'
  export default {
    name: 'showStory',
    data () {
      return {
        title: '故事展示（视频）',
        path: '',
        goNext: false,
        currentVideoIndex: 1,
        videoCount: 0,
        checkedRight: -1,
        showPanel: false
      }
    },
    mounted () {
      this.initVideo()
    },
    methods: {
      initVideo () {
        this.checkedRight = 0
        this.$store.state.a.videoBank.forEach(function (element) {
          if (this.$route.params.userName === element.belong) {
            this.videoCount++
            if (element.index === this.$route.params.userIndex) {
              this.path = element.path
            }
          }
        }, this)
        document.getElementById('video').addEventListener('ended', this.checkInfo)
      },
      checkInfo () {
        if (this.$route.name === 'showStory') {
          this.currentVideoIndex++
        }
        this.goNext = true
        /* console.log('this.$route.params.userIndex:', this.$route.params.userIndex) */
        /* 冒险岛最后一个是动画且只有四个 */
        if (this.$route.name === 'showStory2' && this.$route.params.userIndex >= 4 && this.$store.state.a.routeRate !== 1) {
          this.goNext = false
          this.checkedRight = -1
          this.showPanel = true
        }
      },
      showNextCourse () {
        if (this.$route.name === 'showStory') {
          if (this.currentVideoIndex <= this.videoCount) {
            /* 动画切换 */
            this.$store.state.a.videoBank.forEach(function (element) {
              /* console.log(element.index, this.currentVideoIndex, this.$route.params.userName, element.belong) */
              if (this.$route.params.userName === element.belong && element.index === this.currentVideoIndex) {
                this.path = element.path
                this.goNext = false
              }
            }, this)
          } else {
            /* 切换到课件 */
            this.$store.state.a.courseBank.forEach(function (element) {
              if (this.$route.params.userName === element.belong && element.index === 1) {
                this.$store.state.a.routeRate++
                this.$router.push({name: element.route, params: {userName: this.$route.params.userName, userIndex: 1}})
              }
            }, this)
          }
        } else if (this.$route.name === 'showStory2') {
          /* 动画跟课件交替切换 */
          var currentIndex = 1
          this.$store.state.a.courseBank.forEach(function (element) {
            if (this.$route.params.userIndex === 4) {
              currentIndex = 1
            } else {
              currentIndex = this.$route.params.userIndex
            }
            if (this.$route.params.userName === element.belong && element.index === currentIndex) {
              this.$store.state.a.routeRate++
              this.$router.push({name: element.route, params: {userName: element.belong, userIndex: element.index}})
            }
          }, this)
        }
      },
      resetCourse () {
        /* 需要返回冒险岛第一个视频 */
        /* console.log('this.$store.state.a.routeRate1:', this.$store.state.a.routeRate) */
        this.$store.state.a.routeRate = this.$store.state.a.routeRate - 1
        let routeCount = -this.$store.state.a.routeRate
        this.$router.go(routeCount)
        this.$store.state.a.routeRate = 1
        this.showPanel = false

        this.$store.state.a.videoBank.forEach(function (element) {
          if (this.$route.params.userName === element.belong) {
            if (element.index === 1) {
              this.path = element.path
            }
          }
        }, this)
        var video = document.getElementById('video')
        video.currentTime = 0
        video.play()
      },
      backMain () {
        let routeCount = -this.$store.state.a.routeRate
        this.$router.go(routeCount)
        this.$store.state.a.routeRate = 1
        this.continueBgSnd()
        this.showPanel = false
      }
    },
    components: {
      backMain,
      nextCourse,
      vodal
    }
  }
</script>
<style scoped>
  @import '../../../../style/common.scss';
  .videoGroup{width: 66.7rem;height: 37.5rem;display: flex;justify-content: center;flex-direction:column ;align-items: center;background-color: #fff;
    position: relative}
  #video{width: 100%;height: 100%;}
</style>
