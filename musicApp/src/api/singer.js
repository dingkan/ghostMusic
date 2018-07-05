<<<<<<< HEAD
import jsopn from 'common/js/jsonp.js'
import {options, commonParams} from 'api/config.js'

export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
=======
import jsonp from 'common/js/jsonp.js'
import {commonParams, options} from 'api/config.js'

export function getSingerData () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 1928093487,
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
<<<<<<< HEAD
    platform: 'yqq',
    g_tk: 1928093487
  })

  return jsopn(url, data, options)
=======
    platform: 'yqq'
  })
  return jsonp(url, data, options)
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
}
