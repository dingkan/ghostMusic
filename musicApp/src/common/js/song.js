/*
  对歌曲数据进行处理
*/

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
    this.filename = `C400${this.mid}.m4a`
  }
}

export function handleSongData (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

export function filterSinger(singer) {
  let res = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    res.push(s.name)
  })
  return res.join('/')
}

export function processSongsUrl (songs) {
  let res = []
  if (!songs.length) {
    return []
  }
  songs.forEach((songData) => {
    res.push(handleSongData(songData.musicData))
  })
  return res
}
