import api from '../../api/index'

Page({
  data: {
    compareList: [],
    resList: []
  },

  onLoad (options) {
    this.setData({
      compareList: options.compareList ? JSON.parse(options.compareList) : []
    }, () => {
      this.getAllGitDetail()
    })
  },

  getAllGitDetail () {
    const promiseList = this.data.compareList.map((item) => {
      return api.github.getDetail(item)
    })
    Promise.all(promiseList).then((res) => {
      // console.log('resList1=', res)
      const resList = res.map((item) => {
        const { name, stargazers_count, created_at, updated_at } = item
        return {
          name,
          star: stargazers_count,
          createDate: created_at.split('T')[0],
          updateDate: updated_at.split('T')[0]
        }
      })
      this.setData({
        resList
      })
    })
  }
})
