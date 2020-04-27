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
  },
  // observers:{
  //   'status': function (e){
  //     console.log(e,'status////////////////')
  //     if (!e) {
  //       this.animate('#gBox', [
  //         { opacity: 1.0, bottom: '-200px'},
  //         { opacity: 1.0, bottom: '0',  ease: 'ease-in', offset: 0.9},
  //       ], 300, function () {
  //         this.clearAnimation('#gBox', { opacity: true, rotate: true }, function () {
  //           console.log("清除了#gBox上的opacity和rotate属性")
  //         })
  //       }.bind(this))
  //     }
  //   }
  // },
  lifetimes: {
    attached: function () {
      
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showBox: function () {

      if (this.data.status) return
        this.setData({
          status: true
        })
      this.animate('#gBox', [
        { opacity: 1.0, bottom: '-200px' },
        { opacity: 1.0, bottom: '0', ease: 'ease-in', offset: 0.9 },
        { opacity: 1.0, bottom: '0', ease: 'ease-in', offset: 0.9 },
        { opacity: 1.0, bottom: '0', ease: 'ease-in', offset: 0.9 },
        { opacity: 1.0, bottom: '0', ease: 'ease-in', offset: 0.9 },
      ], 300, function () {
        this.clearAnimation('#gBox', { opacity: true, rotate: true }, function () {
          console.log("清除了#gBox上的opacity和rotate属性")
        })
      }.bind(this))
    },

    hideBox:function () {
      if(!this.data.status) return
      console.log(this.data.status,'sdfjsdkfhkj')
      this.animate('#gBox', [
        { opacity: 1.0, bottom: '0' },
        { opacity: 1.0, bottom: '-200px', ease: 'ease-in', offset: 0.9 },
      ], 300, function () {
        this.clearAnimation('#gBox', { opacity: true, rotate: true }, function () {
          console.log("清除了#gBox上的opacity和rotate属性")
        })
      }.bind(this))
      this.setData({
        status: false
      })
    },

    handletouchmove: function (event) {
      let currentX = event.touches[0].pageX
      let currentY = event.touches[0].pageY
      let tx = currentX - this.data.lastX
      let ty = currentY - this.data.lastY
      let text = ""

      if (Math.abs(tx) > Math.abs(ty)) {
        //左右方向滑动
        if (tx < 0)
          text = "向左滑动"
        else if (tx > 0)
          text = "向右滑动"
      }
      else {
        //上下方向滑动
        if (ty < 0)
          text = "向上滑动"
        else if (ty > 0){
          this.hideBox()
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
    handletouchtart: function (event) {
      // console.log(event)
      // 赋值
      this.data.lastX = event.touches[0].pageX
      this.data.lastY = event.touches[0].pageY
    }
  }
})
