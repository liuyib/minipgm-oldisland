// components/classic/order/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },

  /**
   * 组件的方法列表
   */
  methods: {},
})
