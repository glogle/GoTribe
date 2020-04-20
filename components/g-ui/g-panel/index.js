// components/g-ui/g-panel/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: "1"
    }
    // style:{
    //   type:Object,
      
    // }
  },
  options: {
    multipleSlots: true  //启用slot插槽
  },
  /**
   * 组件的初始数据
   */
  data: {
    icon20: '',
    icon60: '',
  },

  /*组件所在页面的生命周期 */
  lifetimes: {
    attached: function () {
      // this.setData({
      //   icon20: base64.icon20,
      //   icon60: base64.icon60
      // });
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

// Page({
//   onLoad: function () {
//     this.setData({
//       icon20: base64.icon20,
//       icon60: base64.icon60
//     });
//   }
// });