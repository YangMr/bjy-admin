import * as API from "./";

// 获取账单列表
export const getBillsList = (params) => {
  return API.GET("/api/ship/index", params);
};

// 添加导出
export const getTasklist = (params) => {
  return API.POST("/api/export/task", params);
};

// 渲染导出数据
export const addTasklist = (params) => {
  return API.GET("/api/export/task", params);
};

// 删除导出数据
export const delTasklist = (id) => {
  return API.DELETE(`/api/export/task/${id}`);
};
