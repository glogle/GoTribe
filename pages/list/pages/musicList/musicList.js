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
    this.getData(options)
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

    getItmeData(e) {
      let songid = e.currentTarget.dataset.songid || ''
      wx.navigateTo({
        url: '/pages/list/pages/myMusic/index?songid=' + songid,
      })
      console.log(e)
    },

    // 获取数据
    getData (e) {
      console.log(e,'/////////////////')
    var that = this
    wx.request({
      url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
      method: "GET",
      data:{
        method:'baidu.ting.billboard.billList',
        type:e.type || 1,
        size: 30,
        offset: 0
      },
      dataType: "json",
      success: function (res) {
        var obj = res.data.song_list;
        that.setData({
          listdata: obj
        });
      }
    })
  },
})