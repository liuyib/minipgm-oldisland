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
    // 热搜关键词
    hotKeys: [],
    // 历史搜索关键词
    historyKeys: [],
    // 搜索结果
    results: [],
    pagination: {
      start: 0,
      count: 0,
      total: 0,
    },
    // 是否确认搜索
    isConfirm: false,
    // 搜索的 Loading
    searchLoading: false,
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
      this._setResultShow(false)
      this._setQuery('')
      this._clearResult()
    },

    onItemClick(event) {
      this.triggerEvent('myItemClick', { ...event.detail }, {})
    },

    _getSearch() {
      const { q } = this.data

      // TODO: 加载更多
      searchModel
        .getSearch({ q, start: 0, count: 20 })
        .then((res) => {
          const { data, start, count, total } = res

          this.setData({
            results: data,
            pagination: { start, count, total },
          })
        })
        .catch(() => {})
        .finally(() => {
          this._setLoading(false)
        })
    },

    _clearResult() {
      this.setData({
        results: [],
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
