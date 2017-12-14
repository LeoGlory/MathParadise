/* 博学岛 */
<template>
  <section class="eruditeContainer">
     <back-main></back-main>
     <!-- <go-mall></go-mall> -->
     <page-control @pageChange="changePage" v-bind:pageCount = "allPageNum"></page-control>
     <section class="eruditeGroup">
         <ul>
           <li class="eruditeItem" v-for="item in links" v-if="item.isShow" @click="showStory(item.index)">
             <div class="pic"></div>
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
    name: 'erudite',
    data () {
      return {
        title: '',
        pageNum: 1,
        onePageCount: 8,
        allPageNum: 0,
        links: [
          {
            index: 1,
            name: '知识一',
            pic: '',
            sourcePath: '',
            isShow: true
          },
          {
            index: 2,
            name: '知识二',
            pic: '',
            sourcePath: '',
            isShow: true
          },
          {
            index: 3,
            name: '知识三',
            pic: '',
            sourcePath: '',
            isShow: true
          },
          {
            index: 4,
            name: '知识四',
            pic: '',
            sourcePath: '',
            isShow: true
          },
          {
            index: 5,
            name: '知识五',
            pic: '',
            sourcePath: '',
            isShow: true
          },
          {
            index: 6,
            name: '知识六',
            pic: '',
            sourcePath: '',
            isShow: true
          },
          {
            index: 7,
            name: '知识七',
            pic: '',
            sourcePath: '',
            isShow: true
          },
          {
            index: 8,
            name: '知识八',
            pic: '',
            sourcePath: '',
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
    mounted () {
      this.initCurPage()
      this.changePage(1)
    },
    methods: {
      initCurPage () {
        this.allPageNum = Math.ceil(this.links.length / this.onePageCount)
        /* console.log('initCurPage', this.allPageNum) */
      },
      showStory (index) {
        if (index !== 1) {
          return
        }
        this.$router.push({name: 'showStory', params: {userName: 'erudite', userIndex: index}})
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
    .eruditeContainer{width: 66.7rem;height: 37.5rem;display: flex;align-items: center;justify-content: space-between;
        position: relative;background-color: #fff;}
    .eruditeGroup{display: flex;justify-content: center;width: 100%;height: 70%;}
    .eruditeGroup ul{display: flex;width: 80%;height: 100%;justify-content: space-around;align-content:space-around;flex-wrap:wrap;}
    .eruditeGroup ul li{width: 11rem;height: 12rem;border: 0.1rem solid #ccc;border-radius: 0.5rem}
    .eruditeItem .pic{width: 100%;height: 9rem;background: url(../../../../static/img/pic01.png) no-repeat;
      background-size: 100%;}
    .eruditeItem .title{font-family: "Arial";font-size: 2rem;line-height: 3rem;height:3rem;text-align: center;}
</style>