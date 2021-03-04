import { SearchModel } from '../_models/search'

const searchModel = new SearchModel()

// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    // 搜索参数
    q: '',
    // 获取数据的开始索引（从第几条开始获取）
    start: 0,
    // 该关键词能搜到的数据总数
    total: 0,
    // 搜索结果
    results: [],
    // 热搜关键词
    hotKeys: [],
    // 历史搜索关键词
    historyKeys: [],
    // 是否确认搜索
    isConfirm: false,
    // 是否搜索不到数据
    isEmpty: false,
    // 搜索的 Loading
    searchLoading: false,
    // 是否锁住加载更多（防止短时间内频繁请求）
    isLoadMoreLocked: false,
    // 是否已经加载全部数据
    isAllLoaded: false,
  },

  lifetimes: {
    attached() {
      this._getHistory()
      this._getHotKeys()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('myCancel', {}, {})
    },

    onConfirm(event) {
      const { value } = event.detail

      this._setResultShow(true)
      this._setQuery(value)
      this._setLoading(true)
      this._getSearch()
      this._setHistory({ value })
    },

    onDelete() {
      this._getHistory()
      this._setResultShow(false)
      this._clearResult()
    },

    onGetMore() {
      const { isAllLoaded } = this.data

      if (!isAllLoaded) {
        this._setLoadMoreLock(true)
        this._getSearch()
      }
    },

    onItemClick(event) {
      this.triggerEvent('myItemClick', { ...event.detail }, {})
    },

    _getSearch() {
      const { q, start } = this.data

      searchModel
        .getSearch({ q, start, count: 20 })
        .then((res) => {
          this._setResult(res)
        })
        .catch(() => {})
        .finally(() => {
          this._setLoading(false)
          this._setLoadMoreLock(false)
        })
    },

    _setResult(res) {
      const { results } = this.data
      const { data, start, count, total } = res
      const nextStart = start + count
      const isEmpty = count === 0 && total === 0
      const isAllLoaded = nextStart === total

      results.push(...data)

      this.setData({
        // 计算下一次开始获取数据的索引
        start: nextStart,
        total,
        results,
        isEmpty,
        isAllLoaded,
      })
    },

    // TODO: 用户通过键盘删除输入的内容，也要执行 _clearResult
    _clearResult() {
      this.setData({
        q: '',
        start: 0,
        total: 0,
        results: [],
        isEmpty: false,
        isAllLoaded: false,
      })
    },

    _setQuery(val) {
      this.setData({
        q: val,
      })
    },

    _setResultShow(val) {
      this.setData({
        isConfirm: val,
      })
    },

    _setLoading(val) {
      this.setData({
        searchLoading: val,
      })
    },

    _setLoadMoreLock(val) {
      this.setData({
        isLoadMoreLocked: val,
      })
    },

    _setHistory({ value, key = 'search-book-history', maxCount = 10 }) {
      let keywords = wx.getStorageSync(key)

      if (Array.isArray(keywords)) {
        if (!keywords.includes(value)) {
          keywords.unshift(value)

          if (keywords.length > maxCount) {
            keywords.length = maxCount
          }
        }
      } else {
        keywords = [value]
      }

      wx.setStorage({ key, data: keywords })
    },

    _getHistory(key = 'search-book-history') {
      this.setData({
        historyKeys: wx.getStorageSync(key),
      })
    },

    async _getHotKeys() {
      const res = await searchModel.getHotKeys()
      this.setData({ hotKeys: res.data })
    },
  },
})
