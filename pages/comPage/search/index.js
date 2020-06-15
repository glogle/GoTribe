// pages/comPage/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    recordData: [],
    searchList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getRcord()
  },

  // 获取搜索内容
  searchInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  // 搜索
  search(e) {
    let search = this.data.inputValue 
    if (search === '') return
    this.searchData()
    let data = this.getRcord() || []
    if (data.indexOf(search) === -1) {
      data.unshift(search)
      this.setRcord(data)
      this.getRcord()
    }
  },

  // 选择历史记录
  searchRcord(e){
    this.setData({
      inputValue: e.currentTarget.dataset.item
    })
  },
   
  // 清除历史记录
  clearRecord(){
    if (this.data.recordData === []) return
    this.setRcord()
    this.getRcord()
  },
  
  // 获取历史记录
  getRcord() {
    let data 
    data = wx.getStorageSync('search')
    if(data === '') {
      this.setRcord()
      data = []
    }else {
      this.setData({
        recordData: data
      })
    }
    return data
  },

  // 保存历史记录
  setRcord(data = [], key = 'search'){
    wx.setStorageSync(key, data)
  },

  // 搜索歌曲
  searchData() {
    wx.navigateTo({
      url: '/pages/list/pages/musicList/musicList?search='+this.data.inputValue,
    })
  }
})