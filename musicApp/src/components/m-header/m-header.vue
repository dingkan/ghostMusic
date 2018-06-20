<!--  -->
<template>
  <div class="header-wrapper">
    <div class="app-logo"></div>
    <div class="app-name">chicken music</div>
  </div>
</template>

<script>
export default {

}

</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';
.header-wrapper
  position relative
  height 44px
  text-align center
  color $color-theme
  font-size 0
  .app-logo
    display inline-block
    vertical-align top
    margin-top 6px
    margin-right 9px
    width 30px
    height 32px
    background-size 30px 32px
    bg-image('logo')
  .app-name
    display inline-block
    vertical-align top
    line-height 44px
    font-size $font-size-large
</style>
