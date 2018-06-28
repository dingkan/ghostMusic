<!--  -->
<template>
  <div class="singer-wrapper">
    <liseview :data="singerList"></liseview>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from 'api/singer.js'
import {ERROR_OK} from 'api/config.js'
import Singer from 'common/js/singer.js'
import Liseview from 'base/listview/listview'
const HOT_NAME = '热门'
const HOT_LENGTH = 10
export default {
  data () {
    return {
      singerList: []
    }
  },
  created () {
    setTimeout(() => {
      this._getSingerList()
    }, 20)
  },
  components: {
    Liseview
  },
  methods: {
    _getSingerList () {
      getSingerList().then((result) => {
        if (result.code === ERROR_OK) {
          /*
            这里需要对数据进行处理，获取我们想要的数据
          */
          this.singerList = this._handleSingerData(result.data.list)
          console.log(this.singerList)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    _handleSingerData (list) {
      /*
      通过字典根据首字母存储集合
     */
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index <= HOT_LENGTH) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
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
          name: item.Fsinger_name,
          id: item.Fsinger_mid
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
  bottom 0
  top 88px
  width 100%
</style>
