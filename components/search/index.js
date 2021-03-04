// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 热搜关键词
    hotKeys: {
      type: Array,
    },
    // 搜索结果
    results: {
      type: Array,
      observer(vals) {
        console.log(vals)
        this.setData({
          searchLoading: false,
        })
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 搜索参数
    q: '',
    // 历史搜索关键词
    historyKeys: [],
    // 是否确认搜索
    isConfirm: false,
    // 搜索的 Loading
    searchLoading: false,
  },

  lifetimes: {
    attached() {
      this.triggerEvent('myGetHotKeys', {}, {})

      this.setData({
        historyKeys: wx.getStorageSync('search-book-history'),
      })
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

      this.triggerEvent('mySearch', { value }, {})
      this.setData({
        q: value,
        isConfirm: true,
        searchLoading: true,
      })
      this._setSearchHistory({ value })
    },

    _setSearchHistory({ value, key = 'search-book-history', maxCount = 10 }) {
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

    onDelete() {
      this.setData({
        q: '',
        results: [],
        isConfirm: false,
      })
    },

    onBookDetail(event) {
      const { id } = event.detail
      this.triggerEvent('myBookDetail', { id }, {})
    },
  },
})
