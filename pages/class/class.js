// pages/class/class.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class_list: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    var tId = wx.getStorageSync('tid');
  
    if (tId) {
      wx.request({
        url: 'http://testwechat.myipp.cn/index.php/Public/inCourseTe', //仅为示例，并非真实的接口地址
        data: {
          tid: tId
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.success==1) {

            that.setData({
              class_list: res.data.result,
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


  //记上课
  signin: function (e) {
    var id = e.currentTarget.id;
    wx.setStorageSync('cid', id);
    wx.navigateTo({
      url: '../sign/sign'
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

    var that = this;
    //console.log(app.schoolId);
    var tid = wx.getStorageSync('tid');
    //console.log(schoolId);
    if (tid) {
      wx.request({
        url: 'http://testwechat.myipp.cn/index.php/Public/inCourseTe', //仅为示例，并非真实的接口地址
        data: {
          tid: tid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.success == 1) {

            that.setData({
              class_list: res.data.result,
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