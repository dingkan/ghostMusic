<!-- loading组件 -->
<template>
  <div class="loading">
    <img src="./loading.gif" width="25px" height="25px">
    <p class="loading-des">{{title}}</p>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    title: {
      type: String,
      default () {
        return '正在加载...'
      }
    }
  }
}

</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable.styl'
.loading
  width 100%
  text-align center
  .loading-des
    line-height 20px
    color $color-text-l
    font-size $font-size-small
</style>
