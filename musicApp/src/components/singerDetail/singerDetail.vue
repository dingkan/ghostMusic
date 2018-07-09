<!-- 歌手详情页 -->
<template>
  <transition name="slide">
    <MuiscList :singerName="singer.name" :bgImage="singer.avatar" :data="songData"></MuiscList>
  </transition>
</template>

<script type='text/ecmascript-6'>
import {mapGetters} from 'vuex'
import MuiscList from 'components/music-list/music-list'
import {getSingerDetail} from 'api/singer.js'
import {ERROR_OK} from 'api/config.js'
import {processSongsUrl} from 'common/js/song.js'
export default {
  data () {
    return {
      songData: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    _getSingerDetail () {
      /*
        这里需要对id做判空处理
      */
      if (this.singer.id === undefined) {
        this.$router.push({
          path: '/singer'
        })
      }
      getSingerDetail(this.singer.id).then((result) => {
        if (result.code === ERROR_OK) {
          this.songData = processSongsUrl(result.data.list)
          console.log(this.songData)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    this._getSingerDetail()
  },
  components: {
    MuiscList
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
