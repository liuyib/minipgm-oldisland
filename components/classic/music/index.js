// components/classic/music/index.js
import { classicBehavior } from '../classic-behavior'

const bgm = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBehavior],

  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
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

  lifetimes: {
    attached: function () {
      this._listenBGM()
      this._resetPlay()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function () {
      const { isPlaying, data } = this.data

      if (isPlaying) {
        bgm.pause()
      } else {
        this._setBGM(bgm, data)
      }

      this.setData({
        isPlaying: !isPlaying,
      })
    },

    _setBGM(bgmObj, data) {
      // TODO: 数据库增加歌手字段（singer）
      const { url, title, image, singer } = data

      Object.assign(bgmObj, {
        src: url,
        title,
        epname: title,
        singer,
        coverImgUrl: image,
      })
    },

    _listenBGM() {
      bgm.onPlay(() => {
        this._resetPlay()
      })
      bgm.onPause(() => {
        this._resetPlay()
      })
      bgm.onStop(() => {
        this._resetPlay()
      })
      bgm.onEnded(() => {
        this._resetPlay()
      })
      bgm.onError(() => {
        this._resetPlay()
      })
    },

    _resetPlay() {
      const { data } = this.data

      if (bgm.paused) {
        this.setData({ isPlaying: false })
      } else if (bgm.src === data.url) {
        this.setData({ isPlaying: true })
      }
    },
  },
})
