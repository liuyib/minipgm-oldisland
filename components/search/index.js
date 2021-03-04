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
  },

  lifetimes: {
    attached() {
      this.triggerEvent('myGetHotKeys', {}, {})
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
      this.setData({ isConfirm: true })
    },

    onDelete() {
      // TODO: 清除搜索，1. 清空搜索框，2. 清空列表数据
      // 3.将搜索关键词加入缓存（搜索历史）4. 重置无线加载的相关参数和数据
    },

    onBookDetail(event) {
      const { id } = event.detail
      this.triggerEvent('myBookDetail', { id }, {})
    },
  },
})
