import * as API from './'

// 获取校区名单
export async function getCampusList() {
    return API.GET('/api/getLoginUser?')
}

// 获取退款单列表
export async function getRefundList(params) {
    return API.GET('/api/orderRefund?', params)
}

// 批量导出
export async function batchExport(data) {
    return API.POST('/api/export/task', data)
}

// 处理退款
export async function handleRefund(id) {
    return API.GET(`/api/refund/detail/${id}?`)
}

// 拒绝退款
export async function refuseRefund(data) {
    return API.POST('/api/refund/auditing', data)
}

// 同意退款
export async function agreeRefund(data) {
    return API.POST('/api/refund/doAudit', data)
}

// 查看导出
export async function getExportList(params) {
    return API.GET('/api/export/task?', params)
}

// 删除导出任务
export async function deleteExport(id) {
    return API.DELETE(`/api/export/task/${id}`)
}