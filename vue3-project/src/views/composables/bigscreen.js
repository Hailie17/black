import {ref} from 'vue'
import {getParkInfoAPI} from '@/api/park.js'

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
