import { HTTP } from '../utils/request'
import { LikeModel } from './like'

const likeModel = new LikeModel()

class ClassicModel {
  getLatest() {
    return HTTP.request({
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
  async getClassic(index, isGetNext) {
    const key = `/classic/${isGetNext ? index + 1 : index - 1}`
    const cache = wx.getStorageSync(key)

    if (cache) {
      const { type, id } = cache.data
      const likeUrl = `/classic/favor/${type}/${id}`
      const like = await likeModel.getLike(likeUrl)

      Object.assign(cache.data, like.data)

      return cache
    } else {
      return HTTP.request({
        uri: `/classic/${index}/${isGetNext ? 'next' : 'prev'}`,
        method: 'GET',
      })
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
