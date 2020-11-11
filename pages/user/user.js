//index.js
//获取应用实例
const app = getApp()
const AUTH_MODE = 'fingerPrint' // 指纹识别

Page({
  data: {
    longitude: 0,
    latitude: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
      // 腾讯经纬度转百度经纬度
      bMapTransqqMap(lng, lat) {
        let x_pi = (3.14159265358979324 * 3000.0) / 180.0
        let x = lng - 0.0065
        let y = lat - 0.006
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
        let lngs = z * Math.cos(theta)
        let lats = z * Math.sin(theta)
        return {
          longitude: lngs,
          latitude: lats
        }
      },

       qqMapTransBMap(lng, lat) {
        let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        let x = lng;
        let y = lat;
        let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
        let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
        let lngs = z * Math.cos(theta) + 0.0065;
        let lats = z * Math.sin(theta) + 0.006;
        return {
          longitude: lngs,
          latitude: lats
        };
      },
  getLocationData(){
    let self = this
    wx.getLocation({
      type:'wgs84',
      success: function(res){
        var {longitude, latitude} = self.bMapTransqqMap(res.longitude, res.latitude)
        self.setData({
          longitude,
          latitude
        })
        console.log('经度longitude：',longitude, ' 原始经度：'+res.longitude)
        console.log('维度latitude：：',latitude, ' 原始经度：'+res.latitude)
      }
    })
  },
  toLogin() {
    const startSoterAuthentication = () => {
      wx.startSoterAuthentication({
        requestAuthModes: [AUTH_MODE],
        challenge: 'test',
        authContent: '小程序示例',
        success: (res) => {
          wx.showToast({
            title: '认证成功'
          })
        },
        fail: (err) => {
          console.error(err)
          wx.showModal({
            title: '失败',
            content: '认证失败',
            showCancel: false
          })
        }
      })
    }

    const checkIsEnrolled = () => {
      wx.checkIsSoterEnrolledInDevice({
        checkAuthMode: AUTH_MODE,
        success: (res) => {
          console.log(res)
          if (parseInt(res.isEnrolled) <= 0) {
            wx.showModal({
              title: '错误',
              content: '您暂未录入指纹信息，请录入后重试',
              showCancel: false
            })
            return
          }
          startSoterAuthentication();
        },
        fail: (err) => {
          console.error(err)
        }
      })
    }

    wx.checkIsSupportSoterAuthentication({
      success: (res) => {
        console.log(res)
        checkIsEnrolled()
      },
      fail: (err) => {
        console.error(err)
        wx.showModal({
          title: '错误',
          content: '您的设备不支持指纹识别',
          showCancel: false
        })
      }
    })
  }
})
