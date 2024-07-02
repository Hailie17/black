Page({
  data: {
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [],
    houseName: '',
    repaireList: [],
    repaireName: '',
    repairItem: [{ name: '水路卫浴' }, { name: '电路灯具' }, { name: '管道疏通' }, { name: '开锁换锁' }],
    attachment: [
      { url: '/repair_pkg/static/uploads/attachment.jpg' },
      { url: '/repair_pkg/static/uploads/attachment.jpg' },
    ],
    id: undefined,
    houseId: '',
    repairItemId: '',
    mobile: '',
    appointment: '',
    description: '',
  },
  onLoad(){
    this.getHouseList()
    this.getRepaireList()
  },
  async getHouseList(){
    const res = await wx.http.get('/house')
    this.setData({
      houseList: res.data
    })
  },
  async getRepaireList(){
    const res = await wx.http.get('/repairItem')
    this.setData({
      repaireList: res.data
    })
  },
  selectHouse(ev){
    this.setData({
      houseName: ev.detail.name
    })
  },
  selectRepairItem(ev){
    this.setData({
      repaireName: ev.detail.name
    })
  },
  // 选则日期
  comfirmDate(ev){
    this.setData({
      appointment: wx.utils.formatDate(ev.detail),
      dateLayerVisible: false
    })
  },
  // 上传图片
  async afterRead(ev){
    const res = await wx.http.upload('/upload', {
      name: 'file',
      filePath: ev.detail.file.url
    })
    this.setData({
      attachment: [...this.data.attachment, res.data]
    })
  },
  // 删除图片
  uploadDelete(ev){
    this.setData({
      attachment: this.data.attachment.filter((v,index) => index !== ev.detail.index)
    })
  },
  //文件读取前
  beforeRead(ev){
    const {file,callback} = ev.detail
    if(file.size > 1024 * 1024 * 1) {
      return callback(false)
    }
    callback(true)
  },

  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index',
    })
  },
})
