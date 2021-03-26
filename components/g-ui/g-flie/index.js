// components/g-ui/g-flie/index.js
// const {tool:{ContentType}} = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 附件下载
  downLoadFile(e) {
    let {type = 'docx' ,fileName='文件名'} = e.currentTarget.dataset
    let path = '文件路径'
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    const manage = wx.getFileSystemManager();
    wx.downloadFile({
      url: path,
      header: {
        // 'content-type': ContentType(type), // 根据文件类型设置请求头
      },
      success: function (res) {
        var savePath = wx.env.USER_DATA_PATH + "/" + fileName // 修改文件名
          manage.saveFile({
            tempFilePath: `${res.tempFilePath}`,
            filePath: `${savePath}.${type}`,
            success:function(res){
              wx.openDocument({
                // fileType: type,
                filePath: res.savedFilePath,
                 success: function (res) {
                 wx.hideLoading()
                 },
                  fail: err =>{
                    wx.hideLoading()
                  }
               })
            },
            fail: err =>{
              wx.hideLoading()
            }
          })
      },
      fail: err =>{
        wx.hideLoading()
      }
    })
  }
  }
})
