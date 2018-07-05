<!-- 歌手组件 -->
<template>
  <Scroll :data="data" :listenScroll="listenScroll" :probeType="probeType" ref="scroll" @scroll="scroll">
    <ul>
      <li v-for="(group, index) in data" :key="index" class="listGroupView" ref="listGroupView">
        <h2 class="listGroupView-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item, index) in group.items" :key="index" class="listCellView">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="shortcutView" @touchstart.stop.prevent="shortcutViewTouchStart" @touchmove.stop.prevent="shotcutViewTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutData" :key="index" class="shortcut-item" :data-index="index" :class="{'currentItem': currentIndex === index}">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
  </Scroll>
</template>

<script type='text/ecmascript-6'>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom.js'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
export default {
  data () {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: -1
    }
  },
  created () {
    this.listenScroll = true
    this.probeType = 3
    this.touch = {}
    this.listGroupHeight = []
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    _setListGroupCHeight () {
      this.listGroupHeight = []
      let list = this.$refs.listGroupView
      let height = 0
      this.listGroupHeight.push(height)
      for (let index = 0; index < list.length; index++) {
        let val = list[index]
        height += val.clientHeight
        this.listGroupHeight.push(height)
      }
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    shortcutViewTouchStart (e) {
      let anchorIndex = getData(e.target, 'index')
      let touch = e.touches[0]
      this.touch.y1 = touch.pageY
      this.touch.anchorIndex = anchorIndex
      this.scrollTo(anchorIndex)
    },
    shotcutViewTouchMove (e) {
      let touch = e.touches[0]
      this.touch.y2 = touch.pageY
      let temp = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + temp
      this.scrollTo(anchorIndex)
    },
    scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      /*
        边界处理
      */
      if (index < 0) {
        index = 0
      } else if (index > this.listGroupHeight.length - 2) {
        index = this.listGroupHeight.length - 2
      }
      this.$refs.scroll.scrollToElement(this.$refs.listGroupView[index], 0)
      this.scrollY = this.$refs.scroll.scroll.y
    }
  },
  watch: {
    diff (newValue) {
      let fixedTop = (newValue > 0 && newValue < TITLE_HEIGHT) ? newValue - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    },
    data () {
      setTimeout(() => {
        this._setListGroupCHeight()
      }, 20)
    },
    scrollY (newValue) {
      const listHeight = this.listGroupHeight
      /*
          最顶部
      */
      if (newValue > 0) {
        this.currentIndex = 0
        return
      }
      for (let index = 0; index < listHeight.length - 1; index++) {
        let height1 = listHeight[index]
        let height2 = listHeight[index + 1]
        if (-newValue >= height1 && -newValue < height2) {
          this.currentIndex = index
          this.diff = height2 + newValue
          return
        }
      }
      /*
        最底部
      */
      this.currentIndex = listHeight.length - 2
    }
  },
  computed: {
    shortcutData () {
      return this.data.map((item) => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      } else {
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    }
  },
  components: {
    Scroll
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable.styl'
.listGroupView
  padding-bottom 20px
  .listGroupView-title
    height 30px
    line-height 30px
    padding-left 20px
    font-size $font-size-small
    color $color-text-l
    background $color-highlight-background
  .listCellView
    display flex
    padding 20px 0 0 30px
    align-items center
    .avatar
      width 50px
      height 50px
      border-radius 50%
    .name
      font-size $font-size-medium
      color $color-text-l
      margin-left 20px
.shortcutView
  position absolute
  width 20px
  right 0
  top 50%
  transform  translateY(-50%)
  border-radius 10px
  background $color-background-d
  padding 20px 0
  text-align center
  font-family Helvetica
  .shortcut-item
    padding 3px
    line-height 1
    font-size $font-size-small
    color $color-text-l
    &.currentItem
      color $color-theme
.list-fixed
  position absolute
  top 0
  left 0
  width 100%
  .fixed-title
    height 30px
    line-height 30px
    font-size $font-size-small
    padding-left 20px
    color $color-text-l
    background $color-highlight-background
</style>
