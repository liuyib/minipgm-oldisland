import { HTTP } from '../utils/request'

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
}

export { BookModel }
