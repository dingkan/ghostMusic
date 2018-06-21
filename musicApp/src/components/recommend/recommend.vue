<!--  -->
<template>
  <div class="recommend-wrapper">
    <div class="silder" v-if="silderArray.length">
      <silder>
        <div v-for="(item, index) in silderArray" :key="index">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" class="needClick">
          </a>
        </div>
      </silder>
    </div>
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend.js'
import {ERROR_OK} from 'api/config.js'
import Silder from 'base/silder/silder'

export default {
  data () {
    return {
      silderArray: []
    }
  },
  components: {
    Silder
  },
  created () {
    this._getRecommendDataFromServer()
  },
  methods: {
    _getRecommendDataFromServer() {
      getRecommend().then((response) => {
        if (response.code === ERROR_OK) {
          this.silderArray = response.data.slider
        }
      })
    }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
</style>
