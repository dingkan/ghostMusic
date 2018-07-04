<!--  -->
<template>
  <div class="singer">
    <listview :data="data"></listview>
  </div>
</template>

<script>
import {getSingerData} from 'api/singer.js'
import {ERROR_OK} from 'api/config.js'
import SingerModel from 'common/js/singer.js'
import Listview from 'base/listview/listview'
const HOT_NAME = '热门'
const HOT_LENGTH = 10
export default {
  data () {
    return {
      data: []
    }
  },
  created () {
    this._getSingerDataList()
  },
  components: {
    Listview
  },
  methods: {
    _getSingerDataList () {
      getSingerData().then((result) => {
        if (result.code === ERROR_OK) {
          this.data = this.handleSingerData(result.data.list)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleSingerData(list) {
      /*
        最终的目的是获取分组集合关系
      */
      this.map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }

      list.forEach((item, index) => {
        if (index <= HOT_LENGTH) {
          this.map.hot.items.push(new SingerModel({
            id: item.Fsinger_mid,
            name: item.Fother_name
          }))
        }
        const key = item.Findex
        if (!this.map[key]) {
          this.map[key] = {
            title: key,
            items: []
          }
        }
        this.map[key].items.push(new SingerModel({
          id: item.Fsinger_mid,
          name: item.Fother_name
        }))
      })

      let hot = []
      let res = []
      for (const key in this.map) {
        let val = this.map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          res.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }

      /*
        排序
      */
      res.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(res)
    }
  }
}

</script>

<style lang='stylus' rel='stylesheet/stylus'>
.singer
  position absolute
  top 88px
  bottom 0px
  width 100%
</style>
