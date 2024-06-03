import * as API from './'
//获取地址列表
export const getAddressList = (id) => {
    return API.GET(`/api/sonArea/${id}?`,id)
}
// export const getAddressList = (id) => {
//     return API.GET('/api/sonArea/0?',id)
// }
//获取所属校区
export const getCampus = () => {
    return API.GET('/api/getLoginUser?')
}
//添加接口
export const getadd=(data)=>{
    return API.POST('/api/ship/addressAdd',data)
}
//渲染列表接口
export const getlist=(params)=>{
    return API.GET('/api/ship/address?',params)
}
//删除接口
export const getdel=(id)=>{
    return API.DELETE(`/api/ship/addressDel/${id}`)
}
//编辑接口
export const geteditt=(data)=>{
    return API.PUT(`/api/ship/addressEdit/${data.id}`,data)
}
//启用接口
export const getopen=(data)=>{
     return API.PUT(`/api/ship/addressDis/${data.id}/${data.dis_use}`)
}
