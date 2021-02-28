import { HTTP } from '../utils/request'

class ClassicModel extends HTTP {
  getLatest() {
    return this.request({
      uri: '/classic/latest',
      method: 'GET',
    })
  }

  /**
   * 获取期刊（通过指定 API 路径）
   * @param {(string|number)} index - 期刊索引
   * @param {boolean} isGetNext     - 是否获取下一期（true：获取下一期，false：获取上一期）
   * @returns {Promise}
   */
  getClassic(index, isGetNext) {
    const key = `/classic/${isGetNext ? index + 1 : index - 1}`
    const cache = wx.getStorageSync(key)

    if (!cache) {
      return this.request({
        uri: `/classic/${index}/${isGetNext ? 'next' : 'prev'}`,
        method: 'GET',
      })
    } else {
      return new Promise((resolve) => resolve(cache))
    }
  }

  isFirst(index, maxIndex) {
    return index === maxIndex
  }

  isLast(index) {
    return index === 1
  }
}

export { ClassicModel }
