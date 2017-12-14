/* 下一个课件的按钮 */
<template>
  <div class="nextBtn" @click="nextHandle()"></div>
</template>

<script>
  export default {
    name: 'nextCourse',
    data () {
      return {
        title: ''
      }
    },
    methods: {
      nextHandle () {
        this.$emit('goNextCourse')
      }
    },
    components: {}
  }
</script>
<style scoped>
    @import '../../style/common.scss';
    .nextBtn{background: url(../../../static/img/next_step.png) no-repeat;width: 2.5rem;height: 2.5rem;
        position:absolute;right: 2rem;bottom:3rem;animation: move 3s infinite;-webkit-animation: move 3s infinite;background-size: 100%;}
    @keyframes move {
        0% {
            right: 2rem;
        }
        50% {
            right: 1rem;
        }
        100% {
            right: 2rem;
        }
    }
    @-webkit-keyframes move {
        0% {
            right: 2rem;
        }
        50% {
            right: 1rem;
        }
        100% {
            right: 2rem;
        }
    }
</style>
