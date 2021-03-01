import { HTTP } from '../utils/request'

class BookModel extends HTTP {
  getHotList() {
    return this.request({
      uri: `/book/hot`,
    })
  }
}

export { BookModel }
