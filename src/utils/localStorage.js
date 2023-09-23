const TOKEN_STR = 'tokenStr'

//获取token对象
export const getToken = ()=>{
    return JSON.parse(localStorage.getItem(TOKEN_STR))
}
/*
*保存token到本地
*@param {object} tokenObj
*/
export const setToken = (tokenObj) =>{
    localStorage.setItem(TOKEN_STR,JSON.stringify(tokenObj))
}

//删除token 
export const delToken = () =>{
    localStorage.removeItem(TOKEN_STR)
}