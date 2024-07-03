Page({
  onShareAppMessage() {
    return {
      title: '查看通行证',
      path: '/visitor_pkg/pages/passport/index',
      imageUrl: 'https://enjoy-plus.oss-cn-beijing.aliyuncs.com/images/share_poster.png',
    }
  },
  async saveImage(){
    const {path} = await wx.getImageInfo({
      src: 'https://enjoy-plus.oss-cn-beijing.aliyuncs.com/uploads/qrcode.png',
    })
    await wx.saveImageToPhotosAlbum({
      filePath: path,
    })
    wx.utils.toast('图片保存成功')
  }
})
