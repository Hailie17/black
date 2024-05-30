// 在页面中导入
import validate from 'wechat-validate'

Page({
  // 通过 behaviors 注入 validate 方法 相当于 vue 的 mixins
  behaviors: [validate],

  // 定义表单数据的验证规则
  rules: {
    mobile: [
      { required: true, message: '请填写手机号码!' },
      { pattern: /^1[3-8]\d{9}$/, message: '请检查手机号码是否正确!' },
    ],
    code: [
      { required: true, message: '请填写短信验证码!' },
      { pattern: /^\d{6}$/, message: '请检查短信验证码是否正确!' }
    ]
  },

  data: {
    countDownVisible: false,
    mobile:'',
    code: ''
  },
  //倒计时显示时间
  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },

  // 获取验证码
  async getSMSCode(){
    const  {valid, message} = this.validate('mobile')
    if (valid) {
      const res = await wx.http.get('/code', {mobile: this.data.mobile})
      this.setData({
        code:res.data.code
      })
      this.setData({
        countDownVisible: true
      })
    } else {
      wx.utils.toast(message)
    }
  },

  // 点击登录
  async submit(){
    const {mobile,code} =  this.data
    const isValidate = this.validate(code)
    if(isValidate) {
      const res = await wx.http.post('/login', {mobile,code})
      const app = getApp()
      app.token = res.data.token
      wx.setStorageSync('token', res.data.token)
      wx.reLaunch({
        url: '/pages/notify/index',
      })
    }
  }
})
