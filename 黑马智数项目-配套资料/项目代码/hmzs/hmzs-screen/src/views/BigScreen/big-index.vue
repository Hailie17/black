<script setup>
import { onMounted, ref } from 'vue'
import { Application } from '@splinetool/runtime'
import { useParkInfo, useInitBarChart, useInitPieChart } from './composables'
import LoadingComponent from '@/components/LoadingComponent.vue'
import VScaleScreen from 'v-scale-screen'
const { parkInfo, getUserInfo } = useParkInfo()
const { initBarChart, barChart } = useInitBarChart(parkInfo)
const { initPieChart, pieChart } = useInitPieChart(parkInfo)

/**
 1. 2D图表
 图表通用实现流程
   1. 以npm方法把三方图表库安装到本地项目中
   2. 看官方的DEMO样例来实现一个简单的图表渲染
      1. 引入echarts
      2. 准备一个渲染的节点（宽高可用的dom节点）
      3. 使用init进行图表的实例化
      4. 按照业务的需求准备图表参数（使用后端数据替换掉静态数据）
      5. 调用图表的setOption方法传入参数完成图表的渲染
      重点: 初始化操作都必须放到mounted钩子中去做 

  小坑：图表的渲染函数写到了mounted钩子里面 所以响应式数据哪怕已经发生变化了
  但是图表只会在首次渲染的时候去读数据，这个时候读到是什么就是什么，并不会随着
  数据的变化而重新渲染

  模版之所以可以用可选链解决问题 新数据返回之后 再次渲染
  模版本身会和响应式数据发生关联 一旦依赖的响应式数据发生变化
  整块模版会再次去读取数据使用新数据再次渲染

  2. 基于逻辑的函数拆分
  实现通用流程
    1. 找到独立的业务逻辑（数据 + 操作数据的行为方法）
    2. 定义一个以useXXX方法 在内部编写业务逻辑
    3. 在use函数的内部 把组件中将来需要用到的数据或者方法以对象的方法return出去
    4. 在组件的setup函数中通过执行use函数 + 解构赋值 重新拿到数据和方法给组件使用
*/

// 渲染3D模型
// 1. 下载一个3d解析器
// 2. 实例解析器 调用load方法加载并解析3D模型
const ref3d = ref(null)
const isShowLoading = ref(false)
function init3DModel () {
  isShowLoading.value = true
  // 拉取模型渲染
  // 1. 实例化解析引擎
  const spline = new Application(ref3d.value)
  // 2. 加载3d模型并渲染 (拉取模型并且渲染到指定的节点位置) [下载很慢 + 解析更慢]
  spline.load('https://fe-hmzs.itheima.net/scene.splinecode').then(() => {
    // 提示用户
    // 打印一下
    console.log('模型渲染完毕了')
    isShowLoading.value = false
  })
}

onMounted(async () => {
  // 保证图表依赖的数据已经完全返回 再做图表的初始化
  await getUserInfo()
  initBarChart()
  initPieChart()
  setTimeout(() => {
    // init3DModel()
  }, 500)
})

</script>

<template>
  <VScaleScreen width="1920" height="1080">
    <div class="all-charts">
      <!-- 园区概况 -->
      <div class="section-one">
        <img class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E6%A6%82%E5%86%B5%402x.png"
          alt="" />
        <div class="icons-container">
          <div class="item">
            <div class="icons-item building-icon">
              <span class="number">
                <!-- 
                为什么parkInfo.base是一个undefined?
                原因：首次数据还没有回来的时候 完成了第一次渲染 出错了

                {}.base - undefined - undefined.buildingTotal

                解决：可选链?.  必须保证?前面的东西不是undefined且不是null才会执行后面的点运算
               -->
                {{ parkInfo.base?.buildingTotal }}
              </span>
            </div>
            <span class="title">楼宇总数</span>
            <span class="unity">（栋）</span>
          </div>
          <div class="item">
            <div class="icons-item enterprise-icon">
              <span class="number">
                {{ parkInfo.base?.enterpriseTotal }}
              </span>
            </div>
            <span class="title">入驻企业总数</span>
            <span class="unity">（家）</span>
          </div>
          <div class="item">
            <div class="icons-item car-icon">
              <span class="number">
                {{ parkInfo.base?.parkingTotal }}
              </span>
            </div>
            <span class="title">车位总数</span>
            <span class="unity">（个）</span>
          </div>
          <div class="item">
            <div class="icons-item rod-icon">
              <span class="number">
                {{ parkInfo.base?.chargePoleTotal }}
              </span>
            </div>
            <span class="title">一体杆总数</span>
            <span class="unity">（个）</span>
          </div>
        </div>
      </div>
      <!-- 园区年度收入分析 -->
      <div class="section-two">
        <img class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E5%B9%B4%E5%BA%A6%E6%94%B6%E5%85%A5%E5%88%86%E6%9E%90%402x.png"
          alt="" />
        <div class="bar-chart-titile">
          <span>单位：元</span>
          <div>
            <span class="bar-icon blue-bar-icon"></span>
            <span class="bar-icon red-bar-icon"></span>
            收入情况
          </div>
        </div>
        <div class="bar-chart" ref="barChart"></div>
      </div>
      <!-- 园区产业分布 -->
      <div class="section-three">
        <img class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E4%BA%A7%E4%B8%9A%E5%88%86%E5%B8%83%402x.png"
          alt="" />
        <div class="pie-chart" ref="pieChart"></div>
      </div>
    </div>
    <div class="model-container">
      <!-- 
      模型渲染完毕之后显示loading 完毕之后显示3d模型 - 条件渲染 v-if
     -->
      <LoadingComponent :loading="isShowLoading" />
      <!-- 准备3D渲染节点 -->
      <canvas class="canvas-3d" ref="ref3d" />
    </div>
  </VScaleScreen>
</template>


<style scoped lang="scss">
.all-charts {
  position: absolute;
  top: 0;
  left: 0;
  width: 480px;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(to left, rgba(0, 6, 15, 0.00) 0%, rgba(0, 6, 15, 0.00) 20%, rgba(0, 0, 0, 0.40) 30%, rgba(0, 0, 0, 0.60) 40%, rgba(1, 4, 11, 1) 70%, #04070d 100%);

  .img-header {
    height: 30px;
  }
}

.section-one {
  flex-basis: 25%;

  .icons-container {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;

    .item {
      text-align: center;
      display: flex;
      flex-direction: column;
      flex: 1;

      .icons-item {
        height: 80px;
        position: relative;

        .number {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
          font-family: FontquanXinYiGuanHeiTi, FontquanXinYiGuanHeiTi-Regular;
          color: #ffffff;
        }
      }

      .building-icon {
        background: url('@/assets/building-icon.png') no-repeat 50% 0 / contain;
      }

      .enterprise-icon {
        background: url('@/assets/enterprise-icon.png') no-repeat 50% 0 / contain;
      }

      .rod-icon {
        background: url('@/assets/rod-icon.png') no-repeat 50% 0 / contain;
      }

      .car-icon {
        background: url('@/assets/car-icon.png') no-repeat 50% 0 / contain;
      }

      .title,
      .unity {
        font-size: 14px;
        color: #cdd7e1;
      }

      .title {
        margin-top: 8px;
      }
    }
  }
}

.section-two {
  flex-basis: 35%;
  margin-top: 50px;

  .bar-chart {
    width: 100%;
    height: calc(100% - 90px);
  }
}

.section-three {
  flex-basis: 40%;

  .pie-chart {
    position: relative;
    margin: 0 auto;
    padding-bottom: 20px;
    width: 80%;
    height: calc(100% - 40px);
  }
}

.model-container {
  height: 100%;
  background-color: black;
  width: 100%;
  flex-shrink: 0;
}
</style>