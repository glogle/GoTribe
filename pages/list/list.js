// pages/detail/detail.js
var app = getApp()
Page({
  data: {
    status: false,
    currentTab: 0, // 当前tab位置
    show: false,
    windowW: '',
    windowH: '',
    bgpic: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
    propic: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
    list: [{
      id: 0,
      title: '组件1',
      data: '小说',
      bgColor: '#ff0000'
    }, {
      id: 1,
      title: '组件2',
      data: '漫画',
      bgColor: '#00ff00'
    }, {
      id: 2,
      title: '组件3',
      data: '视频',
      bgColor: '#0000ff'
    }, {
      id: 3,
      title: '组件4',
      data: '音乐',
      bgColor: '#f0000f'
    }],
    datas: '',
    heights: 0,
  },
  onLoad: function () {
    var _ = this
    wx.createSelectorQuery().selectAll('.swiper-tab').boundingClientRect(function (rect) {
      wx.getSystemInfo({
        success: function (res) {
          _.setData({
            heights: res.windowHeight - rect[0].height
          });
          _.canvasImage()
        },
      })
    }).exec()
    this.getData()
  },
  gotopage: function () {
    console.log('qwww')
  },
  getData: function () {
    var that = this
    wx.request({
      url: "https://api.apiopen.top/musicRankings",
      //header:{...}用啥设置啥，我这里什么都不需要修改
      method: "GET",
      dataType: "json", //若设置json则直接返回的是对象，若其他返回貌似是String
      success: function (res) {
        var obj = res; //我们这里打断点来看数据是否获取到了
        //这里执行数据操作，
        console.log(obj)
        that.setData({
          datas: res
        });
      },
      fail: function (e) {

      },
      complete: function (obj) {

      }
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    this.handleGotoMap5(e.detail.current)
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  // handleGotoMap: function(){
  //   const key = 'BH5BZ-WE7L5-N7LIL-QA5I7-7S5SS-QDBZ5'; //使用在腾讯位置服务申请的key
  //   const referer = 'Go部落'; //调用插件的app的名称
  //   const location = JSON.stringify({
  //     latitude: 39.89631551,
  //     longitude: 116.323459711
  //   });
  //   // const category = '生活服务,娱乐休闲';

  //   wx.navigateTo({
  //     url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
  //   });
  // },
  handleGotoMap2: function () {
    let plugin = requirePlugin("subway");
    const key = 'BH5BZ-WE7L5-N7LIL-QA5I7-7S5SS-QDBZ5'; //使用在腾讯位置服务申请的key
    const referer = 'Go部落'; //调用插件的app的名称
    wx.navigateTo({
      url: 'plugin://subway/index?key=' + key + '&referer=' + referer
    });
  },
  handleGotoMap3: function () {
    let plugin = requirePlugin('routePlan');
    const key = 'BH5BZ-WE7L5-N7LIL-QA5I7-7S5SS-QDBZ5'; //使用在腾讯位置服务申请的key
    const referer = 'Go部落'; //调用插件的app的名称
    let endPoint = JSON.stringify({ //终点
      'name': '',
      'latitude': null,
      'longitude': null
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },
  handleGotoMap4: function (e) {
    if (e) {
      this.selectComponent("#popups").showBox()
    }
    // this.setData({
    //   status: !this.data.status
    // })
  },
  handleGotoMap5: function (tab) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.list[tab].bgColor,
      animation: {
        duration: 400,
        timingFunc: 'easeOut'
      }
    })
  },
  handleGotoMap6() {
    var that = this
    that.setData({
      show: true
    })
    // 通过 SelectorQuery 获取 Canvas 节点
    wx.createSelectorQuery()
      .select('#myCanvas')
      .fields({
        node: true,
        size: true,
      })
      .exec(this.drawCanvas.bind(this))
    // that.drawCanvas()
  },
  forbidMove(e) {
    return
  },
  canvasImage() {
    var that = this

    // 获取设备宽高，以备海报全屏显示

    wx.getSystemInfo({

      success: (res) => {

        that.setData({

          windowW: res.windowWidth - 20,
          // windowH: res.windowHeight
          windowH: this.data.heights - 20

        })

      },

    })

    // 海报背景图线上地址

    var url = 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'

    // 商品图片（哪吒头像）线上地址

    var urll = 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'

    // 小程序二维码

    var urlqCord = ''

    that.getBG(url).then(function (locationData) {

      that.setData({

        bgpic: locationData

      })

    })

    that.getBG(urll).then(function (locationData) {

      that.setData({

        propic: locationData

      })

    })

    that.getBG(urlqCord).then(function (locationData) {

      that.setData({

        qCord: locationData

      })

    })
  },
  // 绘制canvas

  drawCanvas(res) {
    var that = this

    var windowW = that.data.windowW

    var windowH = that.data.windowH

    var text = '从不拘泥任何世俗凡人的目光，我要奔向前方那光芒，生而为魔，那又如何'


    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        // canvas.width = res[0].width * dpr
        // canvas.height = res[0].height * dpr
        canvas.width = windowW
        canvas.height = windowH
        wx.getImageInfo({
          src: that.data.bgpic,
          success(res) {
            // ctx.drawImage(res.path,0,0,100,100)
            // ctx.draw()
            console.log(res)
          }
        })
        ctx.scale(dpr, dpr)
        ctx.fillRect(0, 0, 100, 100)
      })


    // 使用 wx.createContext 获取绘图上下文 context

    // const canvas = res[0].node
    // console.log(canvas,'.........')
    // const context = canvas.getContext('2d')
    // console.log(canvas,context,'context//////////////////////////////')




    // // 海报背景图

    // // context.drawImage(that.data.bgpic, (windowW - 280) / 2, (windowH - 450) / 2, 280, 450)

    // // 商品图片

    // // context.drawImage(that.data.propic, (windowW - 170) / 2, (windowH - 390) / 2, 170, 170)

    // // 商品文字描述

    // context.setFontSize(30)

    // context.setFillStyle("red")

    // context.fillText('￥99.99', (windowW - 200) / 2, (windowH + 55) / 2)

    // // context.setFontSize(18)

    // context.setFillStyle("#999999")

    // context.fillText('￥99.99', (windowW + 50) / 2, (windowH + 55) / 2)

    // // 设置线条的起始路径坐标
    // context.moveTo((windowW + 45) / 2, (windowH + 44) / 2);  

    // // 设置线条的终点路径坐标
    // context.lineTo((windowW + 200) / 2, (windowH + 44) / 2); 

    // context.stroke(); //对当前路径进行描边

    // // 商品名字，名字很长调用方法将文字折行，传参 文字内容text，画布context

    // var row = that.newLine(text, context)

    // var a = 24//定义行高25

    // for (var i = 0; i < row.length; i++) {

    //   context.setFontSize(16)

    //   context.setFillStyle("#000000")

    //   context.fillText(row[i], (windowW - 195) / 2, (windowH + 130) / 2 + a * i, 320)

    // }

    // // 识别小程序二维码

    // // context.drawImage(that.data.qCord, (windowW - 180) / 2, (windowH + 289) / 2, 75, 75)

    // context.setFillStyle("#000000")

    // context.setFontSize(12)

    // context.fillText('长按识别小程序', (windowW - 0) / 2, (windowH + 350) / 2)

    // context.setFillStyle("#000000")

    // context.setFontSize(18)

    // context.fillText('享更多好货', (windowW - 0) / 2, (windowH + 390) / 2)

    // context.draw()

  }, // 点击保存按钮，同时将画布转化为图片

  daochu() {

    var that = this;

    wx.canvasToTempFilePath({

      x: 0,

      y: 0,

      canvasId: 'myCanvas',

      fileType: 'jpg',

      quality: 1,

      success: function (res) {

        that.setData({

          shareImage: res.tempFilePath

        })

        setTimeout(function () {

          wx.showModal({

            title: '提示',

            content: '将生成的海报保存到手机相册，可以发送给微信好友或分享到朋友圈',

            success(res) {

              if (res.confirm) {

                that.eventSave()

              } else if (res.cancel) {

                console.log('用户点击取消')

              }

            }

          })

        }, 1000)

      }

    })

  },
  close() {
    this.setData({
      show: false
    })
  },

  // 将商品分享图片保存到本地

  eventSave() {

    wx.saveImageToPhotosAlbum({

      filePath: this.data.shareImage,

      success(res) {

        wx.showToast({

          title: '保存图片成功',

          icon: 'success',

          duration: 2000

        })

      }

    })

  },

  //将线上图片地址下载到本地，此函数进行了封装，只有在需要转换url的时候调用即可

  getBG(url) {

    // Promise函数给我很大的帮助，让我能return出回调函数中的值

    return new Promise(function (resolve) {

      wx.downloadFile({

        url: url,

        success: function (res) {

          url = res.tempFilePath

          resolve(url);

        }

      })

    })

  },

  // canvas多文字换行

  newLine(txt, context) {

    var txtArr = txt.split('')

    var temp = ''

    var row = []

    for (var i = 0; i < txtArr.length; i++) {

      if (context.measureText(temp).width < 210) {

        temp += txtArr[i]

      } else {

        i--

        row.push(temp)

        temp = ''

      }

    }

    row.push(temp)

    //如果数组长度大于3 则截取前三个

    if (row.length > 3) {

      var rowCut = row.slice(0, 3);

      var rowPart = rowCut[2];

      var test = "";

      var empty = [];

      for (var a = 0; a < rowPart.length; a++) {

        if (context.measureText(test).width < 180) {

          test += rowPart[a];

        } else {

          break;

        }

      }

      empty.push(test);

      var group = empty[0] + "..." //这里只显示三行，超出的用...表示

      rowCut.splice(2, 1, group);

      row = rowCut;

    }

    return row

  },
  handleGotoMap7(){
    wx.downloadFile({
      // 示例 url，并非真实存在
      // url: 'https://wyj-1301188774.cos.ap-guangzhou.myqcloud.com/czzy/rename.docx',
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607087634603&di=243abb935725d45ebdcbb16caa3e9535&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F05%2F00%2F01300000194285122188000535877.jpg',
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },

  // 获取用户信息
  getUserInfo() {
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
      //  console.log('授权获取用户信息：',res)
       console.log('encryptedData',res.encryptedData)
       console.log('iv',res.iv)
      },
      fail: err =>{
        console.log('授权获取用户信息失败：',err)
      }
    })
  },
  getPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }
})