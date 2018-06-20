<!--  -->
<template>
  <div>I am recommend</div>
</template>

<script>
import {getRecommend} from 'api/recommend.js'
import {ERROR_OK} from 'api/config.js'

export default {
  created () {
    this._getRecommendDataFromServer()
  },
  methods: {
    _getRecommendDataFromServer() {
      console.log('--- 1 --')
      getRecommend().then((response) => {
        console.log('--- 2 --', response)
        if (response.code === ERROR_OK) {
          console.log(response.data)
        }
      })
    }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
</style>
