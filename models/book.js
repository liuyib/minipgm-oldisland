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

  setLike({ uri, id, type }) {
    return likeModel.setLike({
      uri,
      id,
      type,
    })
  }
}

export { BookModel }
