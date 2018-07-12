// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    userInfo: '',
    user: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        console.log(res.data)
        that.setData({
          phone: res.data
        })
      }
    })
    var userInfo = wx.getStorageSync('userInfo');
    var user = wx.getStorageSync('user');
    this.setData({
      userInfo: userInfo,
      user: user
    })
    this.current_bonus_card()
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
  // 继续赚
  go_index(){
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  // 提现
  withdrawal() {
    wx.showLoading({
      title: '加载中',
    })
    var cookie = wx.getStorageSync('cookie');
    var header = {};
    var that = this
    if (cookie) {
      header.Cookie = cookie; var that = this
      wx.request({
        url: 'https://www.kaaile.cn/money_cash',
        data: {
          money: 30
        },
        header: header,
        method: 'POST',
        success: function (res) {
          wx.hideLoading()
          console.log(res)
          wx.showToast({
            title: res.data.content,
            icon: 'success',
            duration: 5000
          })
          setTimeout(function () {
            that.current_bonus_card(options.checkpoint)
          }, 5000)
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
    }
  },
  current_bonus_card() {
    var cookie = wx.getStorageSync('cookie');
    var header = {};
    var that = this
    if (cookie) {
      header.Cookie = cookie; var that = this
    } else {
    }
    wx.request({
      url: 'https://www.kaaile.cn/user_info',
      data: '',
      header: header,
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            user: res.data.content
          })
          wx.setStorageSync('user', res.data.content)
        } else {
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})