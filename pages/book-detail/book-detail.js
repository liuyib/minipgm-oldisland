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
    this._setCommenting(true)
  },

  onCancel() {
    this._setCommenting(false)
  },

  onSubmitComment(event) {
    const { id } = this.data
    const { value } = event.detail

    bookModel
      .setShortComment({
        artId: id,
        content: value,
      })
      .then((res) => {
        this._updateComments(value)
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      })
  },

  onToggleLike() {
    const { id, likeStatus } = this.data
    const uri = `/favor${likeStatus ? '/cancel' : ''}`

    bookModel.setLike({ uri, id, type: 400 }).then((res) => {
      this.setData({
        likeStatus: !likeStatus,
      })
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    })
  },

  _getDetail(id) {
    wx.showLoading({ title: '加载中...' })

    Promise.all([
      bookModel.getDetail(id),
      bookModel.getLike(id),
      bookModel.getShortComment(id),
    ])
      .then((res) => {
        const detail = res[0].data
        const like = res[1].data
        const { comments } = res[2].data

        comments.sort((a, b) => b.nums - a.nums)

        this.setData({
          detail,
          likeStatus: !!like.like_status,
          likeNums: like.fav_nums,
          comments,
          isNoComment: comments && !comments.length,
        })
      })
      .catch(() => {
        wx.showToast({
          title: '数据加载出错',
          icon: 'none',
        })
      })
      .finally(() => {
        wx.hideLoading()
      })
  },

  /**
   * 同步短评数据到页面上
   * @param {string} added 新添加的短评
   * @returns
   */
  _updateComments(added) {
    const { comments } = this.data
    let isNewComment = true

    for (const comment of comments) {
      if (comment.content === added) {
        comment.nums++
        isNewComment = false
      }
    }

    if (isNewComment) {
      comments.push({ content: added, nums: 1 })
    }

    this.setData({ comments })
    this._setCommenting(false)
  },

  _setCommenting(val) {
    this.setData({
      isCommenting: val,
    })
  },
})
