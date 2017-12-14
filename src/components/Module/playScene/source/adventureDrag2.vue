/* 冒险岛拖动课件2 */
<template>
  <section class="adventureDragGroup">
    <h2 class="text-center" style="text-align:center">{{this.$route.params.userTitle}}</h2>
    <back-main></back-main>
    <next-course v-show="goNext" v-on:goNextCourse="showNextCourse"></next-course>
    <section class="dragGroup">
        <div class="area">
          <div class="left">
              <ul class="leftUl"></ul>
          </div>
          <div class="right">
              <ul class="rightUl"></ul>
          </div>
        </div>
        <ul class="optionGroup">
            <li v-for="item in rects" class="option":class="{'choosed':item.choosed}"></li>
        </ul>
        <div class="submitBtn" @click="checkAnswer"></div>
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
        title: '冒险岛拖动课件2',
        showPanel: false,
        oW: 0,
        oH: 0,
        currentIndex: 0,
        goNext: false,
        rects: [
          {
            shape: 'triangle',
            width: '5.1rem',
            height: '5.1rem',
            choosed: false
          },
          {
            shape: 'triangle',
            width: '8.4rem',
            height: '4.2rem',
            choosed: false
          },
          {
            shape: 'triangle',
            width: '2.8rem',
            height: '2.8rem',
            choosed: false
          },
          {
            shape: 'square',
            width: '5.7rem',
            height: '5.7rem',
            choosed: false
          },
          {
            shape: 'rectangle',
            width: '6.55rem',
            height: '2.4rem',
            choosed: false
          },
          {
            shape: 'triangle',
            width: '4.5rem',
            height: '4.5rem',
            choosed: false
          },
          {
            shape: 'triangle',
            width: '3.35rem',
            height: '3.35rem',
            choosed: false
          },
          {
            shape: 'rectangle',
            width: '10.65rem',
            height: '4rem',
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
          if (index < 9) {
            element.setAttribute('style', 'width:' + this.rects[index].width + ';height:' + this.rects[index].height + ';background:url(../../../../../static/img/adventure/20' +
          (index + 1) + '.png) no-repeat;background-size: 100%;')
          } else {
            element.setAttribute('style', 'width:' + this.rects[index].width + ';height:' + this.rects[index].height + ';background:url(../../../../../static/img/adventure/2' +
          (index + 1) + '.png) no-repeat;background-size: 100%;')
          }
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
        /* var cloneTarget = childNode.cloneNode(true)
        cloneTarget.classList.remove('choosed') */

        var touches = e.touches[0]

        this.oW = touches.clientX - target.offsetLeft
        this.oH = touches.clientY - target.offsetTop

        var oLeft = touches.clientX - this.oW
        var oTop = touches.clientY - this.oH

        /* target.style.left = oLeft + 'px'
        target.style.top = oTop + 'px' */
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
          this.addDragItem(leftContainer, obj)
        } else if ((bottom3 > top2 && top3 < bottom2 && left3 < right2 && left3 > left2) || (bottom3 > top2 && top3 < bottom2 && right3 < right2 && right3 > left2) ||
        (top3 < bottom2 && bottom3 > top2 && right3 < right2 && right3 > left2) || (top3 < bottom2 && bottom3 > top2 && left3 < right2 && left3 > left2)) {
          this.addDragItem(rightContainer, obj)
        } else {
          this.rePosition(obj)
        }
      },
      addDragItem (parentNode, childNode) {
        var cloneTarget = childNode.cloneNode(true)
        var heightCount = 0
        /* childNode.style.visibility = 'hidden' */
        cloneTarget.classList.remove('option')
        cloneTarget.classList.remove('choosed')
        this.rePosition(childNode)
        this.rePosition(cloneTarget)
        /* console.log(parentNode.children) */
        for (var index = 0; index < parentNode.children.length; index++) {
          heightCount += parseInt(parentNode.children[index].style.height)
        }
        /* console.log(heightCount) */
        if (heightCount > 20) {
          return
        }
        if (parentNode.children[0]) {
          parentNode.insertBefore(cloneTarget, parentNode.children[0])
        } else {
          parentNode.appendChild(cloneTarget)
        }
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
  .adventureDragGroup{width: 66.7rem;height: 37.5rem;background:url(../../../../../static/img/adventure/ad_bg2.png);background-size: 100%;position: relative;overflow: hidden;
  display: flex;justify-content: center}
  .dragGroup{width: 100%;height: 100%;display: flex;flex-direction: row;justify-content: space-between;align-items: center}
  .dragGroup .area{width:45rem;height:100%;display: flex;justify-content: space-around;align-items:flex-end;}
  .area .left,.area .right{width:20rem;height: 23rem;display: flex;justify-content: center;flex-direction: column;align-items: center;position: relative;
    margin-bottom: 1rem}
  .leftUl,.rightUl{width: 15rem;height: 23rem;display: flex;justify-content:flex-end;/* flex-wrap: wrap; */flex-direction: column;
    align-items: center;overflow: hidden;background-color: transparent;border: 0.2rem dashed #fff;border-radius:1rem;}
  .dragGroup .optionGroup{background-color:rgba(255, 255, 255, 0.3);width: 20rem;height: 30rem; display: flex;justify-content: space-around;align-items: center;flex-wrap: wrap;
    border-bottom-left-radius:1rem;align-self: flex-start;}
  .submitBtn{width: 9.75rem;height:4.1rem;background: url(../../../../../static/img/done.png) no-repeat;background-size: 100%;position: absolute;right: 5rem;bottom: 1rem;
    cursor: pointer}
  /* .option{margin: 0 1rem;}
  .choosed{opacity: 0.7;z-index: 999} */
</style>