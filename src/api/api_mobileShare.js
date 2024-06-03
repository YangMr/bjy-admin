import * as API from './'

export const getMobileShareListApi=(params)=>{
    return API.GET('/api/shareSetting',params)
}
// action="https:devwx.baijiayun.com/api/public/img"
//  :headers="{ Authorization: 'Bearer ' + token }"
export const getImgApi=()=>{
  return API.POST('/api/public/img')
}

export const mobileShareDeleteApi=(id)=>{
    return API.DELETE('/api/shareSetting/'+id)
}

export const AddListApi=(params)=>{
    return API.POST('/api/shareSetting',params);
}

export const UpdateListApi=(id,params)=>{
  return API.PUT('/api/shareSetting/'+id,params);
}
