/* 点击选择正确的图形2 */
<template>
  <section class="clickRectGroup">
    <back-main></back-main>
    <next-course v-show="goNext" v-on:goNextCourse="showNextCourse"></next-course>
    <h2 class="text-center title">{{title}}</h2>
    <div class="rectGroup">
        <ul class="rowGroup1 group">
            <li v-for="item in Links1" class="item":class="{'choosed':item.choosed}" @click="chooseItem(item)"></li>
        </ul>
        <ul class="rowGroup2 group">
            <li v-for="item in Links2" class="item":class="{'choosed':item.choosed}" @click="chooseItem(item)"></li>
        </ul>
        <ul class="rowGroup3 group">
            <li v-for="item in Links3" class="item":class="{'choosed':item.choosed}" @click="chooseItem(item)"></li>
        </ul>
        <ul class="rowGroup4 group">
            <li v-for="item in Links4" class="item":class="{'choosed':item.choosed}" @click="chooseItem(item)"></li>
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
        title: '点击图中的长方形',
        path: '',
        answerCount: 3, /* 正确的个数 */
        goNext: false,
        Links1: [
          {
            belong: 'rectangle',
            index: 1,
            width: '19.75rem',
            height: '5.2rem',
            path: '../../../../../static/img/rectangle2.png',
            choosed: false
          }
        ],
        Links2: [
          {
            belong: 'square',
            index: 1,
            width: '7.45rem',
            height: '7.45rem',
            path: '../../../../../static/img/square3.png',
            choosed: false
          }
        ],
        Links3: [
          {
            belong: 'triangle',
            index: 1,
            width: '4.3rem',
            height: '7.4rem',
            path: '../../../../../static/img/triangle2.png',
            choosed: false
          },
          {
            belong: 'rectangle',
            index: 1,
            width: '19.75rem',
            height: '7.45rem',
            path: '../../../../../static/img/rectangle3.png',
            choosed: false
          },
          {
            belong: 'triangle',
            index: 1,
            width: '4.3rem',
            height: '7.4rem',
            path: '../../../../../static/img/triangle3.png',
            choosed: false
          }
        ],
        Links4: [
          {
            belong: 'triangle',
            index: 1,
            width: '6.75rem',
            height: '7.45rem',
            path: '../../../../../static/img/triangle4.png',
            choosed: false
          },
          {
            belong: 'rectangle',
            index: 1,
            width: '14.95rem',
            height: '7.45rem',
            path: '../../../../../static/img/rectangle3.png',
            choosed: false
          },
          {
            belong: 'triangle',
            index: 1,
            width: '6.75rem',
            height: '7.45rem',
            path: '../../../../../static/img/triangle4.png',
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
        var group = document.getElementsByClassName('group')
        for (var i = 0; i < document.getElementsByClassName('group').length; i++) {
          var groupLinks = this['Links' + (i + 1)]
          for (var index = 0; index < groupLinks.length; index++) {
            var element = group[i].getElementsByClassName('item')[index]
            this.addData(element, groupLinks, index)
          }
        }
      },
      addData (element, arr, index) {
        element.setAttribute('style', 'width:' + arr[index].width + ';height:' + arr[index].height + ';background:url(' + arr[index].path + ') no-repeat;background-size: 100%;')
      },
      chooseItem (item) {
        item.choosed = !item.choosed
      },
      checkAnswer () {
        var rightCount = 0
        var choosed = 0
        var dataElement
        for (var index = 0; index < document.getElementsByClassName('group').length; index++) {
          var groupLinks = this['Links' + (index + 1)]
          for (var i = 0; i < groupLinks.length; i++) {
            dataElement = groupLinks[i]
            if (dataElement.choosed) {
              choosed++
              if (dataElement.belong === 'rectangle') {
                rightCount++
              }
            }
          }
        }
        if (rightCount === this.answerCount && choosed === rightCount) {
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
          if (this.$route.params.userName === element.belong && element.index === 4) {
            this.$store.state.a.routeRate++
            this.$router.push({name: element.route, params: {userName: 'knowledge', userIndex: 4}})
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
  .title{position: absolute;left: 6rem;top: 1rem}
  .rectGroup{width: 100%;height: 80%;display: flex;justify-content: center;align-items: center;flex-direction:column;margin-top: -3rem}
  .rectGroup ul{display: flex;justify-content: center;}

  .submitBtn{width: 9.75rem;height:4.1rem;background: url(../../../../../static/img/done.png) no-repeat;background-size: 100%;position: absolute;right: 50%;bottom: 1rem;
    margin-right: -4.875rem;cursor: pointer}
  .item{border: 0.2rem solid transparent;}
  .choosed{border: 0.2rem solid red;}
</style>