// pages/class/class.js
var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myData:'',

    multiArray: ['男', '女'],
    objectMultiArray: [
      [
        {
          id: 1,
          name: '男'
        },
        {
          id: 2,
          name: '女'
        }
      ]
    ],
    multiIndex: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

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
              multiIndex: res.data.myData['sex'] - 1
            });
            

          }
        }
      })
    } else {

      wx.navigateTo({
        url: '../login/login'
      })

    }

  },



  //change
  checkChange:function(e){
    var sex=parseInt(e.detail.value)+1;
    this.setData({
      multiIndex: e.detail.value
    });
    
    var tId = wx.getStorageSync('tid');
    wx.request({
      url: 'http://testwechat.myipp.cn/index.php/Public/edit_sex', //仅为示例，并非真实的接口地址
      data: {
        tid: tId,
        sex:sex
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        if (res.data.success == 1) {

          wx.navigateTo({
            url: '../index/index'
          })
        }else{
          wx.showToast({
            title: '修改失败',
            image: '../images/warn.png',
            duration: 2000
          })
        }
      }
    })


  },
  nameChange: function (e) {
    var name = e.detail.value;
    
    var tId = wx.getStorageSync('tid');
    wx.request({
      url: 'http://testwechat.myipp.cn/index.php/Public/edit_name', //仅为示例，并非真实的接口地址
      data: {
        tid: tId,
        name: name
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        if (res.data.success == 1) {

          wx.navigateTo({
            url: '../index/index'
          })
        } else {
          wx.showToast({
            title: '修改失败',
            image: '../images/warn.png',
            duration: 2000
          })
        }
      }
    })


  },
  logout:function(e){
    
    wx.clearStorage();
    wx.clearStorageSync();
    wx.navigateTo({
      url: '../login/login'
    })

  },

  uploadPhoto:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          photo:tempFilePaths[0]
        })
        wx.uploadFile({
          url:"http://testwechat.myipp.cn/index.php/Public/upload_photo",
          filePath:tempFilePaths[0],
          name:"file",
          formData:{
            'user':'test',
            'tid': wx.getStorageSync('tid')
          },
          success:function(res){
            //var result = JSON.parse(res)
            if(res.data.success==1){
              that.data.myData.photo = res.data.photo
              that.setData({
                "myData.photo": res.data.photo
              })
            }
            //that, tempFilePaths);
          }
        })
      }
    })
  },

  /*
  img_upload:function (page, path) {
    
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    }),
    wx.uploadFile({
      url: app.apiUrl.modify_user,//constant.SERVER_URL + "/FileUploadServlet",
      filePath: path[0],
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        'session_token': 'testwechat'
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          return;
        }
        var data = res.data
        page.setData({  //上传成功修改显示头像
          src: path[0]
        })
      },
      fail: function (e) {
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast();  //隐藏Toast
      }
    })
  },
*/


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