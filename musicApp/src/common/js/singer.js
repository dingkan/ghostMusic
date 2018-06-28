/*
  类似ios给模型提供工厂函数
*/
export default class Singer {
  constructor ({name, id}) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}
