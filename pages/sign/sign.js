// pages/class/class.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course_data:'',
    stu_list: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var cid=wx.getStorageSync('cid')

    if (cid) {
      wx.request({
        url: 'http://testwechat.myipp.cn/index.php/Public/allStudent', //仅为示例，并非真实的接口地址
        data: {
          cid: cid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.success == 1) {

            that.setData({
              stu_list: res.data.result,
              course_data: res.data.courseData

            })

          }
        }
      })
    } else {

      wx.navigateTo({
        url: '../class/class'
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

    var cid = wx.getStorageSync('cid')

    if (cid) {
      wx.request({
        url: 'http://testwechat.myipp.cn/index.php/Public/allStudent', //仅为示例，并非真实的接口地址
        data: {
          cid: cid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.success == 1) {

            that.setData({
              stu_list: res.data.result,
              course_data: res.data.courseData

            })

          }
        }
      })
    } else {

      wx.navigateTo({
        url: '../class/class'
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