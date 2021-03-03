// components/search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotKeys: {
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

    onConfirm(val) {
      // TODO: 回车后搜索
      console.log(`onConfirm ~ val`, val)
    },

    onDelete() {
      // TODO: 清除搜索，1. 清空搜索框，2. 清空列表数据
      // 3.将搜索关键词加入缓存（搜索历史）4. 重置无线加载的相关参数和数据
    },
  },
})
