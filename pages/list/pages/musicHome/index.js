// pages/list/pages/myMusic/musicLyric/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {},
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    lrclink: '',
    musicType: [
      {
        id: 1,
        title: '新歌榜',
        color: '#fff',
        icone: '/imgs/icons/icon-test_8.png',
      },
      {
        id: 2,
        title: '热歌榜',
        color: '#fff',
        icone: '/imgs/icons/icon-test_8.png',
      },
      {
        id: 11,
        title: '摇滚榜',
        color: '#fff',
        icone: '/imgs/icons/icon-test_8.png',
      },
      {
        id: 12,
        title: '爵士',
        color: '#fff',
        icone: '/imgs/icons/icon-test_8.png',
      },
      {
        id: 16,
        title: '流行',
        color: '#fff',
        icone: '/imgs/icons/icon-test_8.png',
      },
      {
        id: 21,
        title: '欧美金曲榜',
        color: '#fff',
        icone: '/imgs/icons/icon-test_8.png',
      },
      {
        id: 22,
        title: '经典老歌榜',
        color: '#fff',
        icone: '/imgs/icons/icon-test_8.png',
      },
      {
        id: 23,
        title: '情歌对唱榜',
        color: '#fff',
        icone: '/imgs/icons/icon-test_8.png',
      },
      {
        id: 24,
        title: '影视金曲榜',
        color: '#fff',
        icone: '/imgs/icons/icon-test_8.png',
      },
      {
        id: 25,
        title: '网络歌曲榜',
        color: '#fff',
        icone: '/imgs/icons/icon-test_8.png',
      },
    ]
      
    
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

  // 获取数据
  getData(e) {
    var that = this
    wx.request({
      url: e.lrclink,
      method: "GET",
      dataType: "json",
      success: function (res) {
        let lrclink = res.data
        that.setData({
          lrclink
        });
      }
    })
  },

  // 跳转到详情页面
  handleBntFn: function (e) {
    wx.navigateTo({
      url: '/pages/list/pages/musicList/musicList?type=' + e.detail.id
    })
  },

  // 跳转到搜索页面
  bindViewTap(){
    wx.navigateTo({
      url: '/pages/comPage/search/index'
    })
  }
})