import { ClassicModel } from '../../models/classic'
import { LikeModel } from '../../models/like'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

// pages/classic/classic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel
      .getLatest()
      .then((res) => {
        this.setData({
          classicData: res.data,
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onLike: function (event) {
    const { isLike } = event.detail
    const { id, type } = this.data.classicData
    const url = `/favor${isLike ? '/cancel' : ''}`

    likeModel
      .setLike({ url, id, type })
      .then((res) => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
      })
  },

  onLeftClick() {
    console.log('left')
  },

  onRightClick() {
    console.log('right')
  },

})