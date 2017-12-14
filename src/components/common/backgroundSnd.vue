/* 背景音乐 */

<template>
    <section class="backgroundSnd">
        <audio src="" id="backgroundSnd"></audio>
    </section>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        title: ''
      }
    },
    mounted () {
      this.initSnd()
    },
    methods: {
      initSnd () {
        var audio = document.getElementById('backgroundSnd')
        audio.src = '../../../static/mp3/bgSnd.mp3'
        audio.play()
        audio.addEventListener('ended', this.endedHandle)
      },
      endedHandle () {
        var audio = document.getElementById('backgroundSnd')
        audio.play()
      }
    },
    components: {}
  }
</script>
