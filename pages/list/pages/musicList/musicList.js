// pages/list/pages/musicList/musicList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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

  // 自定义函数
    getData: function () {
    var that = this
    wx.request({
      url: "https://api.apiopen.top/musicRankingsDetails",
      //header:{...}用啥设置啥，我这里什么都不需要修改
      method: "GET",
      data:{
        type:1
      },
      dataType: "json",//若设置json则直接返回的是对象，若其他返回貌似是String
      success: function (res) {
        var obj = res;//我们这里打断点来看数据是否获取到了
        //这里执行数据操作，
        console.log(obj)
        that.setData({
          listdata: res
        });
      },
      fail: function (e) {

      },
      complete: function (obj) {

      }
    })
  },
})