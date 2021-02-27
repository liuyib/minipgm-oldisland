// components/navication/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
    },
    isFirst: {
      type: Boolean,
      value: true,
    },
    isLast: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc: './assets/arrow-left@black.png',
    rightSrc: './assets/arrow-right@black.png',
    leftDisableSrc: './assets/arrow-left@white.png',
    rightDisableSrc: './assets/arrow-right@white.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeftClick() {
      const { isFirst } = this.data

      if (isFirst) return;

      this.triggerEvent('myLeftClick', {}, {})
    },

    onRightClick() {
      const { isLast } = this.data

      if (isLast) return;

      this.triggerEvent('myRightClick', {}, {})
    },

  }
})
