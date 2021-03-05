import { BookModel } from '../../models/book'
import { HistoryModel } from '../../models/history'

const bookModel = new BookModel()

HistoryModel.init({
  key: 'history-book-search',
  maxLen: 10,
})

// pages/book/book.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 书籍数据
    books: [],
    // 是否正在搜索
    isSearching: false,
    // 获取热搜关键词
    getHotKeys: bookModel.getHotKeys,
    // 获取搜索结果
    getSearch: bookModel.getSearch,
    // 设置历史搜索关键词
    setHistory: HistoryModel.setData,
    // 获取历史搜索关键词
    getHistory: HistoryModel.getData,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getHotBookList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  onDetail(event) {
    const { id } = event.detail

    wx.navigateTo({
      url: `/pages/book-detail/book-detail?id=${id}`,
    })
  },

  onToggleSearch() {
    const { isSearching } = this.data

    this.setData({
      isSearching: !isSearching,
    })
  },

  _getHotBookList() {
    bookModel.getHotList().then((res) => {
      this.setData({
        books: res.data,
      })
    })
  },
})
