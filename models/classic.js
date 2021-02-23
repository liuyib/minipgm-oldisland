const { HTTP } = require('../utils/request')

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

module.exports = {
  ClassicModel,
}
