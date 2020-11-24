const BASE_URL = ''

function request (opt) {
  opt.url = /http/ig.test(opt.url) ? opt.url : `${BASE_URL}/${opt.url}`
  return new Promise((resolve, reject) => {
    wx.request(Object.assign({
      method: 'GET',
      url: '',
      data: null,
      header: {
        'Content-Type': 'application/json'
      },
      // timeout: 5000,
      success (res) {
        resolve(res.data)
      },
      fail (err) {
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 1500,
          mask: true
        })
        reject(err)
      }
    }, opt))
  })
}

export default request
