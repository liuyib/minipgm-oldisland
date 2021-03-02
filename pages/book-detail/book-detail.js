import { BookModel } from '../../models/book'

const bookModel = new BookModel()

// pages/book-detail/book-detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 该书籍的 ID
    id: 0,
    // 数据详情数据
    detail: null,
    // 是否点赞
    likeStatus: false,
    // 点赞数量
    likeNums: 0,
    // 书籍短评
    comments: [],
    // 是否没有短评
    isNoComment: true,
    // 是否正在评论
    isCommenting: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options

    this.setData({ id })
    this._getDetail(id)
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

  onComment() {
    this.setData({
      isCommenting: true,
    })
  },

  onCancel() {
    this.setData({
      isCommenting: false,
    })
  },

  onSubmitComment(event) {
    const { id } = this.data
    const { value } = event.detail
    const comment = bookModel.setShortComment({
      artId: id,
      content: value,
    })

    comment.then((res) => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    })
  },

  onLike() {
    const { id, likeStatus } = this.data
    const uri = `/favor${likeStatus ? '/cancel' : ''}`
    const like = bookModel.setLike({ uri, id, type: 400 })

    like.then((res) => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    })
  },

  _getDetail(id) {
    const detail = bookModel.getDetail(id)
    const like = bookModel.getLike(id)
    const comment = bookModel.getShortComment(id)

    detail
      .then((res) => {
        this.setData({
          detail: res.data,
        })

        like.then((res) => {
          const { data } = res

          this.setData({
            likeStatus: !!data.like_status,
            likeNums: data.fav_nums,
          })
        })
        comment.then((res) => {
          const { comment } = res.data

          comment.sort((a, b) => b.nums - a.nums)
          this.setData({
            comments: comment,
            isNoComment: comment && !comment.length,
          })
        })
      })
      .catch((err) => {
        wx.showToast({
          title: err,
          icon: 'none',
        })
      })
  },
})
