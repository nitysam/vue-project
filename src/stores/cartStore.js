//封装购物车模块
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([])
    const addCart = (goods) => {
      //添加购物车操作
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        item.count++
      } else {
        cartList.value.push(goods)
      }
    }
    //splice方法
    //   const delCart = (skuId) =>{
    //    const idx =  cartList.value.findIndex((item)=>skuId === item.skuId)
    //    cartList.value.splice(idx,1)
    //   }
    //filter方法
    const delCart = (skuId) => {
      cartList.value = cartList.value.filter((item) => skuId !== item.skuId)
    }
    return {
      cartList,
      addCart,
      delCart
    }
  },
  {
    persist: true
  }
)
