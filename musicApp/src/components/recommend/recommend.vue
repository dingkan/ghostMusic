<!--  -->
<template>
  <div class="recommend-wrapper">
    <scroll class="recommend-content" ref="scroll">
      <div>
        <div class="silder" v-if="silderArray.length">
          <silder>
            <div v-for="(item, index) in silderArray" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" class="needClick">
              </a>
            </div>
          </silder>
        </div>
        <div class="recommend-list">
          <h2 class="title">热门歌单推荐</h2>
          <ul>
            <li class="item" v-for="(item, index) in discList" :key="index">
              <div class="icon">
                <img v-lazy="item.imgurl" @load="loadImage">
              </div>
              <div class="content">
                <div class="content-title" v-html="item.creator.name"></div>
                <div class="content-des" v-html="item.dissname"></div>
              </div>
            </li>
          </ul>
          <ul>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import {getRecommend, getDiscList} from 'api/recommend.js'
import {ERROR_OK} from 'api/config.js'
import Silder from 'base/silder/silder'
import Scroll from 'base/scroll/scroll'

export default {
  data () {
    return {
      silderArray: [],
      discList: []
    }
  },
  components: {
    Silder,
    Scroll
  },
  created () {
    this._getRecommendDataFromServer()
    this._getDiscListDataFromServer()
  },
  methods: {
    _getDiscListDataFromServer () {
      getDiscList().then((response) => {
        this.discList = response.data.list
      }).catch((err) => {
        console.log(err)
      })
    },
    _getRecommendDataFromServer() {
      getRecommend().then((response) => {
        if (response.code === ERROR_OK) {
          this.silderArray = response.data.slider
        }
      })
    },
    /*
    监听图片加载事件，当加载图片是调用此函数。 来帅新scroll的高度. 加载图片有很多。 只有当加载第一张图片的时候才去刷新。所以只要执行一次，这里通过属性来空
    */
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    }
  }
}

</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable.styl"
.recommend-wrapper
  position fixed
  top 88px
  bottom 0px
  width 100%
  .recommend-content
    height 100%
    overflow hidden
    .silder
      position relative
      width 100%
      overflow hidden
    .recommend-list
      .title
        height 65px
        line-height 65px
        text-align center
        font-size 14px
        color $color-theme
      .item
        display flex
        width 100%
        margin 0 20px 20px 20px
        &.last-chlid
          margin-bottom 0
        .icon
          width 60px
          height 60px
          margin-right 20px
          img
            width 60px
            height 60px
            border-radius 5px
        .content
          flex 1
          font-size 0
          line-height 20px
          overflow hidden
          font-size 14px
          .content-title
            display block
            color $color-text
            margin-bottom 10px
          .content-des
            display block
            color $color-text-d
</style>
