import {ref} from 'vue'
import {getParkInfoAPI} from '@/api/park.js'
import * as echarts from 'echarts'

export function useBigScreen () {
  const parkInfo = ref({})
  const getParkInfo = async () => {
  const res = await getParkInfoAPI()
  parkInfo.value = res.data
}
return {
  parkInfo,
  getParkInfo
}
}

export function useInitBarChart(parkInfo){
  const barChart = ref(null)
  const initBarChart = () => {
    const myEchart = echarts.init(barChart.value)
    const parkIncome = parkInfo.value.parkIncome
    parkIncome.yIncome = [100, 90, 110,100, 90, 110,100, 90, 110]
    const barOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        // 让图表占满容器
        top: '10px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
            show: false,
          },
          data: parkIncome.xMonth,
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: '园区年度收入',
          type: 'bar',
          barWidth: '10px',
          data: parkIncome.yIncome.map((item, index) => {
            const color =
                index % 2 === 0
                    ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0.23, color: '#74c0f8' },
                      { offset: 1, color: 'rgba(116,192,248,0.00)' },
                    ])
                    : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0.23, color: '#ff7152' },
                      { offset: 1, color: 'rgba(255,113,82,0.00)' },
                    ])
            return { value: item, itemStyle: { color } }
          }),
        },
      ],
      textStyle: {
        color: '#B4C0CC',
      },
    }
    myEchart.setOption(barOptions)
  }
  return {barChart, initBarChart}
}