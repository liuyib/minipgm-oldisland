const { TokenModel } = require('./models/token')

App({
  onLaunch() {
    const tokenModel = new TokenModel()
    tokenModel.verify()
  }
});
