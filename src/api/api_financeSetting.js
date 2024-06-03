// 订单设置 接口
import * as API from './'

export default {
    // 获取订单设置 api/config/order_setting?
    getFinanceSetting: () => {
        return API.GET('/api/config/order_setting?')
    },
    
    // 修改设置 /api/config/order_setting   /api/config/order_setting
    updateFinanceSetting: (data) => {
        return API.POST('/api/config/order_setting', data)
    }
}