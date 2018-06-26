<!--  -->
<template>
  <div class="recommend-wrapper">
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
      </ul>
    </div>
  </div>
</template>

<script>
import {getRecommend, getDiscList} from 'api/recommend.js'
import {ERROR_OK} from 'api/config.js'
import Silder from 'base/silder/silder'

export default {
  data () {
    return {
      silderArray: []
    }
  },
  components: {
    Silder
  },
  created () {
    this._getRecommendDataFromServer()
    this._getDiscListDataFromServer()
  },
  methods: {
    _getDiscListDataFromServer () {
      getDiscList().then((response) => {
        console.log(response)
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
</style>
