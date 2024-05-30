import * as API from './'

export const getMobileShareListApi=(params)=>{
    return API.GET('/api/shareSetting',params)
}

export const mobileShareDeleteApi=(id)=>{
    return API.DELETE('/api/shareSetting/'+id)
}

export const AddListApi=(params)=>{
    return API.POST('/api/shareSetting',params);
}