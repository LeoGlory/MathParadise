/* 商城 */
<template>
  <div>
    <h2 class="text-center" style="text-align:center">{{title}}</h2>
    <back-main></back-main>
  </div>
</template>

<script>
  import backMain from '../common/back'
  export default {
    name: 'buy',
    data () {
      return {
        title: '商城'
      }
    },
    components: {
      backMain
    }
  }
</script>

<style>
  @import '../../style/common.scss';
</style>
