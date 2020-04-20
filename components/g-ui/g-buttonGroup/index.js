// components/g-buttonGroup/index.js
Component({
  // 组件样式隔离
  options: {
    styleIsolation: 'isolated'
  },
  /**
   * 组件的属性列表
   */
  
  properties: {
    data:{
      type: Array,
      value: []
    },
    column :{
      type: [Number,String],
      value: 4
    },
    // 下标颜色
    gcolor: {
      type: String,
      value: 'blue'
    },
    // 当前轮播页下标颜色
    activeColor: {
      type: String,
      value: '#fff'
    },
    // 轮播图片
    imgData: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pages: 1, // 按钮排组
    indicatorDots: false, //分页下标
    autoplay: false, //自动播放
    interval: 2000,
    duration: 1000,
    previousMargin: "10px",
    circular: false // 是否采用衔接滑动
  },


  /*组件所在页面的生命周期 */
  lifetimes: {
    attached: function () {
      console.log(' 在组件实例进入页面节点树时执行')
      this.handlePages() //获取分页
    },
    ready: function () {
      this.getElementHeight() //计算元素高度
    },
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    // 动态获取
    getElementHeight: function(){
      console.log('getElementHeight')
      let query = wx.createSelectorQuery();
      query.select('#g_item_box').boundingClientRect(rect => {
     
        console.log(rect,'reer////////////////////')
        // wx.getSystemInfo({
        //   success: function (res) {
        //     _.setData({
        //       heights: rect[0].height
        //       // heights:100
        //     });
        //   },
        // })
      }).exec()
    },
    // 计算按钮页数
    handlePages: function(){
      const pages = []
      this.properties.data.forEach((item,index) => {
        const page = Math.floor(index / 4)
        if(!pages[page]){
          pages[page] = []
        }
        pages[page].push(item)
      })
      this.setData({
        pages
      })
      
    },
    //事件处理函数
    bindEpidemicSituation: function (e) {
      console.log(e)
      // wx.navigateTo({
      //   url: '../home/pages/search/search'
      // })
    },
    changeIndicatorDots(e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    changeAutoplay(e) {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
    intervalChange(e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange(e) {
      this.setData({
        duration: e.detail.value
      })
    }
  }
})
