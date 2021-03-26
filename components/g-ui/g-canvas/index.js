//引入生成canvas方法
import {detailCanvas} from '../../../utils/util';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailImg:{
      type:String
    },
    codeImg:{
      type:String
    },
    title:{
      type:String
    },
    content:{
      type:String
    },
    price:{
      type:String
    },
    action:{
      type:String
    }
  },
  lifetimes:{
    ready:function(){
    //  获取当前手机的宽高
      wx.getSystemInfo({
        success: (res)=>{
          this.setData({
            screen_width: res.windowWidth/375,
            screen_height: res.windowHeight+ 50
         })
        },
        
      });
     
    }
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    isShow:false,
    animation:'',
    screen_width:'',
    screen_height:'',
    posters:'',
    isShare:false
  },

  methods: {
    //禁止页面滑动
      stopMove(){},
      cancel(){
        this.setData({
          isShow:false
        })
        this.creatAnimation("-100%");
      },
      showWeb(){
        this.setData({
          isShow:true
        })
        this.creatAnimation(0);
      },
      //取消保存
      callOff(){
        this.setData({
          posters:''
        })
      },
      creatPosters(){
        wx.showLoading({
          title: '绘制中',
          mask: true,
        });
        let that = this;
        let detailImg = this.properties.detailImg;
        let title = this.properties.title;
        let codeImg = this.properties.codeImg;
        let price = this.properties.price;
        let content = this.properties.content;
        let action = this.properties.action;
        Promise.all([
          this.getCode(detailImg),
          this.getCode(codeImg),
        ])
        .then(res=>{
            let sWidth = this.data.screen_width;
            let sHeight = this.data.screen_height;
            let code = res[1].tempFilePath;
            let img = res[0].tempFilePath;
          detailCanvas(that,sWidth,sHeight,img,code,title,action,price,content,function(res){
            wx.hideLoading();
            that.setData({
              posters:res,
              isShow:false
            });
            that.creatAnimation("-100%");
          });
        })
      },
      //弹窗动画效果
      creatAnimation(num){
       let animation= wx.createAnimation({
          duration:200,
          timingFunction:'ease-in'
        })
        animation.bottom(num).step();
        this.setData({
          animation:animation.export()
        })
      },
      //把网路图片下载成本地图片
      getCode(img){
        return new Promise((resolve,reject)=>{
          wx.downloadFile({
            url: img,
            success: (res) => {
              resolve(res)
            }
          })
        })
        
      },
       //保存图片
       save(){
         let posters = this.data.posters;
         wx.saveImageToPhotosAlbum({
          filePath: posters,
          success: (res)=>{
            console.log(res)
            wx.showToast({
              title:'保存成功',
              icon:'success'
            })
            this.setData({
              posters:''
            })
          },
          fail: (err)=>{
            console.log(err)
            wx.showToast({
              title: '请授权保存图片',
              icon: 'none',
            });
            this.setData({
              isShare:true
            })
          },
        });
       },
       openSetting(e){
         if(e.detail.authSetting['scope.writePhotosAlbum']){
          this.setData({
            isShare:false
          })
         }
       },
       preview(){
         let posters = this.data.posters;
         wx.previewImage({
           current: posters,
           urls: [posters],
         });
       },
    }
  })
