class HistoryModel {
  /**
   * 初始化的方法
   * @param {Object} [option]                   - 可选参数
   * @param {string} [option.key='history-xxx'] - 存储数据时的 KEY
   * @param {number} [option.maxLen=10]         - 存储数据的最大长度
   */
  static init({ key, maxLen } = {}) {
    HistoryModel.key = key || 'history-xxx'
    HistoryModel.maxLen = maxLen || 10
  }

  /**
   * 向缓存中存储数据
   * @param {*} value - 要存到缓存的数据
   * @returns
   */
  static setData(value) {
    const { key, maxLen } = HistoryModel
    let keys = wx.getStorageSync(key)

    if (Array.isArray(keys)) {
      if (!keys.includes(value)) {
        keys.unshift(value)

        if (keys.length > maxLen) {
          keys.length = maxLen
        }
      }
    } else {
      keys = [value]
    }

    wx.setStorage({ key, data: keys })
  }

  /**
   * 从缓存中读取数据
   * @returns {Array}
   */
  static getData() {
    const { key } = HistoryModel
    const vals = wx.getStorageSync(key)
    return Array.isArray(vals) ? vals : []
  }
}

export { HistoryModel }
