<template>
  <div id="app">
    <MHeader class="header"></MHeader>
    <tab class="tab"></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
#app
  color $color-background
  .header
    position relative
    top 0px
    left 0px
    width 100%
  .tab
    position relative
    width 100%
</style>
