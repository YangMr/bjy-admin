import * as API from './'

// 列表渲染
export const getPaymentsList = (data) => {
  return API.GET('/api/orderPayments', data)
}
export const getExportList = (data) => {
  return API.GET('/api/export/task', data)
}
export const getExportAdd = (data) => {
  return API.POST('/api/export/task',data)
}
export const getExPortDel = (id) => {
  return API.DELETE(`/api/export/task/${id}`)
}
