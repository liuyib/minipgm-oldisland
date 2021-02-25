import { HTTP } from '../utils/request'

class ClassicModel extends HTTP {
  getLatest() {
    return this.request({
      uri: '/classic/latest',
      method: 'GET',
    })
  }
}

export {
  ClassicModel,
}
