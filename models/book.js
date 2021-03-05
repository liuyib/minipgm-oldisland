import { HTTP } from '../utils/request'
import { LikeModel } from './like'

const likeModel = new LikeModel()

class BookModel {
  getHotList() {
    return HTTP.request({
      uri: `/book/hot`,
      method: 'GET',
    })
  }

  getDetail(id) {
    return HTTP.request({
      uri: `/book/detail/${id}`,
      method: 'GET',
    })
  }

  getLike(id) {
    return HTTP.request({
      uri: `/book/favor/${id}`,
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

  getShortComment(id) {
    return HTTP.request({
      uri: `/book/short_comment/${id}`,
      method: 'GET',
    })
  }

  setShortComment({ artId, content }) {
    return HTTP.request({
      uri: `/book/short_comment/add`,
      method: 'POST',
      data: {
        artId,
        content,
      },
    })
  }

  getHotKeys() {
    return HTTP.request({
      uri: `/book/hot_keyword`,
      method: 'GET',
    })
  }
}

export { BookModel }
