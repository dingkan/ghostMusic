import OriginalJsonp from 'jsonp'

export default function jsonp2(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + params(data)
  console.log('----- -1  ------', url)
  return new Promise((resolve, reject) => {
    OriginalJsonp(url, option, (error, data) => {
      if (!error) {
        resolve(data)
      } else {
        reject(data)
      }
    })
  })
}

export function params(data) {
  let url = ''
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key] !== undefined ? data[key] : ''
      url += '&' + key + '=' + value
    }
  }
  return url ? url.substring(1) : ''
}
