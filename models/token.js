import { HTTP } from '../utils/request'
import { promisify } from '../utils/util'

class TokenModel {
  /**
   * 验证 Token
   * @api public
   * @returns
   */
  verify() {
    const token = wx.getStorageSync('token')

    if (token) {
      this.verifyFromServer()
    } else {
      this.getFromServer()
    }
  }

  /**
   * 从服务器获取 Token
   * @api public
   * @returns
   */
  async getFromServer() {
    try {
      const res = await promisify(wx.login)()

      if (!res || !res.code) throw res

      const token = await HTTP.request({
        uri: '/token',
        method: 'POST',
        data: {
          account: res.code,
          // type: 100 表示小程序端登录
          type: 100,
        },
      })

      wx.setStorage({ key: 'token', data: token.data })
      this._clearResendQueue()
    } catch (err) {
      wx.showToast({
        title: err.message || err.errMsg || 'token 获取失败',
        icon: 'none',
      })
    }
  }

  /**
   * 从服务器验证 Token。如果验证失败，则重新获取一次
   * @api public
   * @returns
   */
  verifyFromServer() {
    HTTP.request({
      uri: '/token/verify',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token'),
      },
    }).catch(() => {
      this.getFromServer()
    })
  }

  /**
   * 清空 HTTP 请求重发队列
   * @api private
   * @returns
   */
  _clearResendQueue() {
    const { resendQueue } = getApp().globalData

    while (resendQueue.length) {
      const req = resendQueue.shift()

      HTTP.wxrequest({
        ...req,
        isRefreshToken: false,
      })
    }
  }
}

export { TokenModel }
