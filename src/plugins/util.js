/* 共用方法 */
export default {
  install (Vue, options) {
    Vue.prototype.pauseBgSnd = function () {
      var bgAudio = document.getElementById('backgroundSnd')
      bgAudio.pause()
      this.$store.state.a.bgSndPosition = bgAudio.currentTime
    }
    Vue.prototype.continueBgSnd = function () {
      var bgAudio = document.getElementById('backgroundSnd')
      bgAudio.play(this.$store.state.a.bgSndPosition)
    }
  }
}
