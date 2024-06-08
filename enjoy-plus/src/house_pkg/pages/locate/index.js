// house_pkg/pages/locate/index.ts
import QQMapWX from '../../../libs/qqmap-wx-jssdk'
const qqMapSDK = new QQMapWX({
  key: 'PLUBZ-JE2RJ-T2FFK-XLW7V-W7X4S-QVFV5',
})
Page({
  onLoad() {
    this.search()
  },
  search() {
    // 调用腾讯位置服务的搜索
    qqMapSDK.search({
      keyword: '住在小区',
      success: (res) => {
        console.log('res', res)
      },
    })
  },
})
