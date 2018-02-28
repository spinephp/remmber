Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    phone_code: '',
    mid: '',
    time: '60秒后重发',
    flag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //注册码赋值
  InputEvent: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //校验注册码
  getPhoneCode: function () {
    //this.data.code;
    var that = this;
    if (that.data.phone == '') {
      wx.showToast({
        title: "请输入联系电话",
        image: '../images/warn.png',
        duration: 2000
      })
      return false;
    }
    var count = 60;
    that.setData({
      flag: true
    })
    var timer = setInterval(function () {
      count--;
      that.setData({
        time: count + "秒后重发"
      })
      if (count == 0) {
        clearInterval(timer);
        that.setData({
          flag: false
        })
      }

    }, 1000)
    wx.request({
      url: 'http://testwechat.myipp.cn/index.php/Public/get_code', //仅为示例，并非真实的接口地址
      data: {
        tel: that.data.phone
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
      
        
        if (res.data.success== 1) {
          that.setData({
            phone_code: res.data.code,
            

          })
        } else if (res.data.status == 0) {
          wx.showToast({
            title: res.data.info,
            duration: 2000
          })
        } else if (res.data.status == -1) {
          wx.showToast({
            title: res.data.info,
            duration: 2000
          })
        } else if (res.data.status == -2) {
          wx.showToast({
            title: res.data.info,
            duration: 2000
          })
          clearInterval(timer);
          that.setData({
            flag: false
          })
        }
      }
    })
  },
  //登录验证
  formSubmit: function (e) {
    var that=this;
    var objData = e.detail.value;
    if (objData.phone == '') {
      wx.showToast({
        title: "请输入手机号",
        image: '../images/warn.png',
        duration: 2000
      })
      return false;
    }
    if (objData.phone_code == '') {
      wx.showToast({
        title: "请输入验证码",
        image: '../images/warn.png',
        duration: 2000
      })
      return false;
    }

    /*if (objData.phone_code == this.data.phone_code) {
      wx.request({
        url: 'http://testwechat.myipp.cn/index.php/Public/loginSmall', //仅为示例，并非真实的接口地址
        data: {
          tel: that.data.phone,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res);
          if(res.data.success==1){
            wx.setStorageSync('tid', res.data.result.id);
            wx.reLaunch({
              url: '../index/index'
            })
          }
          
        }
      })

      


    } else {
      wx.showToast({
        title: '验证码错误',
        image: '../images/warn.png',
        duration: 2000
      })





    }*/
    wx.request({
      url: 'http://testwechat.myipp.cn/index.php/Public/loginSmall', //仅为示例，并非真实的接口地址
      data: {
        tel: that.data.phone,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data.success == 1) {
          wx.setStorageSync('tid', res.data.result.id);
          wx.reLaunch({
            url: '../index/index'
          })
          
        } else if (res.data.success==0){
          wx.showToast({
            title: '此账号不存在',
            image: '../images/warn.png',
            duration: 2000
          })
        }

      }
    })


    //console.log('form发生了submit事件，携带数据为：', e.detail.value);

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
    
  }
})