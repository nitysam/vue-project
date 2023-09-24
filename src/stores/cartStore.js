//封装购物车模块
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
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

    //单选功能
    const singleCheck = (skuId,selected) =>{
      //通过skuId找到要修改的项 然后把它的selected改为传过来的selected
      const item = cartList.value.find((item)=> item.skuId === skuId)
      item.selected = selected
    }
    //全选功能
    const allCheck = (selected) =>{
      //把cartList中的每一项的seleced都设置为当前的全选框状态
      cartList.value.forEach(item=>item.value.selected = selected)
    }

    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))

    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    
    const isAll = computed(()=>cartList.value.every((item)=>item.selected))
    return {
      cartList,
      allCount,
      allPrice,
      isAll,
      addCart,
      delCart,
      singleCheck,
      allCheck
    }
  },
  {
    persist: true
  }
)
