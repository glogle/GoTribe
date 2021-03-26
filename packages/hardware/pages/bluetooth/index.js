// packages/hardware/pages/bluetooth/index.js
const {
  Anim,
} = getApp();
Anim.Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: 1,
    status: false
  },
  computed: {
    add() {
      let {res} = this.data
      console.log('计算属性：')
      return ++ res 
    }
  },
  watch: {
    'status': e => {
      console.log('事件监听：',e)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 打开蓝牙模块
   */
  openBluetooth: function () {
    let self = this
    this.setData({
      status: true
    })
    wx.openBluetoothAdapter({
      success (res) {
        console.log('成功：',res)
      },
      fail (res) {
        self.modal('温馨提示',res.errMsg)
        console.log('报错：',res)
      }
    })
  },
  /**
   * 弹窗
   */
  modal: function (title,content) {
    wx.showModal({
      title,
      content,
      // success (res) {
      //   if (res.confirm) {
      //     console.log('用户点击确定')
      //   } else if (res.cancel) {
      //     console.log('用户点击取消')
      //   }
      // }
    })
  }
})


