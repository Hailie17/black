Page({
  data: {
    list: [],
    dialogVisible: false,
    isFirstLoad: true
  },
  onShow(){
    this.getList()
  },
  async getList(){
    const res = await wx.http.get('/room')
    this.setData({
      list: res.data,
      isFirstLoad: false
    })
  },
  swipeClose(ev) {
    const { position, instance } = ev.detail
    this.id = ev.mark.id
    if (position === 'right') {
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true,
      })
      // swiper-cell 滑块关闭
      instance.close()
    }
  },
  async dialogClose(e){
    if (e.detail === 'confirm') {
      await wx.http.delete(`/room/${this.id}`)
      this.setData({
        list: this.data.list.filter((v) => v.id !== this.id)
      })
    }
  },
  goDetail(e) {
    wx.navigateTo({
      url: '/house_pkg/pages/detail/index?id=' + e.mark.id,
    })
  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },
})
