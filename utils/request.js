import { Base64 } from 'js-base64'
import { config } from '../config'
import { urlResolve } from './util'
import { TokenModel } from '../models/token'

class HTTP {
  /**
   * 封装 wx.request
   * @api public
   * @param 见 this._request
   * @returns {Promise}
   */
  request({ uri, method = 'GET', data = {}, isRefreshToken = true }) {
    return new Promise((resolve, reject) => {
      this._request({
        uri,
        method,
        data,
        isRefreshToken,
        resolve,
        reject,
      })
    })
  }

  /**
   * 封装 wx.request
   * @api private
   * @param {Object} param
   * @param {string} param.uri             - 请求地址（完整 URL、请求路径）
   * @param {string} param.method          - 请求方法
   * @param {Object} param.data            - 传输数据
   * @param {Function} param.resolve       - 成功的回调
   * @param {Function} param.reject        - 失败的回调
   * @param {boolean} param.isRefreshToken - 是否启用无感知刷新 token
   * @returns
   */
  _request({
    uri,
    method = 'GET',
    data = {},
    isRefreshToken = true,
    resolve,
    reject,
  }) {
    if (typeof uri !== 'string') {
      reject('uri 参数必须是字符串')
    }

    const url = uri.startsWith('http')
      ? uri
      : urlResolve(config.apiBaseUrl, uri)
    const header = {
      'content-type': 'application/json',
      // HTTP Basic Auth 协议需要携带的请求头
      Authorization: this._encode(),
    }
    const reqCache = getApp().globalData.reqCache
    const reqTask = wx.request({
      url,
      method,
      data,
      header,
      success: (res) => {
        const { code, msg } = res.data
        const statusCode = res.statusCode

        if (code === 0) {
          resolve(res.data)
        } else if (statusCode === 403) {
          if (isRefreshToken) {
            this._refresh({
              uri,
              method,
              data,
              resolve,
              reject,
            })
          }
        } else {
          reject(msg)
        }
      },
      fail: (err) => {
        // 请求被取消时，不返回错误信息
        if (err && err.errMsg !== 'request:fail abort') {
          reject(err)
        }
      },
    })
    const cacheKey = `url:${url},method:${method}`
    const cacheVal = reqCache.get(cacheKey)

    if (cacheVal) {
      cacheVal.abort()
    }

    reqCache.set(cacheKey, reqTask)
  }

  /**
   * 无感知刷新用户的登录令牌
   * @api private
   * @returns
   */
  _refresh(param) {
    const tokenModel = new TokenModel()
    const requestAgain = () => {
      this._request({
        ...param,
        isRefreshToken: true,
      })
    }

    tokenModel.getFromServer({
      success: requestAgain,
    })
  }

  /**
   * 获取 HTTP Basic Auth 中 Authorization 字段的值
   * @api private
   * @returns {string} HTTP 头部中的 Authorization 字段的值
   */
  _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(`${token}:`)
    // Authorization: Basic base64(account:secret)
    return `Basic ${base64}`
  }
}

export { HTTP }
