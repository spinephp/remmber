// pages/class/class.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course_data:'',
    stu_list: '',
    signs:null,
    backimg: 'background-image: url("../images/dui.png");'
  },

  qiandao: function (e) {
    var that = this
    var num = parseInt(e.currentTarget.id)
    that.data.signs[num] = that.data.signs[num] == 0 ? 1 : 0
    that.setData({
      stu_list: that.data.stu_list,
      signs: that.data.signs
    })
  },

  save:function(e){
    var that = this
    var stuIds = []
    var cid = wx.getStorageSync('cid')
    var i
    var sum = 0
    for(i=0;i<that.data.stu_list.length;i++){
      sum += that.data.signs[i]
     if (that.data.stu_list[i].cid==cid){
         stuIds.push(that.data.stu_list[i].id)
      }
    }
    if(sum==0){ return}
    wx.request({
      url: 'http://testwechat.myipp.cn/index.php/Public/signIn', //仅为示例，并非真实的接口地址
    data: {
        cid: wx.getStorageSync('cid'),
        tid: wx.getStorageSync('tid'),
        cost_times: that.data.course_data.classtime,
        stuLis: JSON.stringify(stuIds)
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.success == 1) {
          wx.setStorageSync('sign_id', res.data.sign_id);
          wx.reLaunch({
            url: '../succ/succ'
          })

        } else if (res.data.success == 0) {
          wx.showToast({
            title: '此账号不存在',
            image: '../images/warn.png',
            duration: 2000
          })
        }

      }
    })
    
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
            var i=0
            var signs = []
            for (i = 0; i < res.data.result.length;i++){
              signs.push(0)
            }
            that.setData({
              stu_list: res.data.result,
              course_data: res.data.courseData,
              signs:signs
            })

          }
        }
      })
    } else {

      wx.navigateTo({
        url: '../succ/succ'
      })

    }

  },


  //记上课
  signin: function (e) {
    var that = this
    var i
    for (i = 0; i < that.data.signs.length; i++) {
      that.data.signs[i] = 1
    }
    that.setData({
      signs: that.data.signs,
    })

    /*
    var id = e.currentTarget.id;
    wx.setStorageSync('cid', id);
    wx.navigateTo({
      url: '../sign/sign'
    })*/
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