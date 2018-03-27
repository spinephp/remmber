// pages/class/class.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myData:'',
    curMonth:'',
    lastMonth:'',
    lastTwoMonth:'',
    twoTime:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var month = new Date().getMonth() + 1; 
    if((month-2)<=0){
      month=month+12;

    }else{
      month=month-2;
    }
    this.setData({'twoTime':month})

    var tId = wx.getStorageSync('tid');

    if (tId) {
      wx.request({
        url: 'http://testwechat.myipp.cn/index.php/Public/myData', //仅为示例，并非真实的接口地址
        data: {
          tid: tId
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
        
          if (res.data.success == 1) {

            that.setData({
              myData: res.data.myData,
              curMonth: res.data.curMonth,
              lastMonth:res.data.lastMonth,
              lastTwoMonth:res.data.lastTwoMonth
            })

          } else {
            wx.showToast({
              title: '此账号不存在',
              image: '../images/warn.png',
              duration: 2000
            })
          }
        }
      })
    } else {

      wx.navigateTo({
        url: '../login/login'
      })

    }

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

    var that = this;
    //console.log(app.schoolId);
    var tid = wx.getStorageSync('tid');
    //console.log(schoolId);
    if (tid) {
      wx.request({
        url: 'http://testwechat.myipp.cn/index.php/Public/myData', //仅为示例，并非真实的接口地址
        data: {
          tid: tid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.success == 1) {

            that.setData({
              myData: res.data.myData,
              curMonth: res.data.curMonth,
              lastMonth: res.data.lastMonth,
              lastTwoMonth: res.data.lastTwoMonth
            })

          }else{
            wx.showToast({
              title: '此账号不存在',
              image: '../images/warn.png',
              duration: 2000
            })
          }
        }
      })
    } else {

      wx.navigateTo({
        url: '../login/login'
      })

    }
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