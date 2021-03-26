const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const getPhone = (code, imgs, sWidth, sHeight, classNames, textStyle, successCallback, textcolor, codecolor) => {
  let that = this;
  const variableNum = sWidth / 750;
  const ctx = wx.createCanvasContext(classNames);
  ctx.drawImage(code, 250 * variableNum, 650 * variableNum, 100, 100); //绘制二维码
  ctx.drawImage(imgs, 40, 10, 600 * variableNum, 400 * variableNum);  //绘制图片
  ctx.setTextAlign(textStyle)
  ctx.setFillStyle(codecolor)
  ctx.setFontSize(28)
  ctx.fillText("我是文字部分....", 400 * variableNum, 500 * variableNum)
  ctx.setFillStyle(textcolor)
  ctx.fillText("长按二维码....", 400 * variableNum, 600 * variableNum)
  ctx.stroke()
  ctx.draw();
  setTimeout(function () {  //这里要加定时器，转成图片需要一定的时间，不然是不出来图片的哦
    // canvas画布转成图片
    var i = getCurrentPages(), a = i[i.length - 1];//获取当前引用该方法的data里面的值
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 580,
      height: 680,
      destWidth: 580,
      destHeight: 680,
      canvasId: classNames,
      fileType: 'png',
      success: (res) => {
        console.log(res);
        successCallback
        a.setData({
          imgurl: res.tempFilePath,
          hidden: false
        })
      },
      fail: function () {
        console.log("保存失败......")
      }
    })
  }, 2000)
}

const detailCanvas = (that, sWidth, sHeight, imgUrl, codeImg, title, action, price, content, callback) => {
  let rpx = sWidth;
  const cxt = wx.createCanvasContext('myCanvas', that);
  cxt.save();
  cxt.setFillStyle('#fff')
  cxt.fillRect(0, 0, sWidth * 375, sHeight);
  //商品图片
  let detailImgHeight = (sWidth * 375) * 9 / 16;
  cxt.drawImage(imgUrl, 0, 0, sWidth * 375, detailImgHeight);
  //二维码
  cxt.drawImage(codeImg, (sWidth * 375 - 110 * rpx), 380 * rpx, 100 * rpx, 100 * rpx);
  cxt.restore();
  //标题
  cxt.setFontSize(18);
  if (title.length > 19) {
    title = title.slice(0, 18) + "...";
  }
  cxt.fillText(title, 10 * rpx, 240 * rpx);
  //价格
  if (price) {
    cxt.setFontSize(20);
    cxt.setFillStyle("#eb164c");
    cxt.fillText('￥' + price, 10 * rpx, 280 * rpx);
  }
  //副标题
  if (content) {
    if (content.length > 19) {
      content = content.slice(0, 18) + "...";
    }
    cxt.setFontSize(20);
    cxt.setFillStyle("#eb164c");
    cxt.fillText(content, 10 * rpx, 320 * rpx);
  }
  cxt.setStrokeStyle('#ddd')
  cxt.strokeRect(0, 350 * rpx, sWidth * 375, 0.1)
  cxt.setFillStyle('#292929');
  cxt.setFontSize('12');
  cxt.fillText('微信扫码或长按保存图片', 10 * rpx, 390 * rpx);
  cxt.fillText(action || '微信小程序商城', 10 * rpx, 420 * rpx);
  cxt.draw(false, () => {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: "myCanvas",
      fileType: 'png',
      success: (res) => {
        callback(res.tempFilePath)
      },

    }, that);
  });
}


module.exports = {
  formatTime,
  formatNumber,
  getPhone,
  detailCanvas
}
