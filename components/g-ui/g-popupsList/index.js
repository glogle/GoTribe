// components/g-ui/g-gBoxList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // status: {
    //   type: Boolean,
    //   value: false
    // },
    height: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: false,
    lastX: 0,
    lastY: 0,
    text: "没有滑动",
    toUp: false
  },
  lifetimes: {
    attached () {
      
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showBox () {
      if (this.data.status || this.data.toUp ) return
        this.setData({
          status: true
        })
      this.animate('#gBox', [
        { height: '0' },
        { height: '500rpx' },
      ], 300)
    },

    hideBox () {
      if (!this.data.status || this.data.toUp) return
      this.setData({
        status: false
      })
      this.animate('#gBox', [
        { height: '500rpx' },
        { height: '0' },
      ], 300)

    },
    toUpBox() {
      if (this.data.toUp) return
      this.animate('#gBox', [
        { height: '500rpx' },
        { height: '100vh' },
      ], 300,()=>{
        this.setData({
          toUp: true
        })
      })
    },
    toDown() {
      if (!this.data.toUp) return
      console.log('toDown')
      this.animate('#gBox', [
        { height: '100vh' },
        { height: '500rpx' },
      ], 300,()=>{
        this.setData({
          toUp: false
        })
      })
    },
    handletouchmove (event) {
      let currentX = event.touches[0].pageX
      let currentY = event.touches[0].pageY
      let tx = currentX - this.data.lastX
      let ty = currentY - this.data.lastY
      let text = ""
      let myBox = wx.createSelectorQuery().select('#gBox')
      console.log(myBox,'\\\\\\\?????')
      
      if (Math.abs(tx) > Math.abs(ty)) {
        //左右方向滑动
        if (tx < 0)
          text = "向左滑动"
        else if (tx > 0)
          text = "向右滑动"
      }
      else {
        //上下方向滑动
        if (ty < 0){
          this.toUpBox()
          text = "向上滑动"
        }
        else if (ty > 0){
          this.hideBox()
          this.toDown()
          text = "向下滑动"
        }
      }

      //将当前坐标进行保存以进行下一次计算
      this.data.lastX = currentX
      this.data.lastY = currentY
      this.setData({
        text: text,
      });
      console.log(text)
    },
    handletouchtart (event) {
      // console.log(event)
      // 赋值
      this.data.lastX = event.touches[0].pageX
      this.data.lastY = event.touches[0].pageY
    },
    handletouchend (e) {
      console.log(e,'handletouchend')
    },
    handleMycllike (e) {
      this.hideBox()
    }
  }
})
