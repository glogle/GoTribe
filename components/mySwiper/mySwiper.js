Component({
  /**
   * 组件的属性列表
   */
  properties: {
    interval: {
      type:[Number,String],
      default: 10,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    loop_time:'',
    list: ['red', 'blue', 'yellow'],
    pot: 0,
    move: 0
  },
  methods:{
    loop_swiper: function () {
      let that = this

      clearInterval(this.loop_time)
      that.loop_time  = setInterval(() => {
        that.next()
        console.log('next')
      }, that.interval*1000)
    },
    pre: function (e) {
      if (this.data.move == 0) {
        var pot = --this.data.pot;
        pot = pot < 0 ? this.data.list.length - 1 : pot;
        var list = this.data.list;
        var last = list.pop();
        list.unshift(last);
        this.setData({
          pot: pot,
          list: list,
          move: 1
        })
        let that = this;
        setTimeout(function () {
          that.setData({
            move: 0
          })
        }, 800)
      }
    },
    next: function (e) {
      if (this.data.move == 0) {
        var pot = ++this.data.pot;
        pot = pot > this.data.list.length - 1 ? 0 : pot;
        this.setData({
          pot: pot,
          move: 2
        })
        let that = this;
        setTimeout(function () {
          var list = that.data.list;
          var first = list.shift();
          list.push(first);
          that.setData({
            list: list,
            move: 0
          })
        }, 800)
      }
    },
  },
  created(){

  },
  moved(){
    clearInterval(this.loop_time)
  },
  ready: function () {
    // clearInterval(this.loop_time)
    this.loop_swiper()
  },
})
