<<<<<<< HEAD
<!--  -->
<template>
  <scroll class="listview" ref="listview" :data="data" :probeType="probeType" @scroll="scroll" :listenScroll="listenScroll">
    <ul>
      <li v-for="(group, index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item, index) in group.items" :key="index" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul>
        <li v-for="(item, index) in shortcutList" :key="index" :data-index="index" class="item">{{item}}</li>
      </ul>
    </div>
=======
<!-- 歌手页面 -->
<template>
  <scroll :data="data" class="list-view" ref="listview" :probeType="probeType" @scroll="scroll" :listenScroll="listenScroll">
      <ul>
        <li v-for="(group, index) in data" :key="index" class="list-group-view" ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li v-for="(item, index) in group.items" :key="index" class="list-singer-cell">
              <img class="avatar" v-lazy="item.avatar">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="shortcutview" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
        <ul>
          <li v-for="(item, index) in shortcutData" :key="index" class="item" :data-index="index" :class="{'current': currentIndex === index}">{{item}}</li>
        </ul>
      </div>
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
  </scroll>
</template>

<script type='text/ecmascript-6'>
<<<<<<< HEAD
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    data: {
      type: Array,
      default () {
        return null
      }
=======
import {getData} from 'common/js/dom.js'
import scroll from 'base/scroll/scroll'
const ANCHOT_HEIGHT = 18
export default {
  data () {
    return {
      scrollY: -1,
      currentIndex: 0
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
    }
  },
  created () {
    this.probeType = 3
<<<<<<< HEAD
    this.listenScroll = true
  },
  components: {
    Scroll
  },
  computed: {
    shortcutList() {
=======
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
  },
  methods: {
    /*
      外部通过listenscroll属性来控制是否监听滚动事件，scroll组件内部通过$emit('name', params) 吧事件名称和参数派发出来
      外部可以通过@name="function"通过function函数来监听派发的时间
    */
    scroll (pos) {
      this.scrollY = pos.y
    },
    /*
      监听快捷栏点击事件
    */
    onShortcutTouchStart (e) {
      /*
        1.根据每个touch的Y轴点位置去匹配当前索引值, 让scroll滑动到指定未知
        2.将每次最新的点击位置对象存储起来
      */
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    /*
      监听快捷栏滑动事件
    */
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOT_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    _scrollTo(index) {
      console.log(index)
      if (!index && index !== 0) {
        /*
          超出边间处理
        */
        return
      }
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      this.scrollY = this.$refs.listview.scroll.y
    },
    /*
      获取每个分组的高度集合，可以通过索引值来滑动
    */
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      for (let index = 0; index < list; index++) {
        let item = list[index]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  components: {
    scroll
  },
  computed: {
    shortcutData () {
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
<<<<<<< HEAD
  }
}
=======
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    scrollY (newData) {
    },
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    }
  }
}

>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable.styl'
<<<<<<< HEAD
.listview
  position relative
  height 100%
  width 100%
  overflow hidden
  background $color-background
  .list-group
=======
.list-view
  position relative
  height 100%
  width 100%
  background $color-background
  overflow hidden
  .list-group-view
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
    padding-bottom 30px
    .list-group-title
      height 30px
      line-height 30px
      font-size $font-size-small
      padding-left 20px
      color $color-text-l
<<<<<<< HEAD
      background $color-highlight-background
    .list-group-item
=======
      background $color-text-d
    .list-singer-cell
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
      display flex
      align-items center
      padding 20px 0 0 30px
      .avatar
        width 50px
        height 50px
        border-radius 50%
      .name
<<<<<<< HEAD
        margin-left 20px
        color $color-text-l
        font-size $font-size-medium
  .list-shortcut
    position absolute
    z-index 30
    right 0
    top 50%
    transform translateY(-50%)
    width 20px
    padding 20px 0
    border-radius 10px
    text-align center
    background $color-background-d
    font-family Helvetica
=======
        margin-left 30px
        font-size $font-size-medium
        color $color-text-l
  .shortcutview
    position: absolute
    z-index: 30
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-family: Helvetica
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
    .item
      padding 3px
      line-height 1
      color $color-text-l
      font-size $font-size-small
<<<<<<< HEAD
=======
      &.current
        color $color-theme-d
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
</style>
