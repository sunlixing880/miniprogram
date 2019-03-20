//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    phoneNumber: '',
    hasPhoneNumber: false,
    canIUseUserInfo: wx.canIUse('button.open-type.getUserInfo'),
    canIUsePhoneNumber: wx.canIUse('button.open-type.getPhoneNumber')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateToMiniProgram({
      appId: 'wxbd687630cd02ce1d',
      path: 'pages/index/index',
      // envVersion:'release',
      extraData: {
        appid: 'wxd59a85a105f1c2fc',
        contract_code: '6cb5f34fb7f24ce0a957623a9ead8536',
        contract_display_account: '小野售',
        mch_id: '1311526401',
        notify_url: 'https://mobl-test.chinaums.com/ybl-front/applet/notify/contract/sign',
        plan_id: '123749',
        request_serial: '90',
        sub_appid: 'wx9c5cdeebd0cf42d7',
        sub_mch_id: '1517528761',
        timestamp: 1546596673,
        sign: '8042A6066F44FCD76F66B0CF9E21FA44'
      },
      success(res) {
        
      },
      fail(res) {
        // log("fail")
      }
    })
  },
  
  onLoad: function () {
    wx.login({
      success(res) {
        if (res.code) {
          console.log("登录成功，res.code = "+res.code)
        }
        else {
          console.log("登录失败！"+res.errMsg)
        }
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUseUserInfo){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getPhoneNumber: function(e) {
    console.log(e)
    console.log('encryptedData = ' + e.detail.encryptedData)
    console.log('errMsg = ' + e.detail.errMsg)
    console.log('iv = ' + e.detail.iv)
  }
})
