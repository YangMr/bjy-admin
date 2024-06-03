// 课程设置 接口
import * as API from './'


 

export default {
    // 获取课程设置   /api/config/course_setting?
    getCourseSetting:  ()=> {
        return API.GET('/api/config/course_setting?',)
    },
    // 修改设置 接口  /api/config/course_setting
    editCourseSetting: dataSet => {
        return API.POST('/api/config/course_setting', dataSet)
    }
}