<template>
  <section id="main_interface">
        <section class="main_button_group">
          <ul>
            <li><a class="main_btn" :class="links[0].class" @click="$goRoute(links[0].routePath)"></a></li>
            <li><a class="main_btn" :class="links[1].class" @click="$goRoute(links[1].routePath)"></a></li>
            <li><a class="main_btn" :class="links[2].class" @click="$goRoute(links[2].routePath)"></a></li>
          </ul>
        </section>
    </section>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        links: [
          {
            text: '设置',
            class: 'set',
            routePath: 'set'
          },
          {
            text: '开始游戏',
            class: 'play',
            routePath: 'play'
          },
          {
            text: '购物车',
            class: 'buy',
            routePath: 'buy'
          }
        ]
      }
    },
    mounted () {
      this.initMain()
    },
    methods: {
      initMain () {
        /* console.log('this.$store.state.a.isLoaded', this.$store.state.a.isLoaded) */
        if (!this.$store.state.a.isLoaded) {
          this.$router.push('set')
        }
      }
    },
    components: {
    }
  }
</script>
<style>
    html{font-size: 20px;}
    html,body,ul,li,a{margin: 0;padding: 0;list-style: none;}
    /* @import './style/common'; */
    #main_interface{background: url(../../static/img/main.jpg) no-repeat;width: 66.7rem;height: 37.5rem;background-size:100%;}
    .main_button_group{width:100%;height: 100%;}
    .main_button_group ul{width:100%;height: 100%;display: flex;justify-content: space-between;}
    .main_button_group ul li{width: 4.05rem;height: 4.3rem;margin-top: 0.5rem;}
    .main_button_group ul li:nth-child(2){width: 14.4rem;height: 6.95rem;align-self: center;}
    .main_button_group ul li:nth-child(1) .set{display: block;background: url(../../static/img/set.png) no-repeat;width: 4.05rem;;height: 4.3rem;margin-left: 0.5rem;
    background-size:100%;}
    .main_button_group ul li:nth-child(3) .buy{display: block;background: url(../../static/img/buy.png) no-repeat;width: 4.05rem;;height: 4.3rem;margin-left: -0.5rem;
      visibility: hidden;background-size:100%}
    .main_button_group ul li:nth-child(2) .play{display: block;background: url(../../static/img/play.png) no-repeat;width: 14.4rem;height: 6.95rem;margin-top:5rem;
    background-size:100%; }
</style>