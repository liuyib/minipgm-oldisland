import { HTTP } from '../utils/request'

class LikeModel extends HTTP {
  setLike({ uri, id, type }) {
    return this.request({
      uri,
      method: 'POST',
      data: {
        artId: id,
        type,
      },
    })
  }

  getLike(uri) {
    return this.request({
      uri,
      method: 'GET',
    })
  }
}

export { LikeModel }
