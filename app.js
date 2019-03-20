//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.showModal({
          title: '登录code',
          content: res.code,
        })
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
              console.log('encryptedData'+res.encryptedData);

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
  globalData: {
    userInfo: null
  },
  onShow: function (res) {
    if (res.scene === 1038) { // 场景值1038：从被打开的小程序返回
      const { appId, extraData } = res.referrerInfo
      if (appId == 'wxbd687630cd02ce1d') { // appId为wxbd687630cd02ce1d：从签约小程序跳转回来
        if (typeof extraData == 'undefined') {
          // TODO
          // 客户端小程序不确定签约结果，需要向商户侧后台请求确定签约结果
          wx.showToast({
            title: '不确定签约结果，需要后台查询',
          })
          return;
        }
        if (extraData.return_code == 'SUCCESS') {
          // TODO
          // 客户端小程序签约成功，需要向商户侧后台请求确认签约结果
          var contract_id = extraData.contract_id
          wx.showModal({
            title: '签约协议号',
            content: contract_id,
          })
          return;
        } else {
          // TODO
          // 签约失败
          wx.showToast({
            title: '签约失败',
          })
          return;
        }
      }
    }
  }
})