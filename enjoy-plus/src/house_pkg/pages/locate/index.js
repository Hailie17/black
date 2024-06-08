// house_pkg/pages/locate/index.ts
import QQMapWX from '../../../libs/qqmap-wx-jssdk'
const qqMapSDK = new QQMapWX({
  key: 'PLUBZ-JE2RJ-T2FFK-XLW7V-W7X4S-QVFV5',
})
Page({
  data: {
    list: []
  },
  async onLoad() {
    const {longitude,latitude} = await wx.getLocation({type: 'gcj02'})
    this.search({longitude,latitude})
  },
  search({longitude,latitude}) {
    // 调用腾讯位置服务的搜索
    qqMapSDK.search({
      // 当前位置坐标
      location: {longitude,latitude},
      keyword: '住宅小区',
      page_size: 5,
      success: (res) => {
        this.setData({
          list: res.data
        })
      },
    })
  },
})
