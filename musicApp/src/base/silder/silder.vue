<!--  -->
<template>
  <div class="silder-wrapper" ref="silderWrapper">
    <div class="silder-group" ref="silderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span v-for="(item, index) in dots" :key="index" class="dot" :class="{'active': currentIndex === index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom.js'

export default {
  name: 'silder',
  data () {
    return {
      dots: [],
      currentIndex: 0
    }
  },
  mounted () {
    // 初始化操作 模板编译/挂在之后会执行此函数
    // 浏览器通常是17毫秒刷新一次，这里我们这是20毫秒后刷新
    setTimeout(() => {
      this._setSilderWidth()
      this._initDots()
      this._initScroll()

      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      // 当屏幕切换，需要重新设置宽度
      this._setSilderWidth()
      this.silder.refresh()
    })
  },
  // 开始销毁示例时调用，此时示例还可以使用
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  // 需要配合动态组件keep-alive属性使用，在动态组件初始化移出的过程中调用该方法
  deactivated () {
    clearTimeout(this.timer)
  },
  activated () {
    if (this.autoPlay) {
      this._play()
    }
  },
  methods: {
    _play () {
      let pageIndex = this.currentIndex + 1
      if (this.loop) {
        pageIndex = (pageIndex === this.dots.length) ? 0 : pageIndex
      }
      this.timer = setTimeout(() => {
        this.silder.goToPage(pageIndex, 0, 400)
      }, this.interval)
    },
    _initDots () {
      this.dots = new Array(this.childen.length)
    },
    _setSilderWidth () {
      // 因为是横向滚动，所以我们这里需要给元素设置宽度，来横向滚动.1.如何来给元素设置宽度，我们需要获取DOM对象来设置宽度。通过给元素添加引用来获取指定DOM
      this.childen = this.$refs.silderGroup.children
      let width = 0
      let silderWidth = this.$refs.silderWrapper.clientWidth
      for (let index = 0; index < this.childen.length; index++) {
        let child = this.childen[index]
        addClass(child, 'silder-item')
        child.style.width = silderWidth + 'px'
        width += silderWidth
      }
      if (this.loop) {
        width += 2 * silderWidth
      }
      this.$refs.silderGroup.style.width = width + 'px'
    },
    // 初始化方法
    /*
          loop?: boolean;
          el: Element;
          threshold?: number;
          stepX?: number;
          stepY?: number;
          listenFlick?: boolean;
          speed?: number;
    */
    _initScroll () {
      this.silder = new BScroll(this.$refs.silderWrapper, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        bounce: true,
        stopPropagation: true,
        click: this.click
      })

      this.silder.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })

      this.silder.on('scrollEnd', () => {
        this.currentIndex = this.silder.getCurrentPage().pageX
        if (this.autoPlay) {
          this._play()
        }
      })
    }
  },
  props: {
    // 是否循环
    loop: {
      type: Boolean,
      default () {
        return true
      }
    },
    // 是否轮播
    autoPlay: {
      type: Boolean,
      default () {
        return true
      }
    },
    // 间隔时间
    interval: {
      type: Number,
      default () {
        return 3000
      }
    },
    click: {
      type: Boolean,
      default () {
        return true
      }
    }
  }
}

</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable.styl";
.silder-wrapper
  min-height 1px
  .silder-group
    position relative
    overflow hidden
    white-space nowrap
    .silder-item
      float left
      box-sizing border-box
      overflow hidden
      text-align center
      a
        display block
        width 100%
        overflow hidden
        text-decoration none
      img
        display block
        width 100%
  .dots
    position absolute
    right 0
    left 0
    bottom 12px
    text-align center
    font-size 0
    .dot
      display inline-block
      margin 0 4px
      width 8px
      height 8px
      border-radius 50%
      background $color-text-l
      &.active
        width 20px
        border-radius 5px
        background $color-text-ll
</style>
