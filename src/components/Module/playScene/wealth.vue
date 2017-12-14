/* 财富岛 */
<template>
  <section class="wealthContainer">
     <back-main></back-main>
     <!-- <go-mall></go-mall> -->
     <!-- <page-control></page-control> -->
     <section class="wealthGroup">
       <h2 class="wealthtitle" v-show="!answerPage">{{title}}</h2>
       <ul  v-show="!answerPage">
         <li v-for="item in links" v-if="item.isShow" @click="chooseCourse(item.index)">
           <span class="index">{{item.index}}</span>
           <span class="title">{{item.title}}</span>
           <span class="icon"></span>
         </li>
       </ul>
       <section class="wealthPage"  v-show="answerPage">
         <h2 id="singleTitle"></h2>
         <div class="pic"></div>
         <div class="startBtn" @click="startAnswer">开始答题</div>
       </section>
     </section>
  </section>
</template>

<script>
  import backMain from '../../common/back'
  import goMall from '../../common/mall'
  import pageControl from '../../common/pageControl'
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  
  export default {
    name: 'wealth',
    data () {
      return {
        title: '知识点',
        answerPage: false,
        choosedIndex: 0,
        links: [
          {
            index: 1,
            title: '除法',
            isShow: true
          },
          {
            index: 2,
            title: '认数',
            isShow: true
          },
          {
            index: 3,
            title: '千克和克',
            isShow: true
          },
          {
            index: 4,
            title: '加和减',
            isShow: true
          },
          {
            index: 5,
            title: '长方形和正方形',
            isShow: true
          },
          {
            index: 6,
            title: '24小时记时法',
            isShow: true
          },
          {
            index: 7,
            title: '乘法',
            isShow: true
          },
          {
            index: 8,
            title: '观察物体',
            isShow: true
          },
          {
            index: 9,
            title: '统计与可能性',
            isShow: true
          },
          {
            index: 10,
            title: '认识分数',
            isShow: true
          }
        ]
      }
    },
    components: {
      backMain,
      goMall,
      pageControl
    },
    methods: {
      initCurPage () {
      },
      chooseCourse (index) {
        if (index !== 5) {
          return
        }
        this.answerPage = !this.answerPage
        document.getElementById('singleTitle').innerHTML = this.links[index - 1].title
        this.choosedIndex = index
      },
      startAnswer () {
        var index = this.choosedIndex - 1
        this.$router.push({name: 'showCourse', params: {userName: 'wealth', userIndex: this.choosedIndex, userTitle: this.links[index].title}})
      },
      ...mapMutations([
        'add', 'reduce'
      ]),
      ...mapActions(['addAction', 'reduceAction'])
    },
    computed: {
      ...mapState(['count']),
      count () {
        return this.$store.getters.count
      },
      ...mapGetters(['count'])
    }
  }
</script>
<style>
    @import '../../../style/common.scss';
    .wealthContainer{width: 66.7rem;height: 37.5rem;display: flex;align-items: center;justify-content: center;
        position: relative;background-color: #fff;background:url(../../../../static/img/wealthBg.png);background-size: 100%;}
    .wealthGroup{display: flex;justify-content: center;align-items: center;flex-direction: column;width: 40.3rem;height: 26.45rem;
      background:url(../../../../static/img/wealthCourse.png);background-size: 100%;overflow: auto;position: relative;}
    .wealthGroup h2{width: 35rem;height: 4rem;line-height: 4rem;text-align: center;color:#60A818;font-size: 2rem;}
    .wealthGroup ul{width: 35rem;height: 20rem;overflow-y: auto;}
    .wealthGroup ul li{width: 34.8rem;height: 3rem;text-align: center;border: 0.1rem solid #ccc;border-radius: 0.3rem;display: flex;justify-content: flex-start;
      position: relative;margin-bottom:1rem;color:#60A818;font-family: "Arial";font-size: 1.5rem;}
    .wealthGroup .index,.wealthGroup .title{text-align: center;line-height: 3rem;margin-left: 2rem;}
    .wealthGroup .icon{background:url(../../../../static/img/you_hui.png) no-repeat;width: 1.25rem;height: 1.25rem;background-size: contain;position: absolute;
      top: 50%;right: 1rem;;margin-top: -0.625rem;}

    .wealthPage .startBtn{border: 0.1rem solid #ccc;border-radius: 0.5rem;background-color: #90C0D8;width: 8rem;height: 3rem;line-height: 3rem;
      font-size: 1.5rem;font-family: "微软雅黑";text-align: center;color: #fff;}
    .wealthPage #singleTitle{position: absolute;top: 2rem;left: 50%;width: 100%;margin-left: -50%;}
</style>

