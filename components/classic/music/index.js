// components/classic/music/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banner: {
      type: String,
    },
    content: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    playSrc: './assets/btn@play.png',
    pauseSrc: './assets/btn@pause.png',
    isPlaying: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
