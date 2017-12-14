/* 展示游戏 */
<template>
    <section class="gameGroup">
      <div class="statePanel">
        <div class="gameTitle">1.请找出与<span class="rect"></span>同类的图形。</div>
        <div class="gameState">
          <div class="index">{{this.checkedRight}}/{{this.rightAnswer}}</div>
          <div class="time">{{this.timeDisplay}}</div>
          <div class="gold">
            <div class="icon"></div>
            <div class="goldCount">10</div>
            <div class="buyGold"></div>
          </div>
        </div>
      </div>
      <div class="gameArea">
        <ul class="area">
          <li class="rectItem" v-for="item in dataLinks" @click="checkAnswer(item.index)"></li>
        </ul>
      </div>
      <vodal :show="showPanel" animation="flip" @hide="showPanel = false" @resetCourse="resetCourse" @backMain="backMain" :starCount="checkedRight"></vodal>
      <back-main></back-main>
    </section>
</template>

<script>
  import backMain from '../../../common/back'
  import vodal from '../../../common/Vodal'

  export default {
    name: 'showGame',
    data () {
      return {
        title: '游戏展示',
        rightAnswer: 0,
        checkedRight: -1,
        timeDisplay: '0:00',
        timeCount: 0,
        startTime: 0,
        time: 0,
        timeId: 0,
        showPanel: false,
        dataLinks: [
          {
            index: 1,
            belong: 'triangle', /* 三角形 */
            width: '6rem',
            height: '3.2rem'
          },
          {
            index: 2,
            belong: 'square', /* 四边形 */
            width: '4rem',
            height: '4rem'
          },
          {
            index: 3,
            belong: 'rectangle',
            width: '8.15rem',
            height: '4.4rem'
          },
          {
            index: 4,
            belong: 'hexagon', /* 六边形 */
            width: '5.6rem',
            height: '5rem'
          },
          {
            index: 5,
            belong: 'triangle',
            width: '4rem',
            height: '6.1rem'
          },
          {
            index: 6,
            belong: 'hexagon',
            width: '5.6rem',
            height: '5rem'
          },
          {
            index: 7,
            belong: 'quadrilateral',
            width: '5rem',
            height: '6.7rem'
          },
          {
            index: 8,
            belong: 'quadrilateral', /* 四边形 */
            width: '6.85rem',
            height: '3.6rem'
          },
          {
            index: 9,
            belong: 'Pentagons', /* 五边形 */
            width: '5rem',
            height: '5.45rem'
          },
          {
            index: 10,
            belong: 'rectangle',
            width: '6rem',
            height: '2.8rem'
          },
          {
            index: 11,
            belong: 'oval', /* 椭圆 */
            width: '6.7rem',
            height: '4.65rem'
          },
          {
            index: 12,
            belong: 'rectangle',
            width: '4rem',
            height: '6rem'
          },
          {
            index: 13,
            belong: 'Trapezoid',
            width: '8rem',
            height: '3.5rem'
          },
          {
            index: 14,
            belong: 'Trapezoid', /* 梯形 */
            width: '4.25rem',
            height: '4.7rem'
          },
          {
            index: 15,
            belong: 'Pentagons',
            width: '5.4rem',
            height: '5.1rem'
          },
          {
            index: 16,
            belong: 'Trapezoid',
            width: '7.1rem',
            height: '3.3rem'
          },
          {
            index: 17,
            belong: 'square',
            width: '5.05rem',
            height: '5.05rem'
          },
          {
            index: 18,
            belong: 'rectangle',
            width: '7.65rem',
            height: '4.2rem'
          },
          {
            index: 19,
            belong: 'quadrilateral',
            width: '6rem',
            height: '6rem'
          },
          {
            index: 20,
            belong: 'rectangle',
            width: '7.15rem',
            height: '3.3rem'
          }
        ]
      }
    },
    mounted () {
      this.initGame()
    },
    methods: {
      initGame () {
        this.checkedRight = 0
        for (var i = 0; i < this.dataLinks.length; i++) {
          var element = document.getElementsByClassName('rectItem')[i]
          element.setAttribute('style', 'background-size:100% 100%;width:' + this.dataLinks[i].width +
          ';height:auto' + ';background:url(../../../../../static/img/game/' + this.dataLinks[i].index + '.png) no-repeat')
          if (this.dataLinks[i].belong === 'rectangle') {
            this.rightAnswer++
          }
        }
        this.time = this.rightAnswer * 5
        this.timeHandle(this.time)

        this.startTime = new Date().getTime()
        this.timeId = setTimeout(this.fixed, 1000)
      },
      checkAnswer (index) {
        if (this.dataLinks[index - 1].belong === 'rectangle') {
          document.getElementsByClassName('rectItem')[index - 1].style.visibility = 'hidden'
          this.checkedRight++
          if (this.checkedRight === this.rightAnswer) {
            this.showPanel = true
          }
        }
      },
      timeHandle (time) {
        this.timeDisplay = Math.floor(time / 60) + ':' + Math.floor(time % 60)
      },
      fixed () {
        this.timeCount++
        var offset = new Date().getTime() - (this.startTime + this.timeCount * 1000)
        var nextTime = 1000 - offset
        if (nextTime < 0) nextTime = 0
        setTimeout(this.fixed, nextTime)
        if (this.time > 0 && !this.showPanel) {
          this.time--
          this.timeHandle(this.time)
        } else {
          clearTimeout(this.timeId)
          if (!this.showPanel) {
            this.showPanel = true
          }
        }
      },
      resetCourse () {
        /* console.log('this.$store.state.a.routeRate1:', this.$store.state.a.routeRate) */
        if (this.$store.state.a.routeRate === 1) {
          var length = document.getElementsByClassName('rectItem').length
          for (var i = length - 1; i >= 0; i--) {
            var element = document.getElementsByClassName('rectItem')[i]
            element.style.visibility = 'visible'
          }

          this.timeCount = 0
          this.time = this.rightAnswer * 5
          this.timeHandle(this.time)
          this.startTime = new Date().getTime()
          this.timeId = setTimeout(this.fixed, 1000)

          this.checkedRight = 0
          this.showPanel = false
        } else if (this.$store.state.a.routeRate > 1) {
          this.$store.state.a.routeRate = this.$store.state.a.routeRate - 1
          let routeCount = -this.$store.state.a.routeRate
          this.$router.go(routeCount)
          this.$store.state.a.routeRate = 1
          this.showPanel = false
        }
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
      vodal
    }
  }
</script>
<style scoped>
  @import '../../../../style/common.scss';
  .gameGroup{width: 66.7rem;height: 37.5rem;display: flex;justify-content: flex-start;flex-direction:column ;align-items: center;
  background: url(../../../../../static/img/game_bg.png);background-size:100% }
  .gameGroup .statePanel{background-color: #906048;width: 100%;height: 5rem;border-bottom-right-radius: 1rem;border-bottom-left-radius: 1rem;
    position: relative}
  .gameTitle{font-size: 2rem;color: #fff;line-height: 5rem;display: flex;justify-content: center;position: absolute;left: 6rem;}
  .gameTitle .rect{background: url(../../../../../static/img/t1.png) no-repeat;width: 3.25rem;height: 1.7rem;background-size: 100%;margin: 1.6rem 0.5rem;}
  .gameState {display: flex;justify-content: space-around;align-items: center;width: 25rem;position: absolute;right: 5rem;margin-top: 1rem;}
  .gameState .index{width:5rem;height:3rem;font-size: 2rem;color: #fff;background-color:#706048; padding: 0rem 1rem;border-radius: 0.5rem;line-height: 3rem;
    text-align: center}
  .gameState .time{width:5rem;height:3rem;background-color:#706048; font-size: 2rem;color: #fff;padding: 0rem 1rem;border-radius: 0.5rem;line-height: 3rem;
    text-align: center}
  .gameState .gold{width:7rem;height:3rem;font-size: 2rem;color: #fff;background-color:#706048; padding: 0rem 1rem;border-radius: 0.5rem;text-align: center;
    display: flex;justify-content: center;align-items: center;position: relative}
  .gameState .gold .icon{width: 2.13rem;height: 2.13rem;background:url(../../../../../static/img/game/gold.png) no-repeat;background-size: contain;
    position: absolute;left: 0rem;top: 0.4rem}
  .gameState .gold .goldCount{line-height: 3rem;text-align: center;font-size: 2rem;color: #fff;}
  .gameState .gold .buyGold{width: 3rem;height: 3rem;background:url(../../../../../static/img/game/goldAdd.png) no-repeat;background-size: contain;
    position: absolute;right: -1rem}
  .gameArea{width: 95%;height:28rem;}
  .gameArea ul{display: flex;justify-content: space-around;flex-wrap: wrap;width: 100%;height:28rem;margin-top:1rem }
  .gameArea ul li{margin:0 2.5rem 0 2.5rem }
</style>
