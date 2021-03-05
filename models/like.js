import { HTTP } from '../utils/request'

class LikeModel {
  setLike({ uri, id, type }) {
    return HTTP.request({
      uri,
      method: 'POST',
      data: {
        artId: id,
        type,
      },
    })
  }

  getLike(uri) {
    return HTTP.request({
      uri,
      method: 'GET',
    })
  }
}

export { LikeModel }
