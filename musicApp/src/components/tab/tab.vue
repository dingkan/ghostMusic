<!--  -->
<template>
  <div class="tab-wrapper">
    <router-link to="/recommend" tag="div" class="tab-item">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link to="/singer" tag="div" class="tab-item">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link to="/rank" tag="div" class="tab-item">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link to="/search" tag="div" class="tab-item">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {

}

</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable.styl';
.tab-wrapper
  display flex
  font-size $font-size-medium
  height 44px
  line-height 44px
  .tab-item
    flex 1
    text-align center
    .tab-link
      color $color-text-l
      padding-bottom 5px
    &.router-link-active
      .tab-link
        color $color-theme
        border-bottom 2px solid $color-theme
</style>
