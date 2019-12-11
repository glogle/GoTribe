Component({
  // options: {
  //   multipleSlots: true // 在组件定义时的选项中启用多slot支持
  // },
  properties: {
    imgData:{
      type:Array,
      default: [],
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
  changeIndicatorDots (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})


