// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLike: {
      type: Boolean
    },
    count: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeSrc: './assets/like.png',
    dissSrc: './assets/like@diss.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(ev) {
      let { isLike, count } = this.properties;
      isLike = !isLike;
      count = isLike ? count + 1 : count - 1;
      this.setData({ isLike, count })
    }
  }
})
