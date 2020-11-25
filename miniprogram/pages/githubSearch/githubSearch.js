import api from '../../api/index'
import router from '../../utils/router'
import toast from '../../utils/toast'

Page({
  data: {
    keyword: 'js',
    searchRes: [],
    showSearchRes: false,
    keywordList: []
  },

  searchOnGithub (e) {
    const str = e.detail
    api.github.search(str).then((res) => {
      this.setData({
        searchRes: res.items,
        showSearchRes: true
      })
    })
  },

  addKeyword (e) {
    const item = e.target.dataset.item
    const fullName = item.full_name
    const has = this.data.keywordList.some((item) => {
      return item.name === fullName
    })
    if (!has) {
      const oldList = this.data.keywordList
      oldList.unshift({
        name: fullName,
        checked: true
      })
      this.setData({
        keywordList: oldList
      })
    }
    this.setData({
      showSearchRes: false,
      keyword: ''
    })
  },

  delKeyword (e) {
    const delItem = e.target.dataset.item
    const res = this.data.keywordList.filter((item) => {
      return item.name !== delItem.name
    })
    this.setData({
      keywordList: res
    })
  },

  toCompare () {
    const compareList = this.data.keywordList.map((item) => {
      return item.name
    })
    console.log('compareList=', compareList)
    if (compareList.length > 0) {
      router.to('/pages/githubCompare/githubCompare', { compareList })
    } else {
      toast.show('请先搜索，添加对比项')
    }
  }
})
