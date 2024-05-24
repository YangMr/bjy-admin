export default {
  // 流程类型
  flowType: {
    url: "/api/approve",
    nameKey: "name",
    idKey: "id",
  },

  // 活动类型
  activityType: {
    url: "/api/attribute/flag/activity_type",
    nameKey: "name",
    idKey: "id",
  },
  // 直属上级
  leader: {
    url: "/api/user",
    nameKey: "nickname",
    idKey: "id",
  },
  // 角色
  roleType: {
    url: "/api/role",
    nameKey: "role_name",
    idKey: "id",
  },
  // 用户组
  groupType: {
    url: "/api/group",
    nameKey: "group_name",
    idKey: "id",
  },
  povinceType: {
    //省
    url: "/api/sonArea/0",
    nameKey: "area_name",
    idKey: "id",
  },
  // 客户意向
  account_intention: {
    url: "/api/attribute/flag/account_intention",
    nameKey: "name",
    idKey: "id",
  },
  // 客户业务类型
  account_business_type: {
    url: "/api/attribute/flag/account_business_type",
    nameKey: "name",
    idKey: "id",
  },
  // 客户来源
  account_source: {
    url: "/api/attribute/flag/lead_source",
    nameKey: "name",
    idKey: "id",
  },
  // 客户行业细分
  industry_segmentation: {
    url: "/api/account/industrylevelfield/3",
    nameKey: "name",
    idKey: "id",
  },
  // 线索来源
  lead_source: {
    url: "/api/attribute/flag/lead_source",
    nameKey: "name",
    idKey: "id",
  },
  // 线索公海
  lead_group: {
    url: "/api/accountGroup",
    nameKey: "group_name",
    idKey: "id",
  },
  // 产品标签
  product_label: {
    url: "/api/attribute/flag/product_label",
    nameKey: "name",
    idKey: "id",
  },
  // 意向程度
  lead_intention: {
    url: "/api/attribute/flag/lead_intention",
    nameKey: "name",
    idKey: "id",
  },
  //联系人角色
  contact_role: {
    url: "/api/attribute/flag/contact_role",
    nameKey: "name",
    idKey: "id",
  },
  //联系人态度
  contact_attitude: {
    url: "/api/attribute/flag/contact_attitude",
    nameKey: "name",
    idKey: "id",
  },
  //产品线
  product_direction: {
    url: "/api/attribute/flag/product_direction",
    nameKey: "name",
    idKey: "id",
  },
  //税率
  tax_rate: {
    url: "/api/attribute/flag/tax_rate",
    nameKey: "name",
    idKey: "id",
  },
  //订单产品类型
  productType: {
    url: `/api/config/approve_node?module=5&type=order_product_type`,
    nameKey: "name",
    idKey: "id",
  },
  //签约类型
  signType: {
    url: "/api/attribute/flag/sign_type",
    nameKey: "name",
    idKey: "id",
  },
  //订单类型
  orderType: {
    url: "/api/config/approve_node?module=5&type=order_type",
    nameKey: "name",
    idKey: "id",
  },
  //主体
  main_body: {
    url: "/api/attribute/flag/bjy_main_body",
    nameKey: "name",
    idKey: "id",
  },
  //收款方式
  payment_method: {
    url: "/api/attribute/flag/payment_method",
    nameKey: "name",
    idKey: "id",
  },
  //需求影响程度
  demand_effect: {
    url: "/api/attribute/flag/demand_effect",
    nameKey: "name",
    idKey: "id",
  },
  //需求工单状态
  demand_status: {
    url: "/api/attribute/flag/demand_status",
    nameKey: "name",
    idKey: "id",
  },
  //业务类型
  businessType: {
    url: "/api/accountadjust/business_type",
    nameKey: "name",
    idKey: "id",
  },
  //申请类型
  applyType: {
    url: "/api/accountadjust/apply_type/0",
    nameKey: "name",
    idKey: "id",
  },
  //市场活动
  relate_market: {
    url: "/api/market",
    nameKey: "apply_name",
    idKey: "id",
  },
};
