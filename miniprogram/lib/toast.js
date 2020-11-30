
function show (str = '') {
  wx.showToast({
    title: str,
    icon: 'none',
    duration: 1500,
    mask: true
  })
}

function showLoading (str = '请稍等') {
  wx.showLoading({
    title: str,
    mask: true
  })
}

function hideLoading () {
  wx.hideLoading()
}

export default {
  show,
  showLoading,
  hideLoading
}
