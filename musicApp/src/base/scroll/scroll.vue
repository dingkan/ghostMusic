<!-- 封住scroll组件，外部直接通过插槽 -->
<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll'
export default {
  props: {
    /*
    是否监听点击事件
    */
    click: {
      type: Boolean,
      default () {
        return true
      }
    },
    /*
    监听滚动事件
    */
    probeType: {
      type: Number,
      default () {
        return 1
      }
    },
    /*
    根据外部传入的数据进行刷新
    */
    data: {
      type: Array,
      default () {
        return null
      }
    },
    /*
    当数据发生变化多少事件执行刷新
    */
    refreshDelay: {
      type: Number,
      default () {
        return 20
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.scroll) {
        return
      }

      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: this.probeType,
        click: this.click
      })
    },
    /*
      手动刷新
    */
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    }
  },
  watch: {
    // 监听数据变化来刷新
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
</style>
