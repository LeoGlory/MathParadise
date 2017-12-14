/* 拖动课件 */
<template>
  <section class="courseGroup">
    <!-- <h2 class="text-center" style="text-align:center">{{this.$route.params.userTitle}}</h2> -->
    <back-main></back-main>
    <next-course v-show="goNext" v-on:goNextCourse="showNextCourse"></next-course>
    <section class="dragGroup">
        <div class="area">
          <div class="left">
              <div class="text">正方形</div>
              <ul class="leftUl"></ul>
          </div>
          <div class="right">
              <div class="text">长方形</div>
              <ul class="rightUl"></ul>
          </div>
        </div>
        <ul class="optionGroup">
            <li v-for="item in rects" class="option":class="{'choosed':item.choosed}"></li>
        </ul>
        <audio src="" id="audio"></audio>
    </section>
  </section>
</template>
<script>
  import backMain from '../../../common/back'
  import nextCourse from '../../../common/nextCourse'
  var currentDragIndex
  export default {
    name: 'showCourse',
    data () {
      return {
        title: '拖动课件',
        showPanel: false,
        oW: 0,
        oH: 0,
        currentIndex: 0,
        rightCount: 0,
        goNext: false,
        rects: [
          {
            shape: 'square',
            color: '#4860A8',
            width: '5rem',
            height: '5rem',
            choosed: false
          },
          {
            shape: 'rectangle',
            color: '#D87860',
            width: '9rem',
            height: '5rem',
            choosed: false
          },
          {
            shape: 'square',
            color: '#009000',
            width: '8rem',
            height: '8rem',
            choosed: false
          },
          {
            shape: 'rectangle',
            color: '#00C0FF',
            width: '8rem',
            height: '6rem',
            choosed: false
          },
          {
            shape: 'rectangle',
            color: '#FF6000',
            width: '6rem',
            height: '8rem',
            choosed: false
          }
        ]
      }
    },
    computed: {
    },
    mounted () {
      this.initCourse()
    },
    methods: {
      /* 初始化 */
      initCourse () {
        for (var index = 0; index < document.getElementsByClassName('option').length; index++) {
          var element = document.getElementsByClassName('option')[index]
          element.setAttribute('style', 'width:' + this.rects[index].width + ';height:' + this.rects[index].height + ';background-color:' + this.rects[index].color)
          element.addEventListener('touchstart', this.dragStart, false)
          element.addEventListener('touchmove', this.dragMove, false)
          element.addEventListener('touchend', this.dragEnd, false)
        }
      },
      dragStart (e) {
        var target = e.target

        for (var index = 0; index < this.rects.length; index++) {
          if (document.getElementsByClassName('option')[index] === target) {
            currentDragIndex = index
            this.rects[currentDragIndex].choosed = true
          }
        }

        var touches = e.touches[0]

        this.oW = touches.clientX - target.offsetLeft
        this.oH = touches.clientY - target.offsetTop

        var oLeft = touches.clientX - this.oW
        var oTop = touches.clientY - this.oH

        this.setMax(target, oLeft, oTop)
        /* 阻止页面的滑动默认事件 */
        document.addEventListener('touchmove', this.defaultEvent, false)
      },
      dragMove (e) {
        var touches = e.touches[0]
        var target = e.target

        var oLeft = touches.clientX - this.oW
        var oTop = touches.clientY - this.oH
        /* if (oLeft < 0) {
          oLeft = 0
        } else if (oLeft > document.documentElement.clientWidth - target.offsetWidth) {
          oLeft = (document.documentElement.clientWidth - target.offsetWidth)
        } */
        target.style.left = oLeft + 'px'
        target.style.top = oTop + 'px'
      },
      dragEnd (e) {
        this.rects[currentDragIndex].choosed = false
        document.removeEventListener('touchmove', this.defaultEvent, false)
        this.collisionTest(e.target)
      },
      defaultEvent (e) {
        e.preventDefault()
      },
      setMax (obj, x, y) {
        obj.style.position = 'absolute'
        this.currentIndex = this.currentIndex + 1
        obj.style.zIndex = this.currentIndex
        obj.style.left = x + 'px'
        obj.style.top = y + 'px'
      },
      /* 碰撞测试 */
      collisionTest (obj) {
        var leftArea = document.getElementsByClassName('left')[0]
        var rightArea = document.getElementsByClassName('right')[0]
        var leftContainer = document.getElementsByClassName('leftUl')[0]
        var rightContainer = document.getElementsByClassName('rightUl')[0]

        var top1 = leftArea.offsetTop
        var left1 = leftArea.offsetLeft
        var bottom1 = leftArea.offsetTop + leftArea.offsetHeight
        var right1 = leftArea.offsetLeft + leftArea.offsetWidth

        var top2 = rightArea.offsetTop
        var left2 = rightArea.offsetLeft
        var bottom2 = rightArea.offsetTop + rightArea.offsetHeight
        var right2 = rightArea.offsetLeft + rightArea.offsetWidth

        var top3 = obj.offsetTop
        var left3 = obj.offsetLeft
        var bottom3 = obj.offsetTop + obj.offsetHeight
        var right3 = obj.offsetLeft + obj.offsetWidth

        /* console.log(this.rects[currentDragIndex].shape, currentDragIndex) */

        if ((bottom3 > top1 && top3 < bottom1 && left3 < right1 && left3 > left1) || (bottom3 > top1 && top3 < bottom1 && right3 < right1 && right3 > left1) ||
        (top3 < bottom1 && bottom3 > top1 && right3 < right1 && right3 > left1) || (top3 < bottom1 && bottom3 > top1 && left3 < right1 && left3 > left1)) {
          if (currentDragIndex !== undefined && this.rects[currentDragIndex].shape === 'square') {
            this.addDragItem(leftContainer, obj)
            this.playRight()
          } else {
            this.rePosition(obj)
            this.playWrong()
          }
        } else if ((bottom3 > top2 && top3 < bottom2 && left3 < right2 && left3 > left2) || (bottom3 > top2 && top3 < bottom2 && right3 < right2 && right3 > left2) ||
        (top3 < bottom2 && bottom3 > top2 && right3 < right2 && right3 > left2) || (top3 < bottom2 && bottom3 > top2 && left3 < right2 && left3 > left2)) {
          if (currentDragIndex !== undefined && this.rects[currentDragIndex].shape === 'rectangle') {
            this.addDragItem(rightContainer, obj)
            this.playRight()
          } else {
            this.rePosition(obj)
            this.playWrong()
          }
        } else {
          this.rePosition(obj)
          this.playWrong()
        }
      },
      addDragItem (parentNode, childNode) {
        var cloneTarget = childNode.cloneNode(true)
        childNode.style.visibility = 'hidden'
        cloneTarget.classList.remove('option')
        cloneTarget.classList.remove('choosed')
        this.rePosition(cloneTarget)
        parentNode.appendChild(cloneTarget)
      },
      rePosition (obj) {
        obj.style.position = 'static'
        obj.style.left = 'auto'
        obj.style.top = 'auto'
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
        this.rightCount++
        this.checkCount()
      },
      checkCount () {
        if (this.rightCount === this.rects.length) {
          this.goNext = true
        }
      },
      showNextCourse () {
        this.$store.state.a.courseBank.forEach(function (element) {
          if (this.$route.params.userName === element.belong && element.index === 2) {
            this.$store.state.a.routeRate++
            this.$router.push({name: element.route, params: {userName: 'knowledge', userIndex: 2}})
          }
        }, this)
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
  [v-cloak]{display:none;}
  .courseGroup{width: 66.7rem;height: 37.5rem;background: #A8D8FF;position: relative;overflow: hidden}
  .dragGroup{width: 100%;height: 100%;display: flex;flex-direction: column;justify-content: space-between;}
  .dragGroup .area{display: flex;justify-content: space-around;}
  .area .left,.area .right{background: url(../../../../../static/img/panel2.png) no-repeat;width:26.4rem;height: 25.5rem;display: flex;
    justify-content: center;position: relative;background-size: 100%;}
  .leftUl,.rightUl{width: 18rem;height: 15rem;position: absolute;left: 4rem;top:8.2rem;display: flex;justify-content:space-around;flex-wrap: wrap;
    align-items: center;overflow: hidden}
  .area .text{font-family: '微软雅黑,宋体,黑体';font-size: 1.25rem;color: #F0A830;font-weight: bolder;text-align: center;height: 2rem;position: absolute;
    top: 6.5rem;left: 50%;margin-left: -2rem}
  .dragGroup .optionGroup{background-color:#CCCC00;width: 100%;height: 11.5rem; display: flex;justify-content: space-around;align-items: center;}
  .choosed{opacity: 0.7;z-index: 999}
</style>