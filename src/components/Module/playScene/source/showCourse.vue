/* 冒险岛（题库）交互课件 */
<template>
  <section class="courseGroup">
    <h2 class="text-center" style="text-align:center">{{this.$route.params.userTitle}}</h2>
    <back-main></back-main>
    <section class="questionGroup">
      <div id="title"></div>
      <div id="pic"></div>
      <ul id="option">
        <li class='answerOption' v-for="item in this.optionArr" @click="checkAnswer">{{item.answer}}</li>
      </ul>
    </section>
    <section class="panelGroup" v-show="showPanel">
      <div class="panel">
        <div class="Evaluation">棒极了！</div>
        <div class="rightCount">答对题数：</div>
        <div class="goldCount">获得金币：</div>
        <div class="backMain" @click="backMain">返回重做</div>
      </div>
    </section>
  </section>
</template>

<script>
  import backMain from '../../../common/back'
  /* import { mapState } from 'vuex' */
  export default {
    name: 'showCourse',
    data () {
      return {
        title: '课件展示（课件）',
        optionArr: [],
        currentindex: 0,
        showPanel: false
      }
    },
    computed: {
      /* ...mapState(['exercisesBank']),
      exercisesBank () {
        return this.$store.state.exercisesBank
      } */
    },
    mounted () {
      this.initCourse()
    },
    methods: {
      /* 初始化 */
      initCourse () {
        this.addQuestion(0)
        this.currentindex = 0
      },
      /* 添加题目 */
      addQuestion (index) {
        /* console.log('index', index) */
        this.optionArr = []
        this.optionArr = this.$store.state.a.exercisesBank[index].option.slice()
        document.getElementById('pic').setAttribute('style', 'background:url(' + this.$store.state.a.exercisesBank[index].picPath + ') no-repeat')
        document.getElementById('title').innerHTML = this.$store.state.a.exercisesBank[index].question
      },
      /* 检查答案 */
      checkAnswer (e) {
        /* 改变选中框的颜色 */
        for (var i = 0; i < document.getElementsByClassName('answerOption').length; i++) {
          document.getElementsByClassName('answerOption')[i].setAttribute('style', 'border-color:#ccc')
        }
        e.target.setAttribute('style', 'border-color:#0033FF')

        var answer = String(this.$store.state.a.exercisesBank[this.currentindex].rightAnswer)
        console.log(answer, e.target.innerHTML)
        if (e.target.innerHTML === answer) {
         /*  console.log('right ！') */
          this.$store.state.a.exercisesBank[this.currentindex].isRight = true
        } else {
          /* console.log('wrong ！') */
          this.$store.state.a.exercisesBank[this.currentindex].isRight = false
        }
        this.$store.state.a.exercisesBank[this.currentindex].isCheck = true

        if (this.currentindex < this.$store.state.a.exercisesBank.length - 1) {
          this.currentindex ++
          this.addQuestion(this.currentindex)
        } else {
          this.showData()
          this.showPanel = !this.showPanel
        }
      },
      showData () {
        var rightNum = 0
        var goldNum = 0
        for (var i = 0; i < this.$store.state.a.exercisesBank.length; i++) {
          if (this.$store.state.a.exercisesBank[i].isRight) {
            rightNum++
          }
        }
        goldNum = rightNum * 10
        document.getElementsByClassName('rightCount')[0].innerHTML = '答对题数：' + rightNum
        document.getElementsByClassName('goldCount')[0].innerHTML = '获得金币：' + goldNum
      },
      backMain () {
        this.showPanel = !this.showPanel
        this.resetSelf()
      },
      resetSelf () {
        this.currentindex = 0
        this.addQuestion(0)
      }
    },
    components: {
      backMain
    }
  }
</script>
<style>
  @import '../../../../style/common.scss';
  .courseGroup{width: 66.7rem;height: 37.5rem;background: #fff;position: relative}

  .questionGroup{width: 100%;height: 32rem;margin-top:3rem;display: flex;justify-content: space-between;flex-direction: column;}
  .questionGroup #pic{width: 100%;height: 25rem;background-size:cover; }
  .questionGroup ul{display: flex;justify-content: space-around;}
  .questionGroup ul li{width:16.4rem;height: 3rem;font-family: 'Arial';font-size: 2rem;background-color:#fff;text-align: center;line-height: 3rem;
    border: 0.1rem solid #ccc;}

  .panelGroup{width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;background-color: rgba(0,0,0,0.3);position: absolute;
    left: 0;top: 0;text-align: center}
  .panelGroup .panel{width: 40rem;height: 25rem;background-color:#99CCFF;border: 0.1rem solid #000;border-radius: 0.5rem;display: flex;
    justify-content: center; flex-direction: column;align-items: center}
  .panelGroup .Evaluation{width: 20rem;height: 5rem;line-height: 5rem;font-family: '微软雅黑';font-size: 2rem;color: red;}
  .panelGroup .rightCount{width: 20rem;height: 5rem;line-height: 5rem;font-family: '微软雅黑';font-size: 1.5rem;}
  .panelGroup .goldCount{width: 20rem;height: 5rem;line-height: 5rem;font-family: '微软雅黑';font-size: 1.5rem;}
  .panelGroup .backMain{width: 10rem;height: 5rem;line-height: 5rem;font-family: '微软雅黑';font-size: 1.5rem;background: #CCCC00;
    border: 0.1rem solid #fff;border-radius: 0.5rem;}
</style>
