/* 页面控制上下页控制按钮 */
<template>
  <section class="pageControl">
      <!-- <div class="pagePrev" @click="prevHandle()" v-if="prevState"></div>
      <div class="pageNext" @click="nextHandle()" v-if="nextState"></div> -->
  </section>
</template>

<script>
  export default {
    name: 'pageControl',
    data () {
      return {
        title: '',
        pageNum: 1,
        allPageNum: 0,
        prevState: false,
        nextState: true
      }
    },
    props: ['pageCount'],
    methods: {
      initPage () {
        this.pageNum = 1
        /* console.log('initPage', this.allPageNum) */
        /* this.allPageNum = this.pageCount
        console.log('initPage', this.allPageNum)
        if (this.allPageNum === 1) {
          this.prevState = false
          this.nextState = false
        } else { */
        this.prevState = false
        this.nextState = false
        /* } */
        this.checkPageState()
      },
      prevHandle () {
        this.allPageNum = this.pageCount
        if (this.pageNum > 1) {
          this.pageNum--
          this.$emit('pageChange', this.pageNum)
        } else {
          return
        }
        this.checkPageState()
      },
      nextHandle () {
        this.allPageNum = this.pageCount
        if (this.pageNum < this.allPageNum) {
          this.pageNum++
          this.$emit('pageChange', this.pageNum)
        } else {
          return
        }
        this.checkPageState()
      },
      checkPageState () {
        /* if (this.pageCount < 1) {
          return
        } */
        if (this.pageNum === 1) {
          this.prevState = false
          this.nextState = true
        } else if (this.pageNum === this.allPageNum) {
          this.prevState = true
          this.nextState = false
        } else {
          this.prevState = true
          this.nextState = true
        }
      }
    },
    mounted () {
      this.initPage()
    },
    components: {}
  }
</script>
<style>
    .pagePrev{background: url(../../../static/img/zuo_hui.png) no-repeat;width: 2.5rem;height: 2.5rem;background-size: 100%;
      position: absolute;left: 1rem;top:50%;margin-top: -1.25rem; }
    .pageNext{background: url(../../../static/img/you_hui.png) no-repeat;width: 2.5rem;height: 2.5rem;background-size: 100%;
      position: absolute;right: 1rem;top:50%;margin-top: -1.25rem;}
</style>