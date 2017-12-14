/* 记录滑动轨迹课件 */

<template>
  <section class="courseGroup">
    <h2 class="text-center title" style="text-align:center">{{title}}</h2>
    <back-main></back-main>
    <next-course v-show="goNext" v-on:goNextCourse="showNextCourse"></next-course>
    <canvas id="myCanvas" v-show="canvasShow"></canvas>
    <div class="displayReal" v-show="!canvasShow"></div>
    <div class="nextStep" v-show="nextStep" @click="nextPage"></div>
    <audio src="" id="audio"></audio>
  </section>
</template>
<script>
    import backMain from '../../../common/back'
    import nextCourse from '../../../common/nextCourse'
    var R = 26
    var CW = 400
    var CH = 400
    var OffsetX = 0
    var OffsetY = 0
    var PointLocationArr = []
    var lineLengthArr = []
    var disX = 0
    var disY = 0

    export default {
      name: 'showCourse',
      data () {
        return {
          title: '请在轨迹点上画出长方形或者正方形',
          goNext: false,
          currentRect: null,
          curentPage: 0,
          hadDrawArr: [],
          canvasShow: true,
          nextStep: false,
          links: [
            [
              {
                belong: 'square1',
                path: '',
                width: '20rem',
                height: '20rem',
                color: '#FFC0CB',
                roate: 0
              },
              {
                belong: 'square1',
                path: '../../../../../static/img/square-box.png',
                width: '25.1rem',
                height: '24.55rem',
                color: '',
                roate: 0
              }
            ],
            [
              {
                belong: 'square2',
                path: '',
                width: '20rem',
                height: '20rem',
                color: '#9ACD32',
                roate: 45
              },
              {
                belong: 'square2',
                path: '../../../../../static/img/square_2.png',
                width: '42rem',
                height: '28rem',
                color: '',
                roate: 0
              }
            ],
            [
              {
                belong: 'rectangle',
                path: '',
                width: '30rem',
                height: '15em',
                color: '#FF8C00',
                roate: 0
              },
              {
                belong: 'rectangle',
                path: '../../../../../static/img/rectangle_1.png',
                width: '58.6rem',
                height: '15.8rem',
                color: '',
                roate: 0
              }
            ]
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
          var c = document.getElementById('myCanvas')
          c.width = CW
          c.height = CH
          disX = c.offsetLeft
          disY = c.offsetTop
          var cxt = c.getContext('2d')
          /* 两个圆之间的外距离 就是说两个圆心的距离去除两个半径 */
          var X = (CW - 2 * OffsetX - R * 2 * 3) / 2
          var Y = (CH - 2 * OffsetY - R * 2 * 3) / 2
          PointLocationArr = this.CaculateLinePointLocation(X, Y)
          this.InitEvent(c, cxt)
          this.Draw(cxt, PointLocationArr, [], null)
        },
        CaculateLinePointLocation (diffX, diffY) {
          var Re = []
          for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
              var Point = {
                X: (OffsetX + col * diffX + (col * 2 + 1) * R),
                Y: (OffsetY + row * diffY + (row * 2 + 1) * R)
              }
              Re.push(Point)
            }
          }
          /* 删掉中心的点 */
          Re.splice(4, 1)
          return Re
        },
        Draw (cxt, _PointLocationArr, _LinePointArr, touchPoint) {
          if (_LinePointArr.length > 0) {
            cxt.beginPath()
            for (var i = 0; i < _LinePointArr.length; i++) {
              var pointIndex = _LinePointArr[i]
              cxt.lineTo(_PointLocationArr[pointIndex].X, _PointLocationArr[pointIndex].Y)
            }
            cxt.lineWidth = 10
            cxt.strokeStyle = '#627eed'
            cxt.stroke()
            cxt.closePath()
            /* 跟随的线 */
            if (touchPoint !== null) {
              var lastPointIndex = _LinePointArr[_LinePointArr.length - 1]
              var lastPoint = _PointLocationArr[lastPointIndex]
              cxt.beginPath()
              cxt.moveTo(lastPoint.X, lastPoint.Y)
              cxt.lineTo(touchPoint.X, touchPoint.Y)
              cxt.stroke()
              cxt.closePath()
            }
          }
          /* 画圆点 */
          for (i = 0; i < _PointLocationArr.length; i++) {
            var Point = _PointLocationArr[i]
            cxt.fillStyle = '#627eed'
            cxt.beginPath()
            cxt.arc(Point.X, Point.Y, R, 0, Math.PI * 2, true)
            cxt.closePath()
            cxt.fill()
            cxt.fillStyle = '#ffffff'
            cxt.beginPath()
            cxt.arc(Point.X, Point.Y, R - 3, 0, Math.PI * 2, true)
            cxt.closePath()
            cxt.fill()
            /* 点击后的圆点 */
            if (_LinePointArr.indexOf(i) >= 0) {
              cxt.fillStyle = '#627eed'
              cxt.beginPath()
              cxt.arc(Point.X, Point.Y, R - 16, 0, Math.PI * 2, true)
              cxt.closePath()
              cxt.fill()
            }
          }
        },
        IsPointSelect (touches, LinePoint) {
          /* console.log('IsPointSelect') */
          for (var i = 0; i < PointLocationArr.length; i++) {
            var currentPoint = PointLocationArr[i]
            var xdiff = Math.abs(currentPoint.X - touches.pageX + disX)
            var ydiff = Math.abs(currentPoint.Y - touches.pageY + disY)
            var dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5)
            if (dir < R) {
              /* 将首尾相连的点连接起来 */
              if (LinePoint.indexOf(i) < 0 || (LinePoint.indexOf(i) === 0 && LinePoint.lastIndexOf(i) !== LinePoint.length - 1)) {
                LinePoint.push(i)
              }
              break
            }
          }
        },
        InitEvent (canvasContainer, cxt) {
          var LinePoint = []
          var self = this
          canvasContainer.addEventListener('touchstart', function (e) {
            self.IsPointSelect(e.touches[0], LinePoint)
          }, false)
          canvasContainer.addEventListener('touchmove', function (e) {
            e.preventDefault()
            var touches = e.touches[0]
            self.IsPointSelect(touches, LinePoint)
            cxt.clearRect(0, 0, CW, CH)
            self.Draw(cxt, PointLocationArr, LinePoint, {X: touches.pageX - disX, Y: touches.pageY - disY})
          }, false)
          canvasContainer.addEventListener('touchend', function (e) {
            cxt.clearRect(0, 0, CW, CH)
            self.Draw(cxt, PointLocationArr, LinePoint, null)
            /* console.log('密码结果是：' + LinePoint.join('->')) */
            self.checkRect(PointLocationArr, LinePoint)
            LinePoint = []
            lineLengthArr = []
          }, false)
        },
        checkRect (_PointLocationArr, _LinePoint) {
          var length = _LinePoint.length
          for (var i = 0; i < length; i++) {
            if (i > 0) {
              var index = _LinePoint[i]
              var index2 = _LinePoint[i - 1]
              var disX = _PointLocationArr[index].X - _PointLocationArr[index2].X
              var disY = _PointLocationArr[index].Y - _PointLocationArr[index2].Y
              var lineLength = Math.pow((disX * disX + disY * disY), 0.5)
              lineLength = Math.floor(lineLength)
              lineLengthArr.push(lineLength)
            }
          }
          var lineLengthSum = 0
          for (i = 0; i < lineLengthArr.length; i++) {
            lineLengthSum += lineLengthArr[i]
          }
          if (_LinePoint[0] !== _LinePoint[length - 1]) {
            /* console.log('非长方形跟正方形！') */
            this.playWrong()
            return false
          } else {
            /* console.log(lineLengthSum) */
            if (_LinePoint.indexOf(0) >= 0 && _LinePoint.indexOf(2) >= 0 && _LinePoint.indexOf(5) >= 0 && _LinePoint.indexOf(7) >= 0 && lineLengthSum === 174 * 8) {
              /* console.log('正方形1！') */
              this.currentRect = 'square1'
              this.playRight()
              return true
            } else if (_LinePoint.indexOf(1) >= 0 && _LinePoint.indexOf(3) >= 0 && _LinePoint.indexOf(4) >= 0 && _LinePoint.indexOf(6) >= 0 && lineLengthSum === 246 * 4) {
              /* console.log('正方形2！') */
              this.currentRect = 'square2'
              this.playRight()
              return true
            } else if ((_LinePoint.length === 5 || _LinePoint.length === 6) && lineLengthSum === 174 * 6) {
              /* console.log('长方形！') */
              this.currentRect = 'rectangle'
              this.playRight()
              return true
            } else {
              /* console.log('非长方形跟正方形！') */
              this.playWrong()
              return false
            }
          }
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

          this.nextStep = true
        },
        showNextCourse () {
          this.$store.state.a.courseBank.forEach(function (element) {
            if (this.$route.params.userName === element.belong && element.index === 5) {
              this.$store.state.a.routeRate++
              this.$router.push({name: element.route, params: {userName: 'knowledge', userIndex: 5}})
            }
          }, this)
        },
        nextPage () {
          this.canvasShow = false
          var element = document.getElementsByClassName('displayReal')[0]
          var index
          if (this.curentPage < 2) {
            if (this.currentRect === 'square1') {
              index = 0
            } else if (this.currentRect === 'square2') {
              index = 1
            } else {
              index = 2
            }
            this.checkAllRight(index)
            var w = this.links[index][this.curentPage].width
            var h = this.links[index][this.curentPage].height
            var pth = this.links[index][this.curentPage].path
            var clr = this.links[index][this.curentPage].color
            var rt = this.links[index][this.curentPage].roate

            if (pth !== '') {
              element.setAttribute('style', 'width:' + w + ';height:' + h + ';background:url(' + pth + ') no-repeat' + ';transform: rotate(' + rt + 'deg);background-size:100% 100%')
            } else {
              element.setAttribute('style', 'width:' + w + ';height:' + h + ';background-color:' + clr + ';transform: rotate(' + rt + 'deg);')
            }
            element.style.margin = '0 0 2rem 0'
          } else {
            this.pageReset()
            return
          }
          this.curentPage++
        },
        checkAllRight (num) {
          if (this.hadDrawArr.indexOf(num) < 0) {
            this.hadDrawArr.push(num)
          }
          if (this.hadDrawArr.length >= 3) {
            this.goNext = true
          }
        },
        pageReset () {
          var c = document.getElementById('myCanvas')
          var cxt = c.getContext('2d')
          this.curentPage = 0
          this.nextStep = false
          this.canvasShow = true
          cxt.clearRect(0, 0, CW, CH)
          this.Draw(cxt, PointLocationArr, [], null)
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
     .courseGroup{width: 66.7rem;height: 37.5rem;position: relative;background: url(../../../../../static/img/bg01.png);display: flex;
      justify-content: center;align-items: center;background-size: 100%;}
     .title{position: absolute;left: 5rem;top: 1rem;}
     .nextStep{background: url(../../../../../static/img/next.png) no-repeat;background-size: 100%;width:9.3rem;height:3.9rem;position: absolute;right: 50%;bottom: 1rem;
     margin-right: -4.65rem}
</style>
