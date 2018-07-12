// pages/top/top.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    list: '',
    page: 1
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
    this.get_list()
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

  // 请求排行数据
  get_list() {
    var that = this
    var page = this.data.page
    wx.request({
      url: 'https://www.kaaile.cn/ranking_list',
      data: {
        page: page
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (page == 1) {
          that.setData({
            list: res.data.content
          })
        } else if (res.data.status!=-100){
          var list = that.data.list
          var a = list.concat(res.data.content)
          console.log(a)
          that.setData({
            list: a
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  lower() {
    this.setData({
      page: this.data.page + 1
    })
    this.get_list()
  }
})