/* 点击选择正确的图形 */
<template>
  <section class="clickRectGroup">
    <back-main></back-main>
    <next-course v-show="goNext" v-on:goNextCourse="showNextCourse"></next-course>
    <h2 class="text-center title">{{title}}</h2>
    <div class="rectGroup">
        <ul class="left">
            <li v-for="item in leftLinks" class="leftItem item":class="{'choosed':item.choosed}" @click="chooseItem(item)"></li>
        </ul>
        <ul class="center">
            <li v-for="(item,index) in centerLinks" class="centerItem item":class="{'choosed':item.choosed}" @click="chooseItem(item)">
                <ul class="ceterChild" v-if="index==0">
                    <li v-for="item in centerLinks[0].links" class="centerChildItem item":class="{'choosed':item.choosed}" @click="chooseItem(item)"></li>
                </ul>
            </li>
        </ul>
        <ul class="right">
            <li v-for="item in rightLinks" class="rightItem item":class="{'choosed':item.choosed}" @click="chooseItem(item)"></li>
        </ul>
    </div>
    <div class="submitBtn" @click="checkAnswer"></div>
    <audio src="" id="audio"></audio>
  </section>
</template>

<script>
  import backMain from '../../../common/back'
  import nextCourse from '../../../common/nextCourse'
  export default {
    name: 'clickRect',
    data () {
      return {
        title: '点击图中的正方形',
        path: '',
        answerCount1: 9, /* 正确的个数 */
        goNext: false,
        leftLinks: [
          {
            belong: 'triangle',
            index: 1,
            width: '8.8rem',
            height: '6.8rem',
            path: '../../../../../static/img/triangle1.png',
            choosed: false
          },
          {
            belong: 'square',
            index: 2,
            width: '6.4rem',
            height: '6.4rem',
            path: '../../../../../static/img/square2.png',
            choosed: false
          },
          {
            belong: 'square',
            index: 3,
            width: '6.4rem',
            height: '6.4rem',
            path: '../../../../../static/img/square2.png',
            choosed: false
          },
          {
            belong: 'square',
            index: 4,
            width: '6.4rem',
            height: '6.4rem',
            path: '../../../../../static/img/square2.png',
            choosed: false
          }
        ],
        centerLinks: [
          {
            links: [
              {
                belong: 'square',
                index: 1,
                width: '3.65rem',
                height: '3.65rem',
                path: '../../../../../static/img/square1.png',
                choosed: false
              },
              {
                belong: 'square',
                index: 2,
                width: '3.65rem',
                height: '3.65rem',
                path: '../../../../../static/img/square1.png',
                choosed: false
              },
              {
                belong: 'square',
                index: 3,
                width: '3.65rem',
                height: '3.65rem',
                path: '../../../../../static/img/square1.png',
                choosed: false
              }
            ]
          },
          {
            belong: 'rectangle',
            index: 2,
            width: '15.1rem',
            height: '4.2rem',
            path: '../../../../../static/img/rectangle1.png',
            choosed: false
          },
          {
            belong: 'Arched',
            index: 3,
            width: '15.1rem',
            height: '6.7rem',
            path: '../../../../../static/img/Arched.png',
            choosed: false
          }
        ],
        rightLinks: [
          {
            belong: 'triangle',
            index: 1,
            width: '8.8rem',
            height: '6.8rem',
            path: '../../../../../static/img/triangle1.png',
            choosed: false
          },
          {
            belong: 'square',
            index: 2,
            width: '6.4rem',
            height: '6.4rem',
            path: '../../../../../static/img/square2.png',
            choosed: false
          },
          {
            belong: 'square',
            index: 3,
            width: '6.4rem',
            height: '6.4rem',
            path: '../../../../../static/img/square2.png',
            choosed: false
          },
          {
            belong: 'square',
            index: 4,
            width: '6.4rem',
            height: '6.4rem',
            path: '../../../../../static/img/square2.png',
            choosed: false
          }
        ]
      }
    },
    mounted () {
      this.initRectClick()
    },
    methods: {
      initRectClick () {
        for (var index = 0; index < document.getElementsByClassName('leftItem').length; index++) {
          var element = document.getElementsByClassName('leftItem')[index]
          var element2 = document.getElementsByClassName('rightItem')[index]
          this.addData(element, this.leftLinks, index)
          this.addData(element2, this.rightLinks, index)
        }
        for (var index1 = 0; index1 < document.getElementsByClassName('centerItem').length; index1++) {
          var element3 = document.getElementsByClassName('centerItem')[index1]
          this.addData(element3, this.centerLinks, index1)
        }
      },
      addData (element, arr, index) {
        if (arr[index].links !== undefined) {
          for (var i = 0; i < document.getElementsByClassName('centerChildItem').length; i++) {
            var el = document.getElementsByClassName('centerChildItem')[i]
            el.setAttribute('style', 'width:' + arr[0].links[i].width + ';height:' + arr[0].links[i].height + ';background:url(' + arr[0].links[i].path + ') no-repeat;background-size: 100%;')
          }
        }
        element.setAttribute('style', 'width:' + arr[index].width + ';height:' + arr[index].height + ';background:url(' + arr[index].path + ') no-repeat;background-size: 100%;')
      },
      chooseItem (item) {
        if (this.centerLinks.indexOf(item) === 0) {
          return
        }
        item.choosed = !item.choosed
      },
      checkAnswer () {
        var rightCount = 0
        var choosed = 0
        var centerlinks = this.centerLinks[0].links
        for (var index = 0; index < document.getElementsByClassName('leftItem').length; index++) {
          var element1 = this.leftLinks[index]
          var element2 = this.rightLinks[index]
          if (element1.choosed) {
            choosed++
            if (element1.belong === 'square') {
              rightCount++
            }
          }
          if (element2.choosed) {
            choosed++
            if (element2.belong === 'square') {
              rightCount++
            }
          }
        }
        if (centerlinks !== undefined) {
          for (var index1 = 0; index1 < centerlinks.length; index1++) {
            if (centerlinks[index1].choosed) {
              choosed++
              if (centerlinks[index1].belong === 'square') {
                rightCount++
              }
            }
          }
        }
        for (var index2 = 1; index2 < document.getElementsByClassName('centerItem').length; index2++) {
          var element3 = this.centerLinks[index2]
          if (element3.choosed) {
            choosed++
            if (element3.belong === 'square') {
              rightCount++
            }
          }
        }
        if (rightCount === this.answerCount1 && choosed === rightCount) {
          /* this.title = '回答正确' */
          this.playRight()
        } else {
          /* this.title = '回答错误' */
          this.playWrong()
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

        this.goNext = true
      },
      showNextCourse () {
        this.$store.state.a.courseBank.forEach(function (element) {
          if (this.$route.params.userName === element.belong && element.index === 3) {
            this.$store.state.a.routeRate++
            this.$router.push({name: element.route, params: {userName: 'knowledge', userIndex: 3}})
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
  .clickRectGroup{width: 66.7rem;height: 37.5rem;display: flex;justify-content: center;flex-direction:column ;align-items: center;
  background:url(../../../../../static/img/bg02.png);position: relative;background-size: 100%;}
  .rectGroup{width: 100%;height: 80%;display: flex;justify-content: center;align-items: center;margin-top: -3rem}
  .rectGroup .left{display: flex;flex-direction: column;align-items: center;}
  .left .leftItem{margin-top: 0.5rem;}
  .rectGroup .right{display: flex;flex-direction: column;align-items: center;}
  .right .rightItem{margin-top: 0.5rem;}
  .rectGroup .center{display: flex;flex-direction: column;align-items: center;margin-top:12rem;}
  .center .centerItem{margin-top: 0.5rem;}
  .center .ceterChild{display: flex;justify-content: center;flex-direction:row;}
  .ceterChild .centerChildItem{margin-right: 1rem}
  .title{position: absolute;left: 6rem;top: 1rem}
  .submitBtn{width: 9.75rem;height:4.1rem;background: url(../../../../../static/img/done.png) no-repeat;background-size: 100%;position: absolute;right: 50%;bottom: 1rem;
    margin-right: -4.875rem;cursor: pointer}
  .item{border: 0.2rem solid transparent;}
  .choosed{border: 0.2rem solid red;}
</style>