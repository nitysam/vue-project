//httpInstance太长了、修改为request，效果相同
import request from '@/utils/http'

export const getCategoryAPI=(id)=>{
    return request({
        url:'/category',
        params:{
            id
        }
    })
}