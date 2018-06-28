<!--  -->
<template>
      <Scroll class="singer-list" :data="data" >
        <ul>
            <li v-for="(item, index) in data" :key="index" class="group-item">
              <h2 class="group-title">{{item.title}}</h2>
              <ul>
                <li class="group-cell" v-for="(value, index) in item.items" :key="index">
                  <div class="group-avartar">
                    <img v-lazy="value.avatar">
                  </div>
                  <div class="group-content">
                    <span class="group-cell-name">{{value.name}}</span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
    </Scroll>
</template>

<script type='text/ecmascript-6'>
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    data: {
      type: Array,
      default () {
        return null
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
.singer-list
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  .group-item
    width 100%
    font-size 0
    padding-bottom 20px
    .group-title
      font-size 12px
      line-height 30px
      height 30px
      color $color-text-l
      background $color-dialog-background
      padding-left 20px
    .group-cell
      display flex
      align-items center
      padding 20px 0 0 30px
      .group-avartar
        display inline-block
        width 50px
        height 50px
        img
          width 50px
          height 50px
          background-size 50px 50px
          border-radius 50%
      .group-content
        display inline-block
        line-height 100%
        margin-left 20px
        font-size 14px
        color $color-text-l
        font-weight 400
        vertical-align baseline
</style>
