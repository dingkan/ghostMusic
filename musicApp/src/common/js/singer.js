<<<<<<< HEAD
/*
  类似ios给模型提供工厂函数
*/
export default class Singer {
  constructor ({name, id}) {
=======

export default class singer {
  constructor({id, name}) {
>>>>>>> 27b54fe75eac610f34d3ac853a6f64535525947b
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}
