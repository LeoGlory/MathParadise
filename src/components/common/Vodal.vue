<template>
  <transition name="vodal-fade">
    <div v-show="show" tabindex="-1" :style="style" :class="['vodal', className]" @keyup.esc="onEsc">
      <div class="vodal-mask" v-if="mask" @click="onClickMask" :style="customMaskStyles" />
      <transition :name="`vodal-${animation}`">
        <div class="vodal-dialog" v-show="show" :style="dialogStyle">
          <div class="header"></div>
          <div class="body">
            <ul class="star"></ul>
            <div class="text"></div>
          </div>
          <div class="buttonGroup">
            <button class="vodal-confirm-btn" @click="backMain"></button>
            <button class="vodal-cancel-btn" @click="resetCourse"></button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'vodal',

  props: {
    show: {
      type: Boolean,
      required: true
    },
    width: {
      type: Number,
      default: 40
    },
    height: {
      type: Number,
      default: 25.3
    },
    duration: {
      type: Number,
      default: 300
    },
    measure: {
      type: String,
      default: 'rem'
    },
    animation: {
      type: String,
      default: 'zoom'
    },
    mask: {
      type: Boolean,
      default: true
    },
    closeButton: {
      type: Boolean,
      default: true
    },
    closeOnEsc: {
      type: Boolean,
      default: false
    },
    closeOnClickMask: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: ''
    },
    customStyles: {
      type: Object,
      default: () => ({})
    },
    customMaskStyles: {
      type: Object,
      default: () => ({})
    },
    starCount: 0
  },

  computed: {
    style () {
      return {
        animationDuration: `${this.duration}ms`
      }
    },
    dialogStyle () {
      return {
        width: this.width + this.measure,
        height: this.height + this.measure,
        animationDuration: `${this.duration}ms`,
        marginLeft: -parseInt(this.width) / 2 + this.measure,
        marginTop: -parseInt(this.height) / 2 + this.measure,
        ...this.customStyles
      }
    }
  },

  watch: {
    show (isShow) {
      isShow && this.$nextTick(() => {
        this.$el.focus()
      })
    },
    starCount: function (val, oldVal) {
      var str = ''
      var container = document.getElementsByClassName('star')[0]
      this.removeElement()
      if (val === 0) {
        str = '你获得了' + val + '颗星，继续努力哦！'
        var element = document.createElement('li')
        element.setAttribute('style', 'background:url(../../../static/img/start_get2.png) no-repeat;background-size:100%;width: 6.1rem;height: 6rem;')
        container.appendChild(element)
      } else if (val === -1) {
        str = '恭喜你通过冒险岛！'
      } else {
        for (var index = 0; index < val; index++) {
          var el = document.createElement('li')
          el.setAttribute('style', 'background:url(../../../static/img/start_get.png) no-repeat;background-size:100%;width: 6.1rem;height: 6rem;')
          container.appendChild(el)
        }
        str = '你获得了' + val + '颗星，恭喜你！'
      }
      document.getElementsByClassName('text')[0].innerHTML = str
    }
  },
  mounted () {
    this.initVodal()
  },
  methods: {
    initVodal () {
    },
    onEsc () {
      if (this.show && this.closeOnEsc) {
        /* this.$emit('resetCourse') */
      }
    },
    onClickMask () {
      this.$emit('clickMask')
      if (this.closeOnClickMask) {
        /* this.$emit('resetCourse') */
      }
    },
    resetCourse () {
      this.$emit('resetCourse')
    },
    backMain () {
      this.$emit('backMain')
    },
    removeElement () {
      var container = document.getElementsByClassName('star')[0]
      for (var index = container.childNodes.length - 1; index >= 0; index--) {
        container.removeChild(container.childNodes[index])
      }
    }
  }
}
</script>
<style scoped>
  @import "vodal_style/common.css";
  @import "vodal_style/rotate.css";
  @import "vodal_style/rotate.css";
  @import "vodal_style/door.css";
  @import "vodal_style/flip.css";
  @import "vodal_style/slide-down.css";
  @import "vodal_style/slide-left.css";
  @import "vodal_style/slide-right.css";
  @import "vodal_style/slide-up.css";
  @import "vodal_style/zoom.css";

  /* -- title -- */

  .header {
    font-size: 1rem;
    padding-bottom: 6rem;
    /* border-bottom: 1px solid #e9e9e9; */
    font-size: 1rem;
  }


  /* -- body -- */

  .body {
    padding-top: 15px;
    font-size: 2rem;
  }

  button{
    padding:0;
    border: none;
  }
  /* -- button -- */

  /* .vodal-cancel-btn,
  .vodal-confirm-btn {
    position: absolute;
    font: inherit;
    bottom: 16px;
    width: auto;
    padding: 4px 15px;
    border-radius: 3px;
    transition: background .2s;
    border: 1px solid #03a9f4;
  } */

  .vodal-confirm-btn {
    /* color: #fff; */
    /* right: 200px; */
    /* background: #03a9f4; */
    width: 10.3rem;
    height: 3.9rem;
    background: url(../../../static/img/back_main.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 2rem;
  }

  /* .vodal-confirm-btn:hover {
    background: #0098e3;
  } */

  .vodal-cancel-btn {
    width: 10.3rem;
    height: 3.9rem;
    background: url(../../../static/img/play_again.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 2rem;
  }

  /* .vodal-cancel-btn:hover {
    background: #fafafa;
  }

  .vodal-cancel-btn:focus,
  .vodal-confirm-btn:focus {
    outline: none;
  }

  .vodal-confirm-btn:active {
    background: #0087d2;
  }

  .vodal-cancel-btn:active {
    background: #fafafa;
    box-shadow: inset 1px 1px 1px rgba(0, 0, 0, .2), 0 0 1px transparent;
  } */
  .buttonGroup{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .body{margin-top:-2rem }
  .star{display: flex;justify-content: space-around;margin-bottom: 1rem}
  .text{text-align: center}
</style>

