
Page({
  data: {
    list: []
  },
  onLoad(){
    this.getData()
  },
  async getData(){
    const res = await wx.http({
      url: '/announcement',
      method: 'GET'
    })
    this.setData({
      list: res.data
    })
  }
})
