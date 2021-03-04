import { BookModel } from '../../models/book'

const bookModel = new BookModel()

// pages/book/book.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 书籍数据
    books: [],
    // 热搜关键词
    hotSearchKeys: [],
    searchResults: [],
    pagination: {
      start: 0,
      count: 0,
      total: 0,
    },
    // 是否正在搜索
    isSearching: false,
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

  async onGetHotSearchKeys() {
    const res = await bookModel.getHotSearchKeys()
    this.setData({ hotSearchKeys: res.data })
  },

  onToggleSearch() {
    const { isSearching } = this.data

    this.setData({
      isSearching: !isSearching,
    })
  },

  async onSearch(event) {
    const { value } = event.detail
    const res = await bookModel.getSearch({
      q: value,
      start: 0,
      count: 20,
    })
    const { data, start, count, total } = res

    this.setData({
      searchResults: data,
      pagination: {
        start,
        count,
        total,
      },
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
