const utils = {
  /**
   * 轻提示
   */
  toast(title = '提示'){
    wx.showToast({
      title,
      icon: 'none',
      mask: true
    })
  }
}

export default utils