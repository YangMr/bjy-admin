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