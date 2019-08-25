// pages/detail/detail.js
var app = getApp()
Page({
  data: { 
    currentTab: 3,
    list:[
      {
        id:0,
        title:'小说',
        data:'小说'
      }, {
        id:1,
        title: '漫画',
        data: '漫画'
      }, {
        id:2,
        title: '视频',
        data: '视频'
      }, {
        id:3,
        title: '音乐',
        data: '音乐'
      }
    ],
    datas:'',
    heights:0,
  },
  onLoad: function () {
    var _ = this
    wx.createSelectorQuery().selectAll('.swiper-tab').boundingClientRect(function (rect) {
      wx.getSystemInfo({
        success: function (res) {
          _.setData({
            heights: res.windowHeight - rect[0].height
          });
        },
      })
　　}).exec()
    this.getData()
  },
  gotopage:function(){
    console.log('qwww')
  },
  getData: function () {
    var that = this
    wx.request({
      url: "https://api.apiopen.top/musicRankings",
      //header:{...}用啥设置啥，我这里什么都不需要修改
      method: "GET",
      dataType: "json",//若设置json则直接返回的是对象，若其他返回貌似是String
      success: function (res) {
        var obj = res;//我们这里打断点来看数据是否获取到了
        //这里执行数据操作，
        console.log(obj)
        that.setData({
          datas: res
        });
      },
      fail: function (e) {

      },
      complete: function (obj) {

      }
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})