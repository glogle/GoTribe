Component({
  // options: {
  //   multipleSlots: true // 在组件定义时的选项中启用多slot支持
  // },
  properties: {
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

  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    previousMargin: "10px",
    circular: true // 是否采用衔接滑动
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
})


