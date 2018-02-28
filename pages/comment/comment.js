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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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