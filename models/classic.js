import { HTTP } from '../utils/request'

class ClassicModel extends HTTP {
  getLatest() {
    this.request({
      uri: '/classic/latest',
      method: 'GET',
    }).then((res) => {
      console.log(res)
      console.log(res.data)
    })
  }
}

export {
  ClassicModel,
}
