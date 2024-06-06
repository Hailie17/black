// pages/profile/index.ts
Page({
  data: {
    userInfo: {}
  },
  onLoad(){
    const token = wx.getStorageSync('token')
    if (token) {
      this.getUserInfo()
    }
  },
  async getUserInfo(){
    const res = await wx.http.get('/userInfo')
    this.setData({
      userInfo: res.data
    })
  },
  async updateNickName(e){
    const res = await wx.http.put('/userInfo', {
      nickName: e.detail.value
    })
  },
  async changeAvatar(e){
    // 微信原生调用 wx.uploadFile
    // wx.uploadFile({
    //   filePath: e.detail.avatarUrl,
    //   header: {
    //     Authorization: "Bearer " + wx.getStorageSync('token')
    //   },
    //   name: 'file',
    //   url: wx.http.baseURL + '/upload',
    //   formData:{
    //     type: 'avatar',
    //   },
    //   success: (res) => {
    //     this.setData({
    //       'userInfo.avatar': res.data.url
    //     })
    //   }
    // })
    // 
    const res = await wx.http.upload('/upload', {
      name: 'file',
      formData:{
        type: 'avatar',
      },
      filePath: e.detail.avatarUrl,
    })
    this.setData({
      'userInfo.avatar': res.data.url
    })
  }
})