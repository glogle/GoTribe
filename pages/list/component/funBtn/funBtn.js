// pages/list/component/muisc/music.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    grids: {
      type: [Object,Array],
      value:[1,2,3],
    },
  },


  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotopage: function (e) {
      console.log(e.datail)
     var type = 1
      wx.navigateTo({
        url: '/pages/list/pages/musicList/musicList?type='+type
      })
    },
  }
})
