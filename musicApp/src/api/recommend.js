// 集散型请求 这里是对recommend界面的所有数据
import jsonp from 'common/js/jsonp.js'
import {commonParams, options} from './config'

export function getRecommend() {
  console.log('--- 0 ---')
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
