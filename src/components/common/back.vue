/* 返回按钮 */
<template>
  <section class="backGroup">
    <div class="backBtn" @click="BackHandle()"></div>
    <audio src="" id="backSnd"></audio>
  </section>
</template>

<script>
  export default {
    name: 'back',
    data () {
      return {
        title: '',
        audio: null
      }
    },
    mounted () {
      this.initBack()
    },
    methods: {
      initBack () {
      },
      BackHandle () {
        if (this.$store.state.a.routeRate === 1) {
          this.$router.go(-1)
        } else {
          let routeCount = -this.$store.state.a.routeRate
          this.$router.go(routeCount)
          this.$store.state.a.routeRate = 1
        }
        if (this.$store.state.a.routeRate === 1) {
          this.continueBgSnd()
        }
      }
    },
    components: {}
  }
</script>
<style scoped>
    @import '../../style/common.scss';
    .backBtn{background: url(../../../static/img/back.png) no-repeat;width: 4.05rem;height: 4.3rem;
        position:absolute;left: 0.5rem;top:0.5rem;background-size: 100%;}
</style>
