// pages/Challenge/Challenge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    user:'5.000'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        console.log(res.data)
        that.setData({
          phone:res.data
        })
      }
    })
    this.get_challenge_gang()
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
  // 挑战资金池剩余金额
  get_challenge_gang(){
    var cookie = wx.getStorageSync('cookie');
    var header = {};
    var that = this
    if (cookie) {
      header.Cookie = cookie; var that = this
    }
    wx.request({
      url: 'https://www.kaaile.cn/challenge_gang',
      data: '',
      header: header,
      success: function (res) {
        console.log(res.data.content)
        that.setData({
          user: res.data.content
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})