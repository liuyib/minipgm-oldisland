import { HTTP } from '../utils/request'

class LikeModel extends HTTP {
  setLike({ url, id, type }) {
    console.log(id, type)
    return this.request({
      uri: url,
      method: 'POST',
      data: {
        artId: id,
        type,
      },
    })
  }
}

export {
  LikeModel,
}
