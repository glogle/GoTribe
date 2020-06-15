// pages/list/pages/musicList/musicList.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata:[],
    search:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.search) {
      this.setData({
        search: options.search
      })
      this.searchData()
    }else{
      this.getData(options)
    }
    
  },

  // 自定义函数

    getItmeData(e) {
      let songid = e.currentTarget.dataset.songid || ''
      wx.navigateTo({
        url: '/pages/list/pages/myMusic/index?songid=' + songid,
      })
      console.log(e)
    },

    // 获取数据
    getData (e) {
    var that = this
    wx.request({
      url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
      method: "GET",
      data:{
        method:'baidu.ting.billboard.billList',
        type:e.type || 1,
        size: 30,
        offset: 0
      },
      dataType: "json",
      success:  res=> {
        if (res.data.error_code === 22000) {
          var obj = res.data.song_list;
          that.setData({
            listdata: obj
          });
        }
      }
    })
  },

  // 搜索歌曲
  searchData() {
    wx.request({
      url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
      method: "GET",
      data: {
        method: 'baidu.ting.search.catalogSug',
        query: this.data.search
      },
      dataType: "json",
      success: res => {
        if (res.data.error_code === 22000) {
          let listdata=[], data = res.data.song
          data.map(item=>{
            listdata.push({
              album_title: item.songname,
              author: item.artistname,
              song_id: item.songid,
              pic_radio: item.artistpic
            })
          })
          console.log(listdata)

          this.setData({
            listdata,
          });
        }

      }
    })
  }
})