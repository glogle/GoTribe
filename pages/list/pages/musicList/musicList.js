// pages/list/pages/musicList/musicList.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata:[],
    search:'',
    type:'',
    offset: 0,
    size: 30,
    endData:'',
    tips: '请稍后',
    show: false,
    animated: true
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
      this.setData({
        type: options.type
      })
      this.getData()
    }
    
  },

    // 刷新
    upData(){
      if (this.data.search) {
        this.searchData()
      }else{
        this.getData()
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
    getData () {
    var that = this
    wx.request({
      url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
      method: "GET",
      data:{
        method:'baidu.ting.billboard.billList',
        type:that.data.type || 1,
        size: this.data.size,
        offset: that.data.offset
      },
      dataType: "json",
      success:  res=> {
        this.setData({
          show:false
        })
        if (res.data.error_code === 22000) {
          var obj = res.data.song_list;
          if(obj ===null) {
            this.setData({
              endData: '我是有底线的！'
            })
            return
          }
          let setArr = [...this.data.listdata,...obj]
          wx.setStorageSync('musicList', setArr)
          that.setData({
            listdata: setArr
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
          this.setData({
            listdata,
          });
        }

      }
    })
  },
  list_down(){
    console.log('到底了')
    if(this.data.endData||this.data.listdata.length<=0) return
    this.setData({
      show:true
    })
    if(!this.data.search) {
      let size = this.data.size, offset = this.data.offset
      this.setData({
        offset: offset+size
      })
      this.getData()
    }
  },

  // 缓存音乐id
  

  // // 加载数据
  // onShow() {
  //   this.timer = setInterval(() => {
  //     this.setData({
  //       show: !this.data.show
  //     })
  //   }, 2000)
  // },
  // onUnload() {
  //   clearInterval(this.timer)
  // }
})