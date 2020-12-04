import wxComputed from 'wx-computed2'
import api from '../../api/index'
import router from '../../wxapi/router'
import toast from '../../wxapi/toast'
import store from '../../wxapi/store'

Page({
  data: {
    keyword: 'nest',
    searchRes: [],
    showSearchRes: false,
    keywordList: [],
    selectedKeywordList: [] 
  },

  onLoad () {
    wxComputed(this)
    this.initKeywordList()
  },

  initKeywordList () {
    const list = store.get('keywordList') || []
    console.log('从本地拿keywordList=', list)
    this.setData({
      keywordList: list
    })
  },

  searchOnGithub (e) {
    const str = e.detail
    api.github.search(str).then((res) => {
      console.log('搜索到的列表=', res.items)
      this.setData({
        searchRes: res.items,
        showSearchRes: true
      })
    })
  },

  // 将github搜索结果选中的关键词存入本地keywordList
  addKeyword (e) {
    const item = e.target.dataset.item
    const fullName = item.full_name
    const has = this.data.keywordList.some((item) => {
      return item === fullName
    })
    if (!has) { // 如果没有，则加入
      const newList = this.data.keywordList
      const len = newList.unshift(fullName)
      this.setData({
        keywordList: newList
      })
      store.set('keywordList', newList)
    }
    this.setData({
      showSearchRes: false,
      keyword: ''
    })
  },

  delKeyword (e) {
    const delItem = e.target.dataset.item
    const res = this.data.keywordList.filter((item) => {
      return item !== delItem
    })
    this.setData({
      keywordList: res
    })
    store.set('keywordList', res)
  },

  changeKeywordList (e) {
    const list = e.detail
    console.log('changeKeywordList=', list)
    this.setData({
      selectedKeywordList: list
    })
  },

  toCompare () {
    const compareList = this.data.keywordList
    console.log('compareList=', compareList)
    if (compareList.length > 0) {
      router.to('/pages/githubCompare/githubCompare', { compareList })
    } else {
      toast.show('请先搜索，添加对比项')
    }
  }
})
