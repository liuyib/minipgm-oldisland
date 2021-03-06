// components/button/index.js
Component({
  options: {
    multipleSlots: true,
  },

  externalClasses: ['ext-class'],

  /**
   * 组件的属性列表
   */
  properties: {
    isSlot: {
      type: Boolean,
      value: false,
    },
    text: {
      type: String,
      value: 'done',
    },
    openType: {
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
    onGetUserInfo(event) {
      this.triggerEvent('myGetUserInfo', event.detail, {})
    },
  },
})
