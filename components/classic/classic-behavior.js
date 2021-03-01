const classicBehavior = Behavior({
  properties: {
    // 封面图片
    banner: {
      type: String,
    },
    // 期刊内容
    content: {
      type: String,
    },
    // 小程序组件中的 hidden 属性，用于控制组件的显示或隐藏
    hidden: {
      type: Boolean,
    }
  },
})

export { classicBehavior }
