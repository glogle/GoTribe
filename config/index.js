

module.exports = {


  env: 'ready',   // dev（开发）、test（测试）、ready（预发布）、prod（生产） 对应下面的配置切换环境

  dev: {
    domain: 'http://192.168.11.182:8900', // 开发环境：接口请求地址
    hyServer: '/meetHelper/api/', // 开发环境
    srcPath: 'http://192.168.11.182:8900/meetHelper/api'
  },
  test: {
    domain: 'https://xtbgtest.digitalgd.com.cn', // 省测试环境
    hyServer:'/xtbghyzs/meetHelper/api/', // 省测试环境
    srcPath: 'https://xtbgtest.digitalgd.com.cn/xtbghyzs/meetHelper/api'
  },
  ready: {
    domain: 'https://xtbg.digitalgd.com.cn', // 汕尾已发布环境
    hyServer:'/xtbgswhygl/meetHelper/api/',  // 汕尾已发布环境
    srcPath: 'https://xtbg.digitalgd.com.cn/xtbgswhygl/meetHelper/api'
  },
  prod: {
    domain: 'https://xtbg.gdzwfw.gov.cn', // 汕尾正式环境
    hyServer: '/xtbgswhygl/meetHelper/api/', // 汕尾正式环境
    srcPath: 'https://xtbg.gdzwfw.gov.cn/xtbgswhygl/meetHelper/api'
  },

  // 天行数据配置
  APIKEY: 'e16f8d4f026123c6b0deb96324b7e1c5', //天行数据APIKEY
  baseUrl: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
}