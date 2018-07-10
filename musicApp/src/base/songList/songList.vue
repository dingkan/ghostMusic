<!-- 歌单列表 -->
<template>
  <div class="songList">
        <ul>
          <li v-for="(song, index) in data" :key="index" class="songCell">
            <div class="songConent">
              <h2 class="songName" v-html="song.name"></h2>
              <p class="songDes">{{song.singer}}·{{song.name}}</p>
            </div>
          </li>
        </ul>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}

</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '~common/stylus/variable.styl'
.songList
  padding 20px 30px
  .songCell
    display flex
    align-items center
    box-sizing border-box
    height 64px
    font-size $font-size-medium
    .songConent
      flex 1
      overflow hidden
      line-height 20px
      .songName
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        color $color-text
      .songDes
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        color $color-text-d
        margin-top 4px
</style>
