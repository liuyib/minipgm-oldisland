import { HTTP } from '../../utils/request'

class SearchModel extends HTTP {
  getHotKeys() {
    return this.request({
      uri: `/book/hot_keyword`,
      method: 'GET',
    })
  }

  /**
   * 搜索书籍
   * @param {Object} param
   * @param {string} param.q     - 关键词
   * @param {number} param.start - 数据开始索引
   * @param {number} param.count - 获取数量
   */
  getSearch({ q, start, count }) {
    return this.request({
      uri: `/book/search`,
      method: 'GET',
      data: {
        q,
        start,
        count,
      },
    })
  }
}

export { SearchModel }
