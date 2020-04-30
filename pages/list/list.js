// pages/detail/detail.js
var app = getApp()
Page({
  data: { 
    status: false,
    currentTab: 0, // 当前tab位置
    list:[
      {
        id:0,
        title:'组件1',
        data:'小说',
        bgColor: '#ff0000'
      }, {
        id:1,
        title: '组件2',
        data: '漫画',
        bgColor: '#00ff00'
      }, {
        id:2,
        title: '组件3',
        data: '视频',
        bgColor: '#0000ff'
      }, {
        id:3,
        title: '组件4',
        data: '音乐',
        bgColor: '#f0000f'
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
    this.handleGotoMap5(e.detail.current)
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
  },

  // handleGotoMap: function(){
  //   const key = 'BH5BZ-WE7L5-N7LIL-QA5I7-7S5SS-QDBZ5'; //使用在腾讯位置服务申请的key
  //   const referer = 'Go部落'; //调用插件的app的名称
  //   const location = JSON.stringify({
  //     latitude: 39.89631551,
  //     longitude: 116.323459711
  //   });
  //   // const category = '生活服务,娱乐休闲';

  //   wx.navigateTo({
  //     url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
  //   });
  // },
  handleGotoMap2: function(){
    let plugin = requirePlugin("subway");
    const key = 'BH5BZ-WE7L5-N7LIL-QA5I7-7S5SS-QDBZ5'; //使用在腾讯位置服务申请的key
    const referer = 'Go部落'; //调用插件的app的名称
    wx.navigateTo({
      url: 'plugin://subway/index?key=' + key + '&referer=' + referer
    });
  },
  handleGotoMap3: function(){
    let plugin = requirePlugin('routePlan');
    const key = 'BH5BZ-WE7L5-N7LIL-QA5I7-7S5SS-QDBZ5'; //使用在腾讯位置服务申请的key
    const referer = 'Go部落'; //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': '',
      'latitude': null,
      'longitude': null
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },
  handleGotoMap4: function (e) {
    if(e){
      this.selectComponent("#popups").showBox()
    }
    // this.setData({
    //   status: !this.data.status
    // })
  },
  handleGotoMap5: function (tab) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.list[tab].bgColor,
      animation: {
        duration: 400,
        timingFunc: 'easeOut'
      }
    })
  }
})