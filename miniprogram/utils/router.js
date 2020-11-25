
function getParam (data = {}) {
  return Object.keys(data).length === 0 ? '' : `?${Object.keys(data).map(key => `${key}=${JSON.stringify(data[key])}`).join('&')}`
}

function to (url = '', data) {
  wx.navigateTo({
    url: `${url}${getParam(data)}`
  })
}

export default {
  to
}
