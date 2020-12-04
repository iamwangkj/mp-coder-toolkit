function set (key, value) {
  console.log('diaoyong set =', key, value)
  wx.setStorage({
    key,
    data: value
  })
}

function get (key) {
  return wx.getStorageSync({ key })
}

export default {
  set,
  get
}
