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
