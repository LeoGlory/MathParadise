<template>
  <div id="app">
     <router-view></router-view>
     <background-snd></background-snd>
  </div>
</template>

<script>
  import backgroundSnd from './components/common/backgroundSnd'
  export default {
    name: '',
    data () {
      return {
      }
    },
    mounted () {

    },
    components: {
      backgroundSnd
    },
    computed: {

    },
    methods: {
    }
  }
</script>