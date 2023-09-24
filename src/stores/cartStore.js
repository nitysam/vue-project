//封装购物车模块
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])

    //获取最新购物车列表action
    const updateNewList = () => {
      const res = findNewCartListAPI()
      cartList.value = res.result
    }

    const addCart = async (goods) => {
      const { skuId, count } = goods
      if (isLogin.value) {
        //登录之后的加入购物车逻辑
        await insertCartAPI({ skuId, count })
        updateNewList()
      } else {
        //添加到本地购物车操作
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          item.count++
        } else {
          cartList.value.push(goods)
        }
      }
    }
    //splice方法
    //   const delCart = (skuId) =>{
    //    const idx =  cartList.value.findIndex((item)=>skuId === item.skuId)
    //    cartList.value.splice(idx,1)
    //   }
    //filter方法
    const delCart = async (skuId) => {
      if (isLogin.value) {
        //调用接口实现接口购物车中的删除功能
        await delCartAPI([skuId])
        updateNewList()
      } else {
        cartList.value = cartList.value.filter((item) => skuId !== item.skuId)
      }
    }

    //清除购物车
    const clearCart = ()=>{
      cartList.value = []
    }


    //单选功能
    const singleCheck = (skuId, selected) => {
      //通过skuId找到要修改的项 然后把它的selected改为传过来的selected
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }
    //全选功能
    const allCheck = (selected) => {
      //把cartList中的每一项的seleced都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.value.selected = selected))
    }

    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))

    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    const isAll = computed(() => cartList.value.every((item) => item.selected))

    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0)
    )

    const selectedPrice = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0)
    )
    return {
      cartList,
      allCount,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice,
      addCart,
      delCart,
      singleCheck,
      allCheck,
      clearCart
    }
  },
  {
    persist: true
  }
)
