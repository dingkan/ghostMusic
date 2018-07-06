<!--  -->
<template>
  <scroll class="recommend-wrapper" :data="discListArray">
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
            <li v-for="(item, index) in discListArray" :key="index" class="recollend-discview">
              <div class="discview-icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="discview-content">
                <div class="discview-title" v-html="item.creator.name"></div>
                <div class="discview-subtitle" v-html="item.dissname"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    <div class="loadingview" v-show="!silderArray.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getRecommend, getDiscList} from 'api/recommend.js'
import {ERROR_OK} from 'api/config.js'
import Silder from 'base/silder/silder'
import Loading from 'base/loading/loading'
export default {
  data () {
    return {
      silderArray: [],
      discListArray: []
    }
  },
  components: {
    Silder,
    Scroll,
    Loading
  },
  created () {
    this._getRecommendDataFromServer()
    this._getDiscListDataFromServer()
  },
  methods: {
    _getDiscListDataFromServer () {
      getDiscList().then((response) => {
        if (response.data.code === ERROR_OK) {
          this.discListArray = response.data.data.list
          console.log(this.discListArray)
        }
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
  overflow hidden
  .silder
    position relative
    width 100%
  .recommend-list
    .title
      height 65px
      line-height 65px
      text-align center
      font-size 14px
      color $color-theme
    .recollend-discview
      padding 0 20px 20px
      align-items center
      display flex
      .discview-icon
        img
          border-radius 6px
      .discview-content
        margin-left 20px
        flex 1
        font-size $font-size-medium
        overflow hidden
        line-height 20px
        .discview-title
          margin-bottom 10px
          color $color-text
        .discview-subtitle
          color $color-text-d
  .loadingview
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
