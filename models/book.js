import { HTTP } from '../utils/request'
import { LikeModel } from './like'

const likeModel = new LikeModel()

class BookModel extends HTTP {
  getHotList() {
    return this.request({
      uri: `/book/hot`,
      method: 'GET',
    })
  }

  getDetail(id) {
    return this.request({
      uri: `/book/detail/${id}`,
      method: 'GET',
    })
  }

  getLike(id) {
    return this.request({
      uri: `/book/favor/${id}`,
      method: 'GET',
    })
  }

  getShortComment(id) {
    return this.request({
      uri: `/book/short_comment/${id}`,
      method: 'GET',
    })
  }

  setShortComment({ artId, content }) {
    return this.request({
      uri: `/book/short_comment/add`,
      method: 'POST',
      data: {
        artId,
        content,
      },
    })
  }

  setLike({ uri, id, type }) {
    return likeModel.setLike({
      uri,
      id,
      type,
    })
  }

  getHotSearchKeys() {
    return this.request({
      uri: `/book/hot_keyword`,
      method: 'GET',
    })
  }

  /**
   * 搜索书籍
   * @param {Object} param
   * @param {string} param.q     - 关键词
   * @param {number} param.start - 数据开始索引
   * @param {number} param.count - 获取数量
   */
  getSearch({ q, start, count }) {
    return this.request({
      uri: `/book/search`,
      method: 'GET',
      data: {
        q,
        start,
        count,
      },
    })
  }
}

export { BookModel }
