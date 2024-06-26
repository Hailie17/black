// \u4e00-\u9fa5] 中文验证规则
import wxValidate from 'wechat-validate'
Page({
  behaviors: [wxValidate],
  data: {
    idcardFrontUrl: '',
    idcardBackUrl: '',
    id: '',
    point: '',
    building: '',
    room: '',
    name: '',
    gender: '1', //性别默认选中
    mobile: '',
    idcardFrontUrl: '/static/images/avatar_1.jpg',
    idcardBackUrl: '/static/images/avatar_2.jpg',
  },
  rules: {
    name: [
      { required: true, message: '业主姓名不能为空!' },
      { pattern: /^[\u4e00-\u9fa5]{2,5}$/, message: '业主姓名只能为中文!' },
    ],
    mobile: [
      { required: true, message: '业主手机号不能为空!' },
      { pattern: /^1[3-8]\d{9}$/, message: '请填写正确的手机号!' },
    ],
    idcardFrontUrl: [{ required: true, message: '请上传身份证国徽面!' }],
    idcardBackUrl: [{ required: true, message: '请上传身份证照片面!' }],
  },
  onLoad({ point, building, room }) {
    // 获取房屋信息数据
    this.setData({ point, building, room })
  },
  // goList() {
  //   wx.reLaunch({
  //     url: '/house_pkg/pages/list/index',
  //   })
  // },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    this.setData({ [type]: '' })
  },
  // 提交审核
  async submitForm() {
    // 验证数据
    const isValid = this.validate()
    if (!isValid) return
    // 获取全部的数据（剔除可能多余参数 __webviewId__）
    const { __webviewId__, id, ...form } = this.data
    // 调用接口
    const { code } = await wx.http.post('/room', form)
    // 检测接口是否调用成功
    if (code !== 10000) return wx.utils.toast('提交数据失败!')
    // 返回房屋列表页面
    wx.navigateBack({ delta: 4 })
  },
  // 选择图片
  async choosePicture(e){
    // 结构出事件参数，区分正反的点击
    const {type} = e.mark
    const {tempFiles} = await wx.chooseMedia({
      count: 1,
      mediaType: ['image']
    })
    if(tempFiles[0].size > 1 *1024 *1024){
      return wx.utils.toast('图片大小不能超过1M')
    }
    const res = await wx.http.upload('/upload',{
      name: 'file',
      filePath: tempFiles[0].tempFilePath
    })
    this.setData({
      // 用[]插值语法，动态设置key值
      [type]: res.data.url
    })
  }
})
