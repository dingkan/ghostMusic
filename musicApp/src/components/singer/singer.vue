<!-- 歌手页面 -->
<template>
  <div>
    <listview :data="singerData" class="singer-wrapper" @singerCellDidClick="cellDidClick"></listview>
    <router-view></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
import {getSingerData} from 'api/singer.js'
import {ERROR_OK} from 'api/config.js'
import Singer from 'common/js/singer.js'
import Listview from 'base/listview/listview'
import {mapMutations} from 'vuex'
const HOT_NAME = '热门'
const HOT_LENGTH = 10
export default {
  data () {
    return {
      singerData: []
    }
  },
  components: {
    Listview
  },
  created () {
    this._getSingerData()
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    cellDidClick (singer) {
      /*
        这里通过router进行跳转
      */
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerData () {
      getSingerData().then((result) => {
        if (result.code === ERROR_OK) {
          this.singerData = this.handleSingerData(result.data.list)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    /*
      处理数据，得到我们想要的分组集合数据
    */
    handleSingerData (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_LENGTH) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })

      let hot = []
      let res = []
      for (const key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          res.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      res.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(res)
    }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
.singer-wrapper
  position fixed
  top 88px
  bottom 0px
  width 100%
</style>
