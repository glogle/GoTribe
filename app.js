//app.js
// import 'assets/api/listen1-api.min.js'
const config = require('./config/index.js')
const comFn = require('./utils/common.js')
const musicApi = require('./api/musicApi.js')
const tools = require('./utils/tools')
const Anim = require("./components/gsd-lib/anim/anim.min");
App({
  //应用程序启动
  onLaunch: function () {
    this.tools = tools
    // Anim 挂载
    this.Anim = Anim;
    
    // this.config = config
    this.comFn = comFn
    this.musicApi = musicApi
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  config,
  globalData: {
    userInfo: null,
    latitude:null,
    longitude:null,
    config,
    txKey: 'e16f8d4f026123c6b0deb96324b7e1c5'
  }
});
