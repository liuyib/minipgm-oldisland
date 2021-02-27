import { HTTP } from '../utils/request'

class ClassicModel extends HTTP {
  getLatest() {
    return this.request({
      uri: '/classic/latest',
      method: 'GET',
    })
  }

  getPrev(index) {
    return this.request({
      uri: `/classic/${index}/prev`,
      method: 'GET'
    })
  }

  getNext(index) {
    return this.request({
      uri: `/classic/${index}/next`,
      method: 'GET'
    })
  }

  isFirst(index, maxIndex) {
    return index === maxIndex
  }

  isLast(index) {
    return index === 1
  }

}

export {
  ClassicModel,
}
