// pages/Recharge/Recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    payment: [
      { money: 1, integral: 500 },
      { money: 3, integral: 1600 },
      { money: 5, integral: 3000 },
      { money: 10, integral: 6000 },
      { money: 20, integral: 12000 },
      { money: 30, integral: 20000 },
      { money: 50, integral: 30000 },
      { money: 100, integral: 100000 },
    ],
    now_payment: { money: 1, integral: 500 },
    user:''
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
    this.get_money()
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
  // 挑战关卡显示
  current_bonus_card() {
    var cookie = wx.getStorageSync('cookie');
    var header = {};
    var that = this
    if (cookie) {
      header.Cookie = cookie; var that = this
      wx.request({
        url: 'https://www.kaaile.cn/user_info',
        data: '',
        header: header,
        success: function (res) {
          console.log(res)
          that.setData({
            user: res.data.content
          })
          wx.setStorageSync('user', res.data.content)
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  payment(e){
    var index=e.currentTarget.dataset.index
    console.log(index)
    var a = this.data.payment[index]
    console.log(a)    
    this.setData({
      now_payment:a
    })
    console.log(this.data.now_payment)        
  },
  // 请求金币
  get_money(){
    var  cookie = wx.getStorageSync('cookie');
    var  header = {};
    console.log(cookie)    
    if (cookie) {
      header.Cookie = cookie; var that = this
      wx.request({
        url: 'https://www.kaaile.cn/coin',
        data: '',
        header: header,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          // console.log(res)       
          that.setData({
            payment: res.data.connect
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  // 支付
  play(e){
     console.log(e)
     var data_total = e.currentTarget.dataset.money
    var cookie = wx.getStorageSync('cookie');
    var header = {};
    var that = this
    if (cookie) {
      header.Cookie = cookie; var that = this
      wx.request({
        url: 'https://www.kaaile.cn/payment',
        data: {
          data_total: data_total
        },
        method: 'POST',        
        header: header,
        success: function (res) {
          console.log(res)
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success': function (res) {
              console.log(res);
            },
            'fail': function (res) {
              console.log('fail:' + JSON.stringify(res));
            }
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
    }
  }
})