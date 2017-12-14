/* 知识岛 */
<template>
  <section class="knowledgeContainer">
     <back-main></back-main>
     <!-- <go-mall></go-mall> -->
     <page-control></page-control>
     <section class="knowledgeGroup">
       <ul v-if="!isShowPanel" class="optionGroup">
         <li @click="showPanel" v-for="item in pointLinks" class="choose_option"></li>
       </ul>
       <div class="choosePanel" v-else>
         <ul class="panel">
           <li v-for="item in links" @click="goRoute(item.route,item.index)"></li>
        </ul>
        <span class="closeBtn" @click="showPanel"></span>
        <span class="title"></span>
       </div>
     </section>
  </section>
</template>

<script>
  import backMain from '../../common/back'
  import goMall from '../../common/mall'
  import pageControl from '../../common/pageControl'
  export default {
    name: 'knowledge',
    data () {
      return {
        title: '',
        isShowPanel: false,
        links: [
          {
            index: 1,
            title: '动画',
            route: 'showStory'
          },
          {
            index: 2,
            title: '课件',
            route: 'dragCourse'
          },
          {
            index: 3,
            title: '游戏',
            route: 'showGame'
          }
        ],
        pointLinks: [
          {
            index: 1,
            route: '',
            name: '三角形'
          },
          {
            index: 2,
            route: '',
            name: '长方形跟正方形'
          },
          {
            index: 3,
            route: '',
            name: '平行四边形'
          },
          {
            index: 4,
            route: '',
            name: '圆'
          },
          {
            index: 5,
            route: '',
            name: '梯形跟其它平面图形'
          },
          {
            index: 6,
            route: '',
            name: '平面图形之间的关系'
          }
        ]
      }
    },
    components: {
      backMain,
      goMall,
      pageControl
    },
    mounted () {
      this.initCurPage()
    },
    methods: {
      initCurPage () {
        /* console.log(this.$store.state.a.routeRate)
        if (this.$store.state.a.routeRate > 1) {
          this.showPanel = true
        } */
      },
      showPanel (e) {
        var optionIndex
        for (var index = 0; index < document.getElementsByClassName('choose_option').length; index++) {
          var element = document.getElementsByClassName('choose_option')[index]
          if (element === e.target) {
            optionIndex = index
          }
        }
        if (optionIndex === 1 || e.target.className === 'closeBtn') {
          this.isShowPanel = !this.isShowPanel
        }
      },
      goRoute (route, index) {
        this.$router.push({name: route, params: {userName: 'knowledge', userIndex: index}})
        this.pauseBgSnd()
      }
    }
  }
</script>
<style scoped>
    @import '../../../style/common.scss';
    .knowledgeContainer{width: 66.7rem;height: 37.5rem;display: flex;align-items: center;justify-content: space-between;
        position: relative;background: url(../../../../static/img/knowledgeBg.png) no-repeat;background-size:100%;}
    .knowledgeGroup{width: 100%;height: 100%;}
    .knowledgeGroup ul{width: 100%;height: 100%;display: flex;justify-content: space-around;align-items: center;flex-wrap: wrap;}
    .knowledgeGroup ul .choose_option{margin: 2rem 4rem 2.5rem 4rem;}
    .knowledgeGroup ul .choose_option:nth-child(1){width: 9.4rem;height: 8rem;background: url(../../../../static/img/point01.png) no-repeat;background-size: 100%;
      margin-top: -1rem}
    .knowledgeGroup ul .choose_option:nth-child(2){width: 12.7rem;height: 10.5rem;background: url(../../../../static/img/point002.png) no-repeat;background-size: 100%;}
    .knowledgeGroup ul .choose_option:nth-child(3){width: 12.5rem;height: 8.9rem;background: url(../../../../static/img/point03.png) no-repeat;background-size: 100%;}
    .knowledgeGroup ul .choose_option:nth-child(4){width: 12rem;height: 9.5rem;background: url(../../../../static/img/point04.png) no-repeat;background-size: 100%;
    margin-top: -2rem}
    .knowledgeGroup ul .choose_option:nth-child(5){width: 12.35rem;height: 9.5rem;background: url(../../../../static/img/point05.png) no-repeat;background-size: 100%;}
    .knowledgeGroup ul .choose_option:nth-child(6){width: 12.7rem;height: 10.5rem;background: url(../../../../static/img/point06.png) no-repeat;background-size: 100%;
    margin-top: -3rem}

    .choosePanel{width: 100%;height: 100%;display: flex;justify-content: flex-start;flex-direction: column;align-items: center;
      background-color:rgba(0, 0, 0, 0.3);position: absolute;top: 0;left: 0;}
    .choosePanel .panel{width: 39.15rem;height: 32.45rem;background: url(../../../../static/img/panel1.png) no-repeat;background-size: 100%;position: relative;}
    .choosePanel .closeBtn{width: 4.05rem;height: 4.3rem;background: url(../../../../static/img/close.png) no-repeat;background-size: 100%;position: absolute;
      top: 4rem;left: 50%;margin-left: -1.4rem; }
    .choosePanel .title{width: 13.9rem;height: 3.4rem;background: url(../../../../static/img/point_title.png) no-repeat;background-size: 100%;
      position:absolute;top: 11rem;left: 50%;margin-left: -7rem;}
    .choosePanel ul li{margin-top:5rem;}
    .choosePanel ul li:nth-child(1){width: 6.35rem;height: 7.4rem;background: url(../../../../static/img/tv1.png)  no-repeat;background-size: 100%;}
    .choosePanel ul li:nth-child(2){width: 6.35rem;height: 6.6rem;background: url(../../../../static/img/tv2.png)  no-repeat;background-size: 100%;margin-top: 8rem}
    .choosePanel ul li:nth-child(3){width: 6.35rem;height: 6.6rem;background: url(../../../../static/img/tv3.png)  no-repeat;background-size: 100%;}
    /* .knowledgeGroup .newKnowledge{width: 5rem;height: 5rem;border-radius: 50%;border: 0.1rem solid #ccc;}
    .knowledgeGroup .newCourse{width: 5rem;height: 5rem;border-radius: 50%;border: 0.1rem solid #ccc;}
    .knowledgeGroup .newGame{width: 5rem;height: 5rem;border-radius: 50%;border: 0.1rem solid #ccc;} */
</style>
