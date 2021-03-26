
const config = require('../config/index')

class Request {
  constructor (parms) {
    this.withBaseURL = parms.withBaseURL
    this.baseURL = parms.baseURL
  }
  get (url, data,header) {
    // return this.request({method:'GET', url, data,header:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
    return this.request({method:'GET', url, data,header})
  }
  post (url, data) {
    return this.request({method:'POST', url, data})
  }
  put (url, data) {
    return this.request({method:'PUT', url, data})
  }
  request (obj) {
    const vm =this
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      wx.request({
        url: vm.withBaseURL ? vm.baseURL + obj.url : obj.url,
        data:obj.data,
        method: obj.method || 'GET',
        timeout: 40000,
        header: {
          'Referer': '',
          'Content-type': 'application/json', // 默认值data.code
          'x-app-token': wx.getStorageSync("token"),
          ...obj.header,
        },
        success (res) {
          if(res.data.code === -401){
            wx.reLaunch({url: '/pages/login/index'})
            if(wx.getStorageSync("token")){
              wx.showToast({
                title:'登录已过期，请重新登录',
                icon: 'none',
                duration: 2000
              })
            }
          }else if(res.data.code === 401){
            wx.reLaunch({url: '/pages/login/index'})
            if(wx.getStorageSync("token")){
              wx.showToast({
                title:'用户在其他地方登录',
                icon: 'none',
                duration: 2000
              })
            }
          }
          resolve(res)
          setTimeout(function () {
            wx.hideLoading()
          }, 15000)
        },
        fail (res) {
          
          reject({
            msg:'请求失败',
            url: vm.withBaseURL ? vm.baseURL + obj.url : obj.url,
            method:obj.method,
            data:obj.data
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
        }
      })
    })
  }
}
 
const request =new Request({
  // baseURL: `${config.domain}${config[config.env].hyServer}`,
  baseURL: `${config[config.env].domain}${config[config.env].hyServer}`,
  withBaseURL:true
})
 
module.exports = {request}