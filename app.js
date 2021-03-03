import { TokenModel } from './models/token'

App({
  globalData: {
    // HTTP 请求缓存
    reqCache: new Map(),
    // HTTP 请求重发队列（授权失败的请求（HTTP Status Code: 403）会被加入该队列）
    resendQueue: [],
  },

  onLaunch() {
    const tokenModel = new TokenModel()
    tokenModel.verify()
  },
})
