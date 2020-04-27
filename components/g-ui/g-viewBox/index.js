// components/g-ui/g-viewBox/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: []
    },
    menuSite:{
      type: String,
      value: 'left'
    },
    menuWidth: {
      type: Number,
      value: 180,
    },
    height: Number
  },
  


  /**
   * 组件的初始数据
   */
  data: {
    toView: 'list0',
    listData: ["list0", "list1", "list2", "list3", "list4", "list5", "list11", "list12", "list13", "list14", "list15", "list25", "list26", "list27", "list28", "list29", "list30"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleBtnOptins: function (e) {
      var id = e.currentTarget.dataset.id
      this.setData({
        toView: id
      })
      console.log(e.currentTarget.dataset, this.data.toView);
    }
  }
})
