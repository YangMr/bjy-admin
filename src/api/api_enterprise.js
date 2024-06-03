/**
 * Created by yqr on 2018/4/13.
 */
import * as API from './'

export default {
  //查询列表
  findList: params => {
    return API.GET('/json', params)
  },
  findById: id => {
    return API.GET(`/api/enterprise/list/${id}`)
  },
  userList: params => {
    return API.GET(`/api/role`, params)
  },
  userDelete: params => {
    return API.DELETE(`/api/role/${params}`, params)
  },
  userAddlist: params => {
    return API.GET(`/api/roleInfo?`, params)
  },
  userAdd: params => {
    return API.POST(`/api/role`, params)
  },
  userUp: id => {
    return API.GET(`/api/role/`+id)
  },
  userUpdata: params => {
    return API.PUT(`/api/role/`+params.id, params)
  }
 


}
