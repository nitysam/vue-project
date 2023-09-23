//封装所有和用户相关的api
import request from '@/utils/http'
export const loginAPI = ({account,password}) =>{
    return request({
        url:'/login',
        method:'POST',
        data:{
            account,
            password
        }
    })
}