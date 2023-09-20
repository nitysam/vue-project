//封装banner轮播图相关代码
import { getBannerAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'
export function useBanner() {
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await getBannerAPI({ distributionSite: 2 })
    console.log(res)
    bannerList.value = res.result
  }
  onMounted(() => {
    getBanner()
  })

  return {
    bannerList
  }
}
