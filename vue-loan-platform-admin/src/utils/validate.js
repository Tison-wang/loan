export function isAbsolutePath(path) {
  return /^(https?|tel|mailto)/.test(path)
}
const install = Vue => {
  const V = Vue
  /**
   * 格式化時間
   * @param {*} time 時間戳
   * @param {*} type 1: d/m/y h:m:s, other: d/m/y
   */
  V.prototype.formatDate = (time, type = 1) => {
    if (!time) return ''
    const date = new Date(time)
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    let h = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let result

    m = m < 10 ? `0${m}` : m
    d = d < 10 ? `0${d}` : d
    h = h < 10 ? `0${h}` : h
    minute = minute < 10 ? `0${minute}` : minute
    second = second < 10 ? `0${second}` : second

    result = `${y}/${m}/${d}`
    if (type === 1) {
      result = `${y}/${m}/${d} ${h}:${minute}:${second}`
    }
    return result
  }
}
export default {
  install
}
