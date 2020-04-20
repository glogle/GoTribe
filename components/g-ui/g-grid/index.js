Page({
  data: {
    grids: [
      {
        title: '疫情',
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
    ]
  },
  //事件处理函数
  bindEpidemicSituation: function (e) {
    console.log(e)
    // wx.navigateTo({
    //   url: '../home/pages/search/search'
    // })
  },
});