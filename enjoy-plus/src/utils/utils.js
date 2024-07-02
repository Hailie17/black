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
  },
  /**
   * 日期格式化
   */
  formatDate(time){
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
  }
}

export default utils