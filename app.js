import { TokenModel } from './models/token'

App({
  globalData: {
    // HTTP 请求队列
    reqCache: new Map(),
  },

  onLaunch() {
    const tokenModel = new TokenModel()
    tokenModel.verify()
  },

});
