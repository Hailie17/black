Page({
  data: {
    countDownVisible: true,
  },
// 倒计时显示时间
  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
})
