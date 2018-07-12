// pages/answer/answer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    bottom_img: [
      '/images/index/btn_haoyou.png',
      '/images/index/btn_paihang.png',
      '/images/index/btn_zhanghu.png',
    ],
    answer: [
    ],
    option: [
    ],
    img:'',
    user:'',
    correct:'',
    error:false,
    img_s:'',
    count:'',
    source:'',
    checkpoint:'',
    frequency:1    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        console.log(res)
        that.setData({
          phone: res.data.screenHeight
        })
      }
    })
    var cookie = wx.getStorageSync('cookie');    
    this.get_user_coin()
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
  // 挑战关卡显示
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
        if (res.data.status==200){
          that.setData({
            user: res.data.content
          })
          wx.setStorageSync('user', res.data.content)          
        }else{
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 选择单词
  select(e){
    var that =this
    var index = e.currentTarget.dataset.index
    var word = this.data.option[index]
    var answer = this.data.answer    
    for (var i = 0; i < answer.length;i++){
      if (answer[i].name==''){
        answer[i].name = word
        answer[i].option_index=index
        var option = "option" + '[' + index + ']'
        that.setData({
          answer: answer,
          [option]: ''
        })
        break; 
        }
    }

    var answer = this.data.answer        
    for (var i = 0; i < answer.length; i++) {
      console.log(answer.length)
      if (answer[i].name !== '' && i ==(answer.length-1)) {
        this.submit_answer()
      }
    }
},
// 取消选择
  cancel(e){
    var index = e.currentTarget.dataset.index
    var answer = this.data.answer
    var option = this.data.option
    option[this.data.answer[index].option_index] = this.data.answer[index].name
    answer[index].name = ''    
    answer[index].option_index = ''    
    this.setData({
      answer: answer,
      option: option
    })
  },
  // 请求谜题
  get_user_coin(){
    var cookie = wx.getStorageSync('cookie');
    var header = {};
    var that= this
    if (cookie) {
      header.Cookie = cookie; var that = this
    } else {
      this.get_user_coin()
    }
    wx.request({
      url: 'https://www.kaaile.cn/user_coin',
      data: '',
      header: header,
      success: function(res) {
        console.log(res)
        if (res.data.status==200){
        that.setData({
          option:res.data.content.work,
          img: res.data.content.img,
          img_s:res.data.content.img_s,
          source: res.data.content.source,
          checkpoint: res.data.checkpoint,
          count: res.data.content.count
        })
        that.is_count(res.data.content.count)
        } else if (res.data.status == 300){
          wx.showToast({
            title: '恭喜通过所有关卡',
            icon: '',
            image: '',
            duration: 6000,
            mask: true,
            success: function(res) {
              setTimeout(function(){
                wx.navigateBack({ 
                  delta: 2
                })
              },6000)
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 提交答案
  submit_answer(){
    var cookie = wx.getStorageSync('cookie');
    var header = {};
    var that = this
    if (cookie) {
      header.Cookie = cookie; var that = this
    }
    var answer =''
    var a = this.data.answer        
    for (var i = 0; i < a.length; i++) {
      answer = answer+a[i].name
    }
    wx.request({
      url: 'https://www.kaaile.cn/user_answer',
      data: {
        answer: answer
      },
      header: header,
      success: function(res) {
        console.log(res)
        that.is_right(res.data)
        that.current_bonus_card()

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 判断是否正确
  is_right(res){
    
    var title = res.content.source
    var content = res.content.explain
    var that =this
    if (res.status==200){
      wx.showModal({
        title:  title,
        content: content,
        showCancel: false,
        confirmText: "下一题",
        success: function (res) {
          if (res.confirm) {
            var answer = [
              { name: '', option_index: '' },
              { name: '', option_index: '' },
              { name: '', option_index: '' },
              { name: '', option_index: '' },
            ]
            console.log('正确')
            that.setData({
              error:false,
              answer: answer,
              frequency: 1              
            })
            that.get_user_coin()
          } else if (res.cancel) {
          }
        }
      })
    } else{
      console.log('2222')      
      this.setData({
        error: true
      })
    }
  },
  // 帮助
  hint(){
    var cookie = wx.getStorageSync('cookie');
    var header = {};
    var that = this
    var frequency = this.data.frequency
    if (cookie) {
      header.Cookie = cookie; var that = this
    }
    wx.request({
      url: 'https://www.kaaile.cn/prompt',
      data: {
        frequency: frequency
      },
      header: header,
      success: function (res) {
        console.log(res)
        if (res.data.msg!=-100){
          var answer = that.data.answer
          console.log(res)
          answer[res.data.content.num - 1].name = res.data.content.word
          that.setData({
            answer: answer,
            frequency: frequency + 1
          })
          for (var i = 0; i < answer.length; i++) {
            console.log(answer.length)
            if (answer[i].name !== '' && i == (answer.length - 1)) {
              that.submit_answer()
            }
          }
        } else if (res.data.msg = -100){
          wx.showModal({
            title: '金币不足',
            content: '是否前往充值',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateTo({
                  url: '/pages/Recharge/Recharge'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 跳过
  skip(){
    wx.showLoading({
      title: '加载中',
    })
    var cookie = wx.getStorageSync('cookie');
    var header = {};
    var that = this
    if (cookie) {
      header.Cookie = cookie; var that = this
    }
    wx.request({
      url: 'https://www.kaaile.cn/skip',
      data: '',
      header: header,
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        console.log(res)
        if (res.data.msg!=-100){
          that.is_right(res.data)
          that.current_bonus_card()  
        } else if (res.data.msg = -100) {
          wx.showModal({
            title: '金币不足',
            content: '是否前往充值',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateTo({
                  url: '/pages/Recharge/Recharge'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
              
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 判断需要多少格子
  is_count(a){
    var b = []    
    for(var i=0;i<a;i++){
      var c = { name: '', option_index:'' }
      b.push(c)
    }
    console.log(b)
    this.setData({
      answer:b
    })
  },
  //分享好友帮助
  onShareAppMessage: function (res) {
    var cookie = wx.getStorageSync('cookie');
    var header = {};
    var checkpoint = this.data.checkpoint
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
      path: '/pages/index/index?checkpoint=' + checkpoint,
      success: function (res) {
      },
    }
  }
})