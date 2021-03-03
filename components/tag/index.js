// components/tag/index.js
Component({
  options: {
    // 启用多 slot 支持
    multipleSlots: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onClick() {
      const { text } = this.data
      this.triggerEvent('myTap', { value: text }, {})
    },
  },
})
