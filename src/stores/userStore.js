import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

// import { setToken,getToken } from '@/utils/localStorage'
export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const cartStore = useCartStore()
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      // setToken(res.result)
      userInfo.value = res.result
      console.log('###', userInfo.value)
      //合并购物车
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          }
        })
      )
      cartStore.updateNewList()
    }
    const clearUserInfo = async () => {
      userInfo.value = {}
      //清除购物车的action
      cartStore.clearCart()
    }
    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    }
  },
  {
    persist: true
  }
)
