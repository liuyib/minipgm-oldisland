import { TokenModel } from './models/token'

App({
  onLaunch() {
    const tokenModel = new TokenModel()
    tokenModel.verify()
  }
});
