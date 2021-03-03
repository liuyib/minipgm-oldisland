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
    attached() {
      this._listenBGM()
      this._resetPlay()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTogglePlay() {
      const { isPlaying, data } = this.data

      if (isPlaying) {
        this._pauseBGM()
      } else {
        this._playBGM(data)
      }

      this._togglePlay()
    },

    _togglePlay() {
      this.setData({
        isPlaying: !this.data.isPlaying,
      })
    },

    _playBGM(data) {
      // TODO: 数据库增加歌手字段（singer）
      const { url, title, image, singer } = data

      Object.assign(bgm, {
        src: url,
        title,
        epname: title,
        singer,
        coverImgUrl: image,
      })
    },

    _pauseBGM() {
      bgm.pause()
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
