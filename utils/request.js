import { Base64 } from 'js-base64'
import { config } from '../config'
import { urlResolve, promisify } from './util'
import { TokenModel } from '../models/token'

class HTTP {
  /**
   * 封装 wx.request
   * @api public
   * @param 见 HTTP.wxrequest
   * @returns {Promise}
   */
  static request({ uri, method = 'GET', data = {}, isRefreshToken = true }) {
    return new Promise((resolve, reject) => {
      HTTP.wxrequest({
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
   * @api public
   * @param {Object} param
   * @param {string} param.uri                    - 请求地址（完整 URL、请求路径）
   * @param {string} [param.method=GET]           - 请求方法
   * @param {Object} [param.data={}]              - 传输数据
   * @param {boolean} [param.isRefreshToken=true] - 是否启用无感知刷新 token
   * @param {Function} param.resolve              - 成功的回调
   * @param {Function} param.reject               - 失败的回调
   * @returns
   */
  static async wxrequest({
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
      Authorization: HTTP._encode(),
    }
    // 信号量，用于函数的行为控制。借鉴 Web API: AbortSignal 的思路：https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal
    const signal = {}

    try {
      const res = await promisify(wx.request)({
        url,
        method,
        data,
        header,
        signal,
      })
      const { code, msg } = res.data
      const statusCode = res.statusCode

      if (code === 0) {
        resolve(res.data)
      } else if (statusCode === 403) {
        const { resendQueue } = getApp().globalData

        if (isRefreshToken) {
          // 本次加载中，第一个 403 的请求触发重新获取 token
          if (!resendQueue.length) {
            HTTP._refreshToken()
          }

          // 将授权失败的请求加入重发队列，等 token 成功获取后再重新发送
          resendQueue.push({ uri, method, data, resolve, reject })
        }
      } else {
        reject(msg)

        wx.showToast({
          title: String(msg),
          icon: 'none',
        })
      }
    } catch (err) {
      // 请求被取消时，不返回错误信息
      if (err && err.errMsg !== 'request:fail abort') {
        reject(err)

        wx.showToast({
          title: String(err.message || err.msg || err.errMsg || err),
          icon: 'none',
        })
      }
    }

    HTTP._uniqueReq(signal, { url, method })
  }

  /**
   * 获取 HTTP Basic Auth 中 Authorization 字段的值
   * @api private
   * @returns {string}
   */
  static _encode() {
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(`${token}:`)
    // Authorization: Basic base64(account:secret)
    return `Basic ${base64}`
  }

  /**
   * 刷新用户的登录令牌
   * @api private
   * @returns
   */
  static _refreshToken() {
    const tokenModel = new TokenModel()
    tokenModel.getFromServer()
  }

  /**
   * 防止相同的请求重复发送
   * @param {Object} reqTaskDuck  - 鸭子类行。用于取消 wx.request 请求的发送，只要有 abort() 方法即可。
   *                               （可以是“wx.request 的返回值” 或 “具有 abort() 方法的对象”）
   * @param {Object} param
   * @param {Object} param.url    - URL
   * @param {Object} param.method - 请求方法
   * @returns
   */
  static _uniqueReq(reqTaskDuck, { url, method }) {
    const { reqCache } = getApp().globalData
    const cacheKey = `url:${url},method:${method}`
    const cacheVal = reqCache.get(cacheKey)

    if (cacheVal) {
      cacheVal.abort()
    }

    reqCache.set(cacheKey, reqTaskDuck)
  }
}

export { HTTP }
