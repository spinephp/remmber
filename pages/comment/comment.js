const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    star: 0,
    starMap: [
      '1分',
      '2分',
      '3分',
      '4分',
      '5分',
    ],
    str: 0,
    starMp: [
      '1分',
      '2分',
      '3分',
      '4分',
      '5分',
    ],
    evaContent:"",
    signs:[],
    dianpins:[],
    courseData:{},
    stuCount:0,
    evaling:0,
    currentEvalingIndex:0,
    focus:false
  },
  myStarChoose(e) {
    let star = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star: star,
    });
  },
  myStarChoos(e) {
    let str = parseInt(e.target.dataset.str) || 0;
    this.setData({
      str: str,
    });
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    if (e.detail.value && e.detail.value.length>0){
      this.setData({
        evaContent: e.detail.value
      })
    }
  },
  bindFormSubmit: function (e) {
    console.log(e.detail.value.textarea)
    var that = this
    var idx = that.data.currentEvalingIndex
    wx.request({
      url: 'http://testwechat.myipp.cn/index.php/Public/comment', //仅为示例，并非真实的接口地址
      data: {
        mid: that.data.signs[idx].id,
        sign_id: wx.getStorageSync('sign_id'),
        focus: that.data.star,
        discipline: that.data.str,
        comment: e.detail.value.textarea
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.success == 1) {
          that.data.dianpins[that.data.currentEvalingIndex] == 1
          that.setData({
            currentEvalingIndex: -1,
            evaling: 0,
            dianpins: that.data.dianpins
          })

          /*
          wx.setStorageSync('sign_id', res.data.sign_id);
          wx.reLaunch({
            url: '../comment/comment'
          })*/

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
  eval:function(e){
    var that = this
    var idx = parseInt(e.currentTarget.id)
    if(that.data.dianpins[idx]==0){
      that.data.dianpins[idx] = 1
      that.setData({
        currentEvalingIndex:idx,
        evaling:1,
        dianpins:that.data.dianpins
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
   wx.request({
      url: 'http://testwechat.myipp.cn/index.php/Public/signInStu', //仅为示例，并非真实的接口地址
      data: {
        cid: wx.getStorageSync('cid'),
        sign_id: wx.getStorageSync('sign_id')
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res);
        if (res.data.success == 1) {
          //wx.setStorageSync('sign_id', res.data.sign_id);
          var i=0
          var dps = []
          for(i=0;i<res.data.result.length;i++){
            dps.push(0)
          }
          that.setData({
            signs:res.data.result,
            courseData:res.data.courseData,
            dianpins:dps,
            stuCount:res.data.stuCount
          })
          /*
          wx.reLaunch({
            url: '../comment/comment'
          })*/

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
  // chooseicon: function (e) {

  //   var strnumber = e.target.dataset.id;
  //   var _obj = {};
  //   _obj.curHdIndex = strnumber;
  //   this.setData({
  //     tabArr: _obj
  //   });

  // },

})