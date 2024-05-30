Page({
  data: {
    countDownVisible: false,
    mobile:'',
    code: ''
  },
// 倒计时显示时间
  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
  async getSMSCode(){
    this.setData({
      countDownVisible: true
    })
    const res = await wx.http.get('/code', {mobile: this.data.mobile})
    this.setData({
      code:res.data.code
    })
  }
})
