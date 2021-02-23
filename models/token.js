const { HTTP } = require('../utils/request')

class TokenModel extends HTTP {
  /**
   * 验证 Token
   * @api public
   * @returns
   */
  verify() {
    const token = wx.getStorageSync('token')

    if (token) {
      this._verifyTokenFromServer()
    } else {
      this._getTokenFromServer()
    }
  }

  /**
   * 从服务器获取 Token
   * @api private
   * @returns
   */
  _getTokenFromServer() {
    const that = this

    wx.login({
      success(res) {
        if (res.code) {
          that.request({
            uri: '/token',
            method: 'POST',
            data: {
              account: res.code,
              // type: 100 表示小程序端登录
              type: 100
            },
          }).then((res) => {
            wx.setStorageSync('token', res.data)
          }).catch((err) => {
            wx.showToast({
              title: err,
              icon: 'icon',
            })
          })
        }
      }
    })
  }

  /**
   * 从服务器验证 Token
   * @api private
   * @returns
   */
  _verifyTokenFromServer() {
    this.request({
      uri: '/token/verify',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token'),
      },
    }).catch((err) => {
      wx.showToast({
        title: `${err}，请登录`,
        icon: 'none',
        duration: 3000,
      })
    })
  }

}

module.exports = {
  TokenModel,
}
