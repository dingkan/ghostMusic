<!--  -->
<template>
<div class="rank">
  <scroll class="rank-scroll" :data="rankData" :probeType="probeType" :click="click">
    <ul>
      <li v-for="(item, index) in rankData" :key="index" class="rankCell">
        <div class="rank-icon">
          <img width="100" height="100" v-lazy="item.picUrl">
        </div>
        <div class="rank-content">
          <ul>
            <li v-for="(singer, index) in item.songList" :key="index" class="rank-content-singer">
              <span>{{index + 1}}</span>
              <span>{{singer.songname}}-{{singer.singername}}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </scroll>
</div>
</template>

<script type='text/ecmascript-6'>
import {getRankDataList} from 'api/rank.js'
import {ERROR_OK} from 'api/config.js'
import Scroll from 'base/scroll/scroll'
export default {
  data () {
    return {
      rankData: []
    }
  },
  created () {
    this.probeType = 3
    this.click = true
    this._getRangDataList()
  },
  methods: {
    _getRangDataList () {
      getRankDataList().then((result) => {
        if (result.code === ERROR_OK) {
          this.rankData = result.data.topList
          console.log(this.rankData)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  components: {
    Scroll
  }
}

</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.rank
  position absolute
  top 88px
  bottom 0px
  width 100%
  overflow hidden
  .rank-scroll
    height 100%
    width 100%
    .rankCell
      display flex
      height 100px
      margin 0 20px
      padding-top 20px
      &:last-child
        padding-bottom 20px
      .rank-icon
        width 100px
        height 100px
        background-size 100px 100px
        background-repeat none
      .rank-content
        flex 1
        padding 0 20px
        height 100px
        display flex
        overflow hidden
        flex-direction column
        justify-content center
        font-size $font-size-small
        color $color-text-d
        background $color-highlight-background
        .rank-content-singer
          no-wrap()
          line-height 26px
</style>
