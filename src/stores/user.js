import {defineStore} from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { setToken,getToken } from '@/utils/localStorage'
export const useUserStore = defineStore('user',()=>{
    const userInfo = ref({})
    const getUserInfo = async({account,password}) =>{
      const res = await  loginAPI({account,password})
      setToken(res.result)
      userInfo.value = getToken()
    }
    return {
        userInfo,
        getUserInfo
    }
})