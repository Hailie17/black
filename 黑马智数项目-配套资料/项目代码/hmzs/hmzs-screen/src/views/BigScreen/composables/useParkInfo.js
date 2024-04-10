
import { ref } from 'vue'
import { getParkInfoAPI } from '@/api/index'

function useParkInfo () {
  // 放置所有的业务逻辑
  // 获取园区概况数据
  const parkInfo = ref({})

  async function getUserInfo () {
    // 1. 调用接口
    const res = await getParkInfoAPI()
    // 2. 覆盖响应式数据
    parkInfo.value = res.data
  }
  // 组件重要需要用到这些数据和方法
  // 在组件中通过调用这个函数 得到这个对象
  // 然后通过解构赋值的方式再把数据和方法引入到组件
  // 中使用
  return {
    parkInfo,
    getUserInfo
  }
}

export { useParkInfo }