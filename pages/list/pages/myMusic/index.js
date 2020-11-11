// audio.js
let back = wx.playBackgroundAudio 
let interval
Page({
  data: {
    songid:'',
    playTime:0,
    percent: 0, // 进度条
    speedStatus: false, // 快进状态
    animation:'',
    musicInfo: {},
    musicData:{},
    playStatus: false, // 播放状态
  },

  // 小程序生命周期

  onReady(e) {
    // this.audioCtx = wx.createAudioContext('myAudio')
    
  },

  onLoad(e) {
    this.setData({
      songid: e.songid
    })
    this.getData()
  },

  onShow () {
    this.animation = wx.createAnimation({
      duration: 1400,
      timingFunction: 'linear', 
      delay: 0,
      transformOrigin: '50% 50% 0',
      success: function (res) {
        console.log("res")
      }
    })
  },
  rotateAni(n) {
    console.log("rotate==" + n)
    this.animation.rotate(180 * (n)).step()
    this.setData({
      animation: this.animation.export()
    })
  },

  // 返回上一级
  goback() {
    wx.navigateBack()
  },

  // 获取数据
  getData(e) {
    var that = this
    wx.request({
      url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
      method: "GET",
      data: {
        method: 'baidu.ting.song.play',
        songid: that.data.songid
      },
      dataType: "json",
      success: res=> {
        if (res.data.error_code === 22000) {
          let obj = res.data
          console.log(obj)
          that.setData({
            musicInfo: obj.songinfo,
            musicData: obj.bitrate
          });
          that.play_handle()
        }
      }
    })
  },

  // 播放/暂停
  play_handle() {
    let back = wx.playBackgroundAudio 
    this.setData({
      playStatus: !this.data.playStatus,
    })
    // if (this.data.playStatus) {
      back({
        dataUrl: this.data.musicData.file_link,
        title: this.data.musicInfo.album_title,
        coverImgUrl: this.data.musicInfo.album_title
      })
      wx.getBackgroundAudioPlayerState({
        success:res=>{
          console.log(res,'res///////////////////////')
        }
      })
    // }else {
    //   wx.stopBackgroundAudio()
    // }
    // // this.rotateAni()
  },

  // 快进开始
  speed_music_start(e) {
    let flag = e.currentTarget.dataset.flag
    if ((this.data.percent >= 100 && flag === '+' )|| (this.data.percent <= 0 && flag==='-')) return
    this.setData({
      speedStatus: true
    })
    console.log('开始')
     interval = setInterval(() => {
      this.setData({
        percent: flag === '+' ? this.data.percent + 0.5 : this.data.percent - 0.5
      })
       if ((this.data.percent >= 100 && flag === '+') || (this.data.percent <= 0 && flag === '-')) clearInterval(interval)
    }, 30)
    wx.seekBackgroundAudio({
      position: this.data.percent
    })
  },
  
  // 快进结束
  speed_music_end(){
    if (!this.data.speedStatus) return
    console.log('结束')
    clearInterval(interval)
    this.setData({
      speedStatus: false
    })
  },

  // 上一曲
  previous_music(){
    console.log('上一曲')
    this.getSongId()
  },
  // 下一曲
  next_music(){
    console.log('下一曲')
    this.getSongId('u')
    
  },

  // 播放音乐
  play_music() {
    wx.playBackgroundAudio({
        dataUrl: this.data.musicData.file_link,
        title: this.data.musicInfo.album_title,
        coverImgUrl: this.data.musicInfo.album_title
    })
  },

  // 遍历songId
  getSongId(n='d'){
    // wx.stopBackgroundAudio()
    let res = n!== 'd'? 1:-1
    let data = wx.getStorageSync('musicList')
    if(data) {
      let songid = this.data.songid
      data.map((item,index)=>{
        if(songid === item.song_id) {
          this.setData({
            songid: data[index+res].song_id
          })
        }
      })
      this.getData()
    }
  },
  // 暂替音乐
  pause_muisc () {

  },



  // 查看歌唱
  gotoLyric() {
    wx.navigateTo({
      url: '/pages/list/pages/musicLyric/index?lrclink=' + this.data.musicInfo.lrclink,
    })
  }

})