  //index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 44,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bottom_img:[
      '/images/index/btn_haoyou.png',
      '/images/index/btn_paihang.png',
      '/images/index/btn_zhanghu.png',
    ],
    phone:'',
    user:'',
    machu:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var  that =this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })      
    }
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          phone:res
        })
        wx.setStorageSync('phone', res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    this.current_bonus_card()
    if (options.checkpoint!=null){
      wx.navigateTo({
        url: '/pages/help/help?checkpoint=' + options.checkpoint,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
    this.get_challenge_gang()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 转发得金币
  onShareAppMessage: function (res) {
    var cookie = wx.getStorageSync('cookie');
    var header = {};
    var that = this
    if (cookie) {
      header.Cookie = cookie; var that = this
    }
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '猜图大咖',
      path: '',
      success: function (res) {
        wx.request({
          url: 'https://www.kaaile.cn/sharing_rewards',
          data: '',
          header: header,
          success: function(res) {
            that.current_bonus_card()
            wx.showToast({
              title: '分享成功',
              icon: 'success',
              duration: 2000
            })
            that.current_bonus_card()
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
    }
    
  },
  Forward:function(){
    this.onShareAppMessage()
  },
  // 获取用户信息
  onGotUserInfo: function (e) {
    var cookie = wx.getStorageSync('cookie');
    var header = {};
    var that = this
    if (cookie) {
      header.Cookie = cookie; var that = this
    }
    var that =this
    console.log(e.detail.errMsg)
    wx.getUserInfo({
    withCredentials: true,
    lang: '',
    success: function(res) {
      console.log(res.userInfo)
      var aaa=res.userInfo
      that.setData({
        userInfo: res.userInfo
      })
      wx.setStorageSync('userInfo', res.userInfo)              
      wx.navigateTo({
        url: '/pages/account/account',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      wx.request({
        url: 'https://www.kaaile.cn/get_user',
        data: {
          nickName: aaa.nickName,
          avatarUrl: aaa.avatarUrl,
          gender: aaa.gender
        },
        header: header,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    fail: function(res) {},
    complete: function(res) {},
  })
  },
  // 挑战关卡显示
  current_bonus_card(){
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
      }else {
      }
  },
  // 跳转到排行榜 
go_top(){
  wx.navigateTo({
    url: '/pages/top/top',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
},
// 挑战资金池剩余金额
get_challenge_gang() {
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
        machu: res.data.content
      })
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}
})
