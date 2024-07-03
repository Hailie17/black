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
    ],
    polyline: []
  },
  onLoad(){
    this.getPolyLine()
  },
  getPolyLine(){
    qqMapSDK.direction({
      mode: 'bicycling',
        from: {
          latitude: 40.061539,
          longitude: 116.341847,
        },
        to: {
          latitude: 40.060539,
          longitude: 116.343847
        },
      success: (e) => {
        console.log(e,'e');
        const coors = e.result.route[0].polyline
        for (let i = 2; i < coors.length; i++) {
          coors[i] = coors[i - 2] + coors[i] / 1000000
        }
        const points = []
        for (let i = 0; i < coors.length; i += 2) {
          points.push({latitude: coors[i], longitude: coors[i + 1]})
        }
        this.setData({
          polyline:[
            {
              points,
              color: 'green',
              width: 4
            }
          ]
        })
      },
      fail: (e) => {
        console.log(e,222);
      },

    })
  }
})
