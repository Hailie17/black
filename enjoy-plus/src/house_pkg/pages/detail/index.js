Page({
  data(){
    detail: {}
  },
  onLoad(query){
    this.getDetail(query.id)
  },
  async getDetail(id){
    const res = await wx.http.get(`/room/${id}`)
    this.setData({
      detail: res.data
    })
  },
  editHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/form/index',
    })
  },
})
