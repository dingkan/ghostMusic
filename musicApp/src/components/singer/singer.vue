<!--  -->
<template>
<<<<<<< HEAD
  <div class="singer" ref="singer">
    <liseview :data="singerList" ref="list"></liseview>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from 'api/singer.js'
import {ERROR_OK} from 'api/config.js'
import Singer from 'common/js/singer.js'
import Liseview from 'base/listview/listview'
=======
  <div class="singer">
    <listview :data="data"></listview>
  </div>
</template>

<script>
import {getSingerData} from 'api/singer.js'
import {ERROR_OK} from 'api/config.js'
import SingerModel from 'common/js/singer.js'
import Listview from 'base/listview/listview'
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
const HOT_NAME = '热门'
const HOT_LENGTH = 10
export default {
  data () {
    return {
<<<<<<< HEAD
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
=======
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
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
        }
      }).catch((err) => {
        console.log(err)
      })
    },
<<<<<<< HEAD
    _handleSingerData (list) {
      /*
      通过字典根据首字母存储集合
     */
      let map = {
=======
    handleSingerData(list) {
      /*
        最终的目的是获取分组集合关系
      */
      this.map = {
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
<<<<<<< HEAD
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
=======

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
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
            title: key,
            items: []
          }
        }
<<<<<<< HEAD
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      let hot = []
      let res = []
      for (const key in map) {
        let val = map[key]
=======
        this.map[key].items.push(new SingerModel({
          id: item.Fsinger_mid,
          name: item.Fother_name
        }))
      })

      let hot = []
      let res = []
      for (const key in this.map) {
        let val = this.map[key]
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
        if (val.title.match(/[a-zA-Z]/)) {
          res.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
<<<<<<< HEAD
      res.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
=======

      /*
        排序
      */
      res.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
      return hot.concat(res)
    }
  }
}

</script>

<style lang='stylus' rel='stylesheet/stylus'>
.singer
<<<<<<< HEAD
  position fixed
  bottom 0
  top 88px
=======
  position absolute
  top 88px
  bottom 0px
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
  width 100%
</style>
