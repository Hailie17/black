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
  
})