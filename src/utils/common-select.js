const selects = {
  // 排课科目列表
  subject: {
    select_id: "id",
    select_name: "sub_name",
    url: "/api/subject",
  },

  // 排课学期列表
  quarter: {
    select_id: "id",
    select_name: "name",
    url: "/api/settingQuarter/list",
  },

  // 教室
  classRoom: {
    select_id: "id",
    select_name: "class_name",
    url: "/api/class",
  },

  // 年级
  grade: {
    select_id: "id",
    select_name: "name",
    url: "/api/globalSetting/grade",
  },

  // 课程分类
  courseClassify: {
    select_id: "id",
    select_name: "classify_name",
    url: "/api/globalSetting/classify",
  },

  // 讲师
  teacher: {
    select_id: "id",
    select_name: "real_name",
    url: "/api/teacher",
  },

  // 助教
  assist: {
    select_id: "id",
    select_name: "real_name",
    url: "/api/assistant",
  },

  // 签约类型
  signType: {
    select_id: "id",
    select_name: "name",
    url: "/api/signType/list",
  },

  // 课表
  timeTable: {
    select_id: "id",
    select_name: "time_name",
    url: "/api/timeTable/list?is_allow_schedule=1",
  },

  // 角色
  role: {
    select_id: "role_id",
    select_name: "role_name",
    url: "/api/role",
  },

  // 课程包分类
  coursePackage: {
    select_id: "id",
    select_name: "classify_name",
    url: "/api/packageCourseClassify/list",
  },

  // 证书模板分类
  certificateTemplateClassify: {
    select_id: "id",
    select_name: "name",
    url: "/api/certClassify",
  },

  // 分销员等级
  distributeLevel: {
    select_id: "id",
    select_name: "level_name",
    url: "/api/distribute/commission/level",
  },

  //会员等级
  vipLevel: {
    select_id: "id",
    select_name: "name",
    url: "/api/vip/basis",
  },
};

export default selects;
