<!-- 歌单列表页 -->
<template>
  <div class="musicList">
    <div class="back" @click="back">
        <i class="icon-back"></i>
    </div>
    <div class="title">{{singerName}}</div>
    <div class="bgImage" :style="bgStyle" ref="bgImage">
      <div class="filter"></div>
    </div>
    <scroll :data="data" :listenScroll="listenScroll" :click="click" :probeType="probeType" class="list" ref="list">
      <div class="songList-wrapper">
        <ul>
          <li v-for="(song, index) in data" :key="index" class="songCell">
            <div class="songConent">
              <h2 class="songName" v-html="song.name"></h2>
              <p class="songDes">{{song.singer}}·{{song.name}}</p>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script type='text/ecmascript-6'>
import Scroll from 'base/scroll/scroll'
export default {
  created () {
    this.listenScroll = true
    this.click = true
    this.probeType = 3
  },
  methods: {
    back () {
      this.$router.back()
    }
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },
  components: {
    Scroll
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
    z-index 10
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
  .list
    position absolute
    top 0
    bottom 0
    width 100%
    background $color-background
    overflow hidden
    .songList-wrapper
      padding 20px 30px
      .songCell
        display flex
        align-items center
        box-sizing border-box
        height 64px
        font-size $font-size-medium
        .songConent
          flex 1
          overflow hidden
          line-height 20px
          .songName
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
            color $color-text
          .songDes
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
            color $color-text-d
            margin-top 4px
</style>
