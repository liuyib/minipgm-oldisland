// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 获取热搜关键词
     * @returns {Promise}
     */
    getHotKeys: {
      type: Function,
    },
    /**
     * 获取搜索结果
     * @param {string} q     - 搜索关键词
     * @param {number} start - 查询开始的索引
     * @param {number} count - 要获取的数量
     * @returns {Promise}
     */
    getSearch: {
      type: Function,
    },
    /**
     * 存储数据到缓存
     * @param {*} value - 要存储的值
     * @returns
     */
    setHistory: {
      type: Function,
    },
    /**
     * 从缓存中取数据
     * @returns {Array} - 存储的值
     */
    getHistory: {
      type: Function,
    },
  },

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
    // 输入框是否聚焦
    isInputFocus: false,
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
    // 加载更多 Loading
    moreLoading: false,
  },

  lifetimes: {
    attached() {
      this._setInputFocus(true)
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

    onFocus() {
      this._setResultShow(false)
      this._getHistory()
      this._clearResult()
    },

    onConfirm(event) {
      const { value } = event.detail
      const filteredVal = this._filterInput(value)

      if (!filteredVal) {
        wx.showToast({
          title: '请输入汉字或英文字母',
          icon: 'none',
        })
        return
      }

      this._setResultShow(true)
      this._setQuery(value)
      this._setLoading(true)
      this._setHistory(value)
      this._getSearch()
    },

    onDelete() {
      this._setResultShow(false)
      this._setInputFocus(true)
      this._getHistory()
      this._setQuery('')
      this._clearResult()
    },

    onGetMore() {
      const { isLoadMoreLocked, isAllLoaded } = this.data

      if (!isLoadMoreLocked && !isAllLoaded) {
        this._setLoadMoreLock(true)
        this._setMoreLoading(true)
        this._getSearch()
      }
    },

    onItemClick(event) {
      this.triggerEvent('myItemClick', { ...event.detail }, {})
    },

    _filterInput(val) {
      let filteredVal = val.trim()

      // 只允许输入汉字（/\p{sc=Han}/）和大小写英文字母
      filteredVal = filteredVal.replace(/[^a-zA-Z\p{sc=Han}]/gu, '')

      return filteredVal
    },

    _getSearch() {
      const { getSearch, q, start } = this.data

      getSearch({ q, start, count: 20 })
        .then((res) => {
          this._setResult(res)
        })
        .catch(() => {})
        .finally(() => {
          this._setLoadMoreLock(false)
          this._setLoading(false)
          this._setMoreLoading(false)
        })
    },

    _setResult(res) {
      const { results } = this.data
      const { data, start, count, total } = res
      // 计算下一次开始获取数据的索引
      const nextStart = start + count
      const isEmpty = count === 0 && total === 0
      const isAllLoaded = nextStart === total

      results.push(...data)

      this.setData({
        start: nextStart,
        total,
        results,
        isEmpty,
        isAllLoaded,
      })
    },

    _clearResult() {
      this.setData({
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

    _setMoreLoading(val) {
      this.setData({
        moreLoading: val,
      })
    },

    _setInputFocus(val) {
      this.setData({
        isInputFocus: val,
      })
    },

    async _getHotKeys() {
      const { getHotKeys } = this.data
      const res = await getHotKeys()
      this.setData({ hotKeys: res.data })
    },

    _setHistory(value) {
      const { setHistory } = this.data

      if (setHistory) {
        setHistory(value)
      }
    },

    _getHistory() {
      const { getHistory } = this.data

      if (getHistory) {
        const historyKeys = getHistory()
        this.setData({ historyKeys })
      }
    },
  },
})
