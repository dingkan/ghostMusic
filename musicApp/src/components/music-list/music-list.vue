<!-- 歌单列表页 -->
<template>
  <div class="musicList">
    <div class="back" @click="back">
        <i class="icon-back"></i>
    </div>
    <div class="title">{{singerName}}</div>
    <div class="bgImage" :style="bgStyle" ref="bgImage">
      <div class="filter" ref="filter"></div>
      <div class="play-wrapper">
        <div class="play" ref="playBtn">
          <i class="icon-play"></i>
          <span class="play-text">{{playText}}</span>
        </div>
      </div>
    </div>
    <div class="bg-layer" ref="bgLayer"></div>
    <scroll :data="data" :listenScroll="listenScroll" :click="click" :probeType="probeType" class="list" ref="list" @scroll="scroll">
      <div class="songList-wrapper">
        <song-list :data="data"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script type='text/ecmascript-6'>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/songList/songList'
import {prefixStyle} from 'common/js/dom.js'
const transfrom = prefixStyle('transform')
const backdropFilter = prefixStyle('backdrop-filter')
const NAVBAR_HEIGHT = 44
export default {
  data () {
    return {
      scrollY: 0
    }
  },
  created () {
    this.listenScroll = true
    this.click = true
    this.probeType = 3
    this.playText = '随机播放全部'
  },
  methods: {
    back () {
      this.$router.back()
    },
    scroll (newY) {
      this.scrollY = newY.y
    }
  },
  watch: {
    scrollY (newY) {
      let translateY = Math.max(this.minTransalteY, newY)
      let zIndex = 0
      let scale = 1
      let blur = 0
      const percent = Math.abs(newY / this.imageHeight)

      if (newY > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20, percent * 20)
      }

      this.$refs.bgLayer.style[transfrom] = `translate3d(0, ${translateY}px, 0)`
      this.$refs.filter.style[backdropFilter] = `blur(${blur}px)`
      /*
          当上啦超出导航栏位置是
            1. 重新设置层级的优先级
            2. 重新设置背景图片的高度和样式
        */
      if (newY < this.minTransalteY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${NAVBAR_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style.zIndex = zIndex
      this.$refs.bgImage.style[transfrom] = `scale(${scale})`
    }
  },
  mounted () {
    /*
      在监听scroll滚动的时候，我们需要做下极限位置的限制处理。所以我们这里需要缓存一下图片的高度
      1.往下拉的极限高度是图片的高度
      2.往上拉的极限高度是图片的高度-导航栏的高度
    */
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTransalteY = -this.imageHeight + NAVBAR_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },
  components: {
    Scroll,
    SongList
  },
  props: {
    singerName: {
      type: String,
      default () {
        return '未知'
      }
    },
    bgImage: {
      type: String,
      default () {
        return ''
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable.styl'
.musicList
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index 100
  background $color-background
  .back
    position absolute
    top 0
    left 10px
    z-index 50
    .icon-back
      display block
      padding 10px
      font-size $font-size-large-x
      color $color-theme
  .title
    position absolute
    top 0
    left 10%
    z-index 11
    width 80%
    text-overflow ellipsis
    overflow hidden
    white-space nowrap
    text-align center
    line-height 40px
    font-size $font-size-large
    color $color-text
  .bgImage
    position relative
    width 100%
    height 0
    padding-top 70%
    transform-origin top
    background-size cover
    .filter
      position absolute
      top 0
      left 0
      height 100%
      width 100%
      background rgba(7, 17, 27, 0.4)
    .play-wrapper
      position absolute
      bottom 20px
      width 100%
      z-index 50
      .play
        box-sizing border-box
        width 135px
        padding 7px 0
        margin 0 auto
        text-align center
        border 1px solid $color-theme
        color $color-theme
        border-radius 10px
        font-size 0
        .icon-play
          display inline-block
          font-size $font-size-medium-x
          margin-right 6px
          vertical-align middle
        .play-text
          display inline-block
          font-size $font-size-small
          vertical-align middle
  .bg-layer
    position relative
    height 100%
    background $color-background
  .list
    position absolute
    top 0
    bottom 0
    width 100%
    background $color-background
</style>
