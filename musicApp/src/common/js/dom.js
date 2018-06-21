export function addClass(el, className) {
  console.log('------- 4 --------', el, className, hasClass(el, className))
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
  console.log('------- 3 --------', el.className)
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
