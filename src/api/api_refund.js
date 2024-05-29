import * as API from './'

// 获取校区名单
export async function getCampusList() {
    return API.GET('/api/getLoginUser?')
}