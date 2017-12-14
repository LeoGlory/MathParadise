/* 冒险岛 */
<template>
  <section class="adventureContainer">
     <back-main></back-main>
     <!-- <go-mall></go-mall> -->
     <page-control @pageChange="changePage" v-bind:pageCount = "allPageNum"></page-control>
     <section class="adventureGroup">
         <ul>
           <li class="adventureItem" v-for="item in links" v-if="item.isShow" @click="showStory(item.index)">
             <div class="pic" :class="{'active':item.isActive}">
               <div class="img"></div>
             </div>
             <div class="title">{{item.name}}</div>
           </li>
         </ul>
     </section>
  </section>
</template>

<script>
  import backMain from '../../common/back'
  import goMall from '../../common/mall'
  import pageControl from '../../common/pageControl'
  export default {
    name: 'adventure',
    data () {
      return {
        title: '',
        pageNum: 1,
        onePageCount: 8,
        allPageNum: 0,
        links: [
          {
            index: 1,
            name: '三角形',
            pic: '',
            sourcePath: '',
            isShow: true,
            isActive: false
          },
          {
            index: 2,
            name: '长方形和正方形',
            pic: '',
            sourcePath: '',
            isShow: true,
            isActive: true
          },
          {
            index: 3,
            name: '平行四边形',
            pic: '',
            sourcePath: '',
            isShow: true,
            isActive: false
          },
          {
            index: 4,
            name: '圆',
            pic: '',
            sourcePath: '',
            isShow: true,
            isActive: false
          },
          {
            index: 5,
            name: '梯形和其它平面图形',
            pic: '',
            sourcePath: '',
            isShow: true,
            isActive: false
          },
          {
            index: 6,
            name: '平面图形之间的关系',
            pic: '',
            sourcePath: '',
            isShow: true,
            isActive: false
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
      this.changePage(1)
    },
    methods: {
      initCurPage () {
        this.allPageNum = Math.ceil(this.links.length / this.onePageCount)
      },
      showStory (index) {
        if (index !== 2) {
          return
        }
        this.$router.push({name: 'showStory2', params: {userName: 'adventure', userIndex: 1}})
        this.pauseBgSnd()
      },
      changePage (num) {
        for (var index = 0; index < this.links.length; index++) {
          var preNum = num - 1
          if (index < num * this.onePageCount && index >= preNum * this.onePageCount) {
            this.links[index].isShow = true
          } else {
            this.links[index].isShow = false
          }
        }
      }
    }
  }
</script>
<style>
    @import '../../../style/common.scss';
    .adventureContainer{width: 66.7rem;height: 37.5rem;display: flex;align-items: center;justify-content: space-between;
        position: relative;background:url(../../../../static/img/adventure_bg.png) no-repeat;background-size: 100%;}
    .adventureGroup{display: flex;justify-content: center;width: 100%;height: 70%;}
    .adventureGroup ul{display: flex;width: 80%;height: 100%;justify-content: space-around;align-content:space-around;flex-wrap:wrap;}
    .adventureGroup ul li{width: 11rem;height: 12rem;background-color:#fff;border-radius: 1rem;display: flex;justify-content: space-around;flex-direction: column;
      align-items: center;}
    .adventureGroup ul li .pic{width: 10rem;height: 9rem;background-color: #ccc;border-top-right-radius: 1rem;border-top-left-radius: 1rem;
      display: flex;justify-content: center;align-items: center; margin-top: 0.5rem}
    .adventureGroup ul li:nth-child(2) .pic{background-color: #C0D8A8;}
    .adventureGroup ul li .img{width: 7rem;height: 7rem;background: url(../../../../static/img/ad-02.png) no-repeat;background-size: 100%;}
    .adventureGroup ul li:nth-child(2) .img{width: 7rem;height: 7rem;background: url(../../../../static/img/ad-01.png) no-repeat;background-size: 100%;}
    .adventureItem .title{font-family: "Arial";font-size: 1rem;line-height: 3rem;height:3rem;text-align: center;color:#CCCC00;font-weight: bolder}
</style>
