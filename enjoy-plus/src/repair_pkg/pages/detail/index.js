// map.js
import qqMapSDK from '../../../utils/qqMapSDK'

Page({
  data: {
    //中心点
    latitude: 40.060539,
    longitude: 116.343847,
    scale: 16,
    // 标记点
    markers: [
      {
        id: 1,
        latitude: 40.060539,
        longitude: 116.343847,
        width: 32,
        height: 50
      },
      {
        id: 2,
        latitude: 40.061539,
        longitude: 116.341847,
        iconPath: '../../../static/images/marker.png',
        width: 32,
        height: 50
      }
    ]
  },
  onLoad(){
    this.getPolyLine()
  },
  getPolyLine(){
    qqMapSDK.direction({
      mode: 'bicycling',
      form: {latitude: 40.061539,
        longitude: 116.341847,},
      to: {latitude: 40.060539,
        longitude: 116.343847},
      success: (e) => {
        console.log(e,'e');
      },
      fail: (e) => {
        console.log(e,222);
      }
    })
  }
})
