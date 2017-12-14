<template>
  <section class="playContainer">
    <back-main></back-main>
    <carousel-3d>
      <slide :index="item.index" v-for="item in links">
        <a class="" :class="item.name+' '+item.className" @click="$goRoute(item.routePath)"></a>
      </slide>
    </carousel-3d>
  </section>
</template>

<script>
    import backMain from '../common/back'
    import goMall from '../common/mall'
    import Carousel3d from '../common/Carousel3d'
    import Slide from '../common/Slide'
    export default {
      name: 'play',
      data () {
        return {
          title: '',
          links: [
            {
              index: 0,
              text: '知识岛',
              name: 'knowledge',
              routePath: '/play/knowledge'
            },
            {
              index: 1,
              text: '冒险岛',
              name: 'adventure',
              routePath: '/play/adventure'
            },
            {
              index: 2,
              text: '财富岛',
              name: 'wealth',
              routePath: ''/* /play/wealth */
            }/* ,
            {
              text: '博学岛',
              name: 'erudite',
              routePath: '/play/erudite',
              ischoosed: false
            } */
          ]
        }
      },
      mounted () {
        this.initPlay()
      },
      methods: {
        initPlay () {
          this.links.forEach(function (element) {
          }, this)
        }
      },
      components: {
        backMain,
        goMall,
        Carousel3d,
        Slide
      }
    }
</script>
<style scoped>
  @import '../../style/common.scss';
  @import '../../style/swiper.min.css';
  .playContainer{background: url(../../../static/img/play_bg.png) no-repeat;width: 66.7rem;height: 37.5rem;display: flex;justify-content: center;
    align-items: center;position: relative;background-color: #fff;background-size: 100%;}
  .carousel-3d-container{width: 100%;height: 37.5rem}
  .carousel-3d-slide{background-color: transparent;border: 0;width: 18rem;height:25rem; }
  .adventure{display: block;background: url(../../../static/img/adventure.png) no-repeat;width:16.45rem;height: 23.25rem;background-size: 100%; }
  .knowledge{display: block;background: url(../../../static/img/knowledge.png) no-repeat;width:16.45rem;height: 23.25rem;background-size: 100%; }
  .wealth{display: block;background: url(../../../static/img/wealth11.png) no-repeat;width:16.45rem;height: 23.25rem;background-size: 100%; }
  .erudite{display: block;background: url(../../../static/img/erudite.png) no-repeat;width:16.45rem;height: 23.25rem;background-size: 100%; }
</style>
