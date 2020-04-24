// pages/home/home.js

import * as echarts from '../../components/common/ec-canvas/echarts';
const {comFn} = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: [{
        value: 55,
        name: '北京'
      }, {
        value: 20,
        name: '武汉'
      }, {
        value: 10,
        name: '杭州'
      }, {
        value: 20,
        name: '广州'
      }, {
        value: 38,
        name: '上海'
      },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  /**
   * 页面的初始数据
   */
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {},
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    grids: [
      {
        title: '疫情',
        icone: '/imgs/icons/-_1.png',
        path: 'pages/home/pages/epidemicSituation/epidemicSituation'
      }, {
        title: '地图',
        icone: '/imgs/icons/-_1.png',
        path: 'pages/home/pages/epidemicSituation/epidemicSituation'
      }, {
        title: '漫画',
        icone: '/imgs/icons/icon-test_16.png',
        path: ''
      }, {
        title: '视频',
        icone: '/imgs/icons/icon-test_6.png',
        path: ''
      }, {
        title: '音乐',
        icone: '/imgs/icons/icon-test_8.png',
        path: ''
      }
    ],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../home/pages/search/search'
    })
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

  handleComs() {
    let data = [{ title: '青菜类', children: [{ anme: '白菜', image: '', price: 123 }, { anme: '油麦菜', image: '', price: 673 }] }, { title: '肉类', children: [{ anme: '猪肉', image: '', price: 123 }, { anme: '鱼肉', image: '', price: 673 }] }]
    return console.log(comFn.deepClone(data))
  },

  /**
   * 用户点击右上角分享
   */

  // onShareAppMessage: function (res) {
  //   return {
  //     title: 'ECharts 可以在微信小程序中使用啦！',
  //     path: '/pages/index/index',
  //     success: function () { },
  //     fail: function () { }
  //   }
  // },
  echartInit(e) {
    initChart(e.detail.canvas, e.detail.width, e.detail.height);
  },
  handleClike(e){
    console.log(e,'///////')
  }
})

