/* 商场按钮 */
<template>
  <div class="mallBtn" @click="mallHandle()">
  </div>
</template>

<script>
  export default {
    name: 'mall',
    data () {
      return {
        title: ''
      }
    },
    methods: {
      mallHandle () {
        this.$router.push('buy')
      }
    },
    components: {}
  }
</script>
<style scoped>
    @import '../../style/common.scss';
    .mallBtn{background: url(../../../static/img/buy.png) no-repeat;width: 4.05rem;height: 4.3rem;
        position:absolute;right: 0.5rem;top:0.5rem;background-size: 100%;}
</style>