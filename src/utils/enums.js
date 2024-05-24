class Enum {
  constructor(map) {
    this.map = map;
    if (map instanceof Array) {
      map.forEach(item => {
        if (!item.name) {
          return;
        }
        this[item.name] = item.key;
      });
    }
  }

  getOptions() {
    let options = [];
    if (this.map instanceof Array) {
      this.map.forEach(item => {
        if (item.show === false) return;
        options.push({
          key: item.key.toString(),
          value: item.value,
        });
      });
    } else {
      for (let key in this.map) {
        options.push({
          key: key,
          value: this.map[key],
        });
      }
    }
    return options;
  }

  getValue(key) {
    if (this.map instanceof Array) {
      for (const i of this.map) {
        if (i.key == key) {
          return i.value;
        }
      }
      return undefined;
    } else {
      return this.map[key];
    }
  }

  setValue(key, value, show = undefined) {
    if (this.map instanceof Array) {
      const result = this.map.find(i => i.key == key);
      if (result) {
        result.value = value;
        result.show = show;
      } else {
        this.map.push({ key, value, show });
      }
    } else {
      this.map[key] = value;
    }
  }

  setShow(key, show) {
    // 只处理数组格式的
    if (this.map instanceof Array) {
      const result = this.map.find(i => i.key == key);
      if (result) {
        result.show = show;
      }
    }
  }
}

export const tempTypes = new Enum([
  { key: 1, value: "待审批" },
  { key: 2, value: "待打款" },
  { key: 3, value: "已拒绝" },
  { key: 4, value: "已打款" },
  { key: 5, value: "已撤回" },
]);

export const CourseTypes = new Enum([
  { key: 1, value: "计费约课" },
  { key: 2, value: "大班" },
  { key: 15, value: "分组" },
  { key: 3, value: "小班" },
  { key: 4, value: "公开课" },
  { key: 5, value: "点播课" },
  { key: 7, value: "面授" },
  { key: 10, value: "图文课" },
  { key: 17, value: "一对一" },
  { key: 18, value: "一对多" },
  { key: 19, value: "班课" },
]);
export const periodsTypes = new Enum([
  { key: 1, value: "计费约课" },
  { key: 2, value: "大班课" },
  { key: 15, value: "分组课" },
  { key: 3, value: "小班课" },
  { key: 4, value: "公开课" },
  { key: 5, value: "点播课" },
  { key: 7, value: "面授课" },
  { key: 8, value: "音频课" },
  { key: 10, value: "图文课" },
]);
export const CourseType = new Enum([
  { key: 1, value: "普通课程" },
  { key: 2, value: "班级课程" },
  { key: 3, value: "公开课" },
]);
export const CourseSaleStatus = new Enum([
  { key: 1, value: "在售" },
  { key: 2, value: "已停售" },
]);
//服务状态
export const ServiceStatus = new Enum([
  { key: 1, value: "生效中" },
  { key: 2, value: "已过期" },
]);
export const CourseCreateStyle = new Enum([
  { key: 1, value: "本校创建" },
  { key: 2, value: "他校共享" },
]);

export const ShopType = new Enum([
  { key: 1, value: "普通课程" },
  { key: 2, value: "班级课程" },
  { key: 3, value: "公开课" },
  { key: 4, value: "一对一" },
  { key: 12, value: "实物商品" },
  { key: 11, value: "充值余额" },
  { key: 17, value: "课时包" },
  { key: 18, value: "打卡活动" },
  { key: 19, value: "班级" },
  { key: 20, value: "会员" },
  { key: 21, value: "套卷" },
  { key: 22, value: "电子书" },
]);

// 学员状态
export const StudentStatus = new Enum({
  0: "禁用",
  1: "启用",
});

export const CoursePublicStatus = new Enum({
  0: "不显示",
  1: "显示",
});

export const CourseSharingStyle = new Enum({
  1: "指定区域共享",
  2: "指定校区共享",
});

//移动端意见反馈状态
export const ReadStatus = new Enum({
  1: "已读",
  2: "未读",
});
// 导出任务类型
export const ExportTaskType = new Enum({
  1: "导出学员",
  2: "导出讲师",
  3: "导出订单",
  // 4: "导出会员",
  5: "导出助教",
  6: "导出退款单",
  7: "导出发货单",
  8: "导出收款单",
  9: "导出积分",
  10: "导出分销记录",
  11: "导出作答记录",
  13: "一对多班级",
  14: "一对一课次",
  17: "导出课程包订单",
  18: "班课排课记录",
  24: "导出课程",
  25: "导出班级学员",
  27: "导出会员",
  28: "导出学习统计",
  29: "导出学习统计",
  30: "导出学习记录",
  34: "一对多排课",
});

// 导出任务状态
export const ExportTaskStatus = new Enum({
  0: "待启动",
  1: "进行中",
  2: "已完成",
  3: "失败",
});

// 订单类型
export const OrderType = new Enum([
  { key: 0, value: "全部" },
  { key: 1, value: "普通订单" },
  { key: 2, value: "赠送订单" },
  { key: 3, value: "学习卡订单" },
  { key: 5, value: "拼团订单" },
  { key: 6, value: "积分订单" },
  { key: 7, value: "联报订单" },
  { key: 8, value: "课程包订单" },
]);

// 订单状态
export const OrderStatus = new Enum({
  1: "交易中",
  2: "交易完成",
  3: "交易关闭",
});

export const OrderMixStatus = new Enum([
  { key: 1, value: "待支付" },
  { key: 2, value: "拼团中" },
  { key: 4, value: "待发货" },
  { key: 5, value: "已发货" },
  { key: 3, value: "已完成" },
  { key: -1, value: "已关闭" },
  { key: 9, value: "退款申请中" },
  { key: 7, value: "退款中" },
  { key: 8, value: "退款失败" },
  { key: 10, value: "部分退款" },
  { key: 6, value: "退款成功" },
]);

// 上架时间
export const PutOnStutas = new Enum([
  { key: 1, value: "立即上架" },
  { key: 4, value: "定时上架" },
  { key: 3, value: "暂不上架" },
]);
// 订单商品类型
export const OrderShopType = new Enum([
  { key: 1, value: "普通课程" },
  { key: 2, value: "班级课程" },
  { key: 3, value: "公开课" },
  { key: 4, value: "一对一" },
  { key: 12, value: "实物商品" },
  { key: 11, value: "充值余额" },
  { key: 17, value: "课时包" },
  { key: 18, value: "打卡活动" },
  { key: 19, value: "班级" },
  { key: 20, value: "会员" },
  { key: 21, value: "套卷" },
  { key: 22, value: "电子书" },
]);

// 订单商品状态
export const OrderShopStatus = new Enum({
  1: "待支付",
  2: "已支付",
  3: "退款申请中",
  4: "退款中",
  5: "已退款",
  6: "退款失败",
  7: "退款拒绝",
  8: "部分退款",
  9: "待发货",
  10: "已发货",
  11: "确认发货",
  12: "订单取消",
});
// 拼团订单状态
export const GroupOrderStatus = new Enum({
  "-1": "已关闭",
  1: "待支付",
  2: "拼团中",
  4: "待发货",
  3: "已完成",
  5: "已发货",
  6: "退款成功",
  7: "退款中",
  8: "退款失败",
  9: "退款申请中",
  10: "部分退款",
});

// 支付状态
export const PayStatus = new Enum({
  1: "待支付",
  2: "已支付",
  3: "退款申请中",
  4: "退款中",
  5: "已退款",
  6: "退款失败",
});

// 发货状态
export const ShipStatus = new Enum({
  1: "待发货",
  2: "无需发货",
  3: "已发货",
  4: "已收货",
});

// 支付类型
export const PayType = new Enum({
  1: "微信",
  2: "支付宝",
  3: "虚拟币支付",
  // 4: '苹果支付',
  5: "学习卡兑换",
  6: "赠送",
  7: "优惠券支付",
  8: "线下支付",
  9: "积分兑换",
  10: "免费",
  // 11: "课时包",
});

// 学习情况
export const StudyStatus = new Enum({
  0: "未完成",
  1: "已完成",
});

// banner平台
export const BannerPlatform = new Enum({
  1: "PC",
  2: "安卓",
  3: "iOS",
  4: "H5",
  // 5: "小程序",
});

// 支付单状态
export const PaymentsStatus = new Enum({
  0: "准备发起支付",
  1: "支付成功",
  2: "支付失败",
  3: "取消",
});

// 退款单状态
export const RefundOrderStatus = new Enum({
  1: "待审批",
  2: "退款成功",
  3: "学员取消申请",
  4: "退款失败",
  5: "拒绝退款",
  6: "退款中",
});

// 退款状态
export const RefundStatus = new Enum({
  4: "退款中",
  5: "已退款",
  6: "退款失败",
});
// 考试管理退款状态
export const ExamRefundStatus = new Enum({
  2: "正常",
  5: "已退款",
});

// 退款来源
export const RefundSource = new Enum({
  1: "学员申请",
  2: "管理员发起",
  3: "系统退款",
});

// 退款方式
export const RefundType = new Enum({
  1: "线上退款",
  2: "线下退款",
});

export const MobileRecomment = new Enum({
  1: "课程",
  3: "讲师",
  5: "公开课",
  6: "资讯",
  7: "商品",
});

// 试卷类型
export const QuestionPaperType = new Enum({
  0: "固定卷",
  1: "随机卷",
});

// 启用状态
export const EnableStatus = new Enum({
  0: "禁用",
  1: "启用",
});

export const EnableExStatus = new Enum({
  1: "启用",
  2: "禁用",
});

export const EnableStopStatus = new Enum({
  1: "启用",
  2: "停用",
});

// 套卷状态
export const QuestionPaperPackageStatus = new Enum({
  1: "发布",
  2: "撤回",
});

// 难易度
export const DifficultLevel = new Enum({
  1: "较难",
  2: "难",
  3: "中",
  4: "易",
  5: "较易",
});

// 试题类型
export const QuestionType = new Enum([
  { key: 1, value: "单选题", name: "SingleSelect" },
  { key: 2, value: "判断题", name: "Judge" },
  { key: 3, value: "多选题", name: "MultiSelect" },
  { key: 4, value: "不定项选择题", name: "UndefinedTerm" },
  { key: 7, value: "填空题", name: "Completion" },
  { key: 5, value: "简答题", name: "ShortAnswer" },
  { key: 6, value: "材料题", name: "ReadingComprehension" },
]);

// 试题报错处理状态
export const TopicErrorState = new Enum({
  1: "未处理",
  2: "已处理",
  3: "没有问题",
});

export const TopicErrorType = new Enum({
  1: "题干错误",
  2: "选项错误",
  3: "答案错误",
  4: "解析错误",
});

export const ExamStatus = new Enum({
  1: "进行中",
  2: "未开始",
  3: "已结束",
});

export const ExamPaperStatus = new Enum({
  1: "已批阅",
  2: "待批阅",
  3: "已提交",
});

export const ExamPassStatus = new Enum({
  1: "通过",
  2: "未通过",
});

export const ExamReviewStatus = new Enum({
  1: "已批阅",
  2: "待批阅",
});

export const ExamTermValidity = new Enum({
  1: "有效",
  2: "无效",
});
export const ExamFinishCondition = new Enum({
  1: "已达成",
  2: "未达成",
});
// 属性值类型
export const AttrValType = new Enum({
  1: "单选",
  2: "多选",
  3: "单行文本",
  4: "多行文本",
  5: "地址",
  6: "身份证号",
  7: "日期",
  8: "时间段",
  9: "单图",
  10: "多图",
});

// 属性值是否必填
export const AttrValRequired = new Enum({
  1: "必填",
  2: "非必填",
});

// 审核状态
export const ApprovalStatus = new Enum({
  1: "审核中",
  2: "审核通过",
  3: "审核不通过",
});

// 班级类型
export const ClassType = new Enum({
  1: "普通班级",
  2: "精品小班",
});

export const ClassSource = new Enum({
  1: "课程分组",
  2: "班级分组",
});

// 班级状态
export const ClassState = new Enum({
  1: "未满员",
  2: "已满员",
});

// 学员信息订单状态
export const ClassOrderState = new Enum({
  2: "已购买",
  3: "已退单",
});

export const HomeworkType = new Enum({
  1: "课程作业",
  2: "课时作业",
});

// 作业报告状态
export const HomeworkReportStatus = new Enum({
  1: "待提交",
  2: "待批改",
  3: "已批改",
  4: "已过期",
  5: "已撤回",
});

export const HomeworkStatus = new Enum({
  1: "未发布",
  2: "已发布",
  3: "已作废",
});

export const GroupBookingStatus = new Enum({
  1: "进行中",
  2: "未开始",
  3: "已结束",
});

export const GroupStatus = new Enum({
  1: "已成团",
  2: "待成团",
  3: "拼团失败",
});

export const TerminalType = new Enum({
  1: "PC",
  2: "安卓",
  3: "iOS",
  4: "H5",
  5: "小程序",
  6: "微信内置H5",
  7: "IPAD",
  8: "管理端",
});

export const JoinFrom = new Enum({
  1: "凑团入口",
  2: "微信",
  3: "朋友圈",
  4: "QQ",
  5: "QQ空间",
  6: "微博",
  7: "图片分享",
});

// 作业试题类型
export const HomeworkQuestionType = new Enum({
  1: "单选题",
  2: "判断题",
  3: "多选题",
  4: "不定项",
  5: "简答题",
  6: "材料题",
  7: "填空题",
});

export const IntegralGoodsType = new Enum({
  1: "课程",
  2: "实物商品",
});

export const SexType = new Enum({
  0: "男",
  1: "女",
  3: "保密",
});

export const SexTypes = new Enum({
  0: "男",
  1: "女",
});

export const IntegralExchangeStatus = new Enum({
  1: "待发货",
  2: "已完成",
  3: "已发货",
});

// 业务状态
export const BusinessStatus = new Enum({
  1: "成功",
  2: "失败",
});

export const DistributeJoinStatus = new Enum({
  0: "不参与",
  1: "参与",
});

export const DistributeRank = new Enum({
  1: "初级分销员",
  2: "中级分销员",
  3: "高级分销员",
});

export const CourseBuyType = new Enum({
  1: "线上购买",
  2: "学习卡兑换",
  3: "线下购买",
});

export const ClientType = new Enum({
  0: "PC网页",
  1: "PC客户端",
  2: "H5",
  3: "iOS",
  4: "Android",
  5: "Mac客户端",
  6: "微信小程序",
});

export const VideoStatus = new Enum({
  10: "上传中",
  20: "转码中",
  30: "转码失败",
  31: "转码超时",
  32: "上传超时",
  100: "转码成功",
});

export const HomeworkReportState = new Enum({
  1: "已批改",
  2: "未提交",
});

export const StudyState = new Enum({
  1: "正常",
  2: "已过期",
});

export const OrgType = new Enum({
  1: "区域",
  2: "校区",
});

export const CoursewareType = new Enum({
  1: "普通文件",
  2: "动态文件",
  3: "音视频文件",
});

export const FloatButtonStatus = new Enum({
  1: "显示",
  0: "隐藏",
});

export const ScheduleType = new Enum({
  1: "一对一",
  2: "一对多",
  3: "班课",
});

export const SchedulePriceType = new Enum({
  1: "正价",
  2: "特价",
});

export const ScheduleHomeworkStatus = new Enum({
  1: "正常",
  2: "已撤回",
});

export const SignTypeStatus = new Enum({
  1: "未开始",
  2: "签约中",
  3: "已结束",
});

export const FloatButtonType = new Enum([
  { key: 2, value: "图片" },
  { key: 1, value: "文本" },
  { key: 3, value: "链接" },
  { key: 4, value: "客服" },
]);

export const OtoArrangeStatus = new Enum({
  1: "已确认",
  2: "待确认",
  3: "老师请假",
  4: "学员请假",
});

export const CurriculumStatus = new Enum({
  1: "已上课",
  2: "未上课",
  3: "上课中",
});
//约课记录约课状态
export const appointCourseStatus = new Enum({
  1: "待上课",
  2: "已上课",
  3: "已取消",
});
export const ArrangeType = new Enum([
  { key: 2, value: "线下面授" },
  { key: 1, value: "线上直播" },
]);

export const OtoClassType = new Enum([
  { key: 1, value: "线上直播" },
  { key: 2, value: "线下面授" },
]);

export const OtoType = new Enum([
  { key: 1, value: "一对一" },
  { key: 2, value: "一对多" },
]);

export const OtoArrangeType = new Enum([
  { key: 1, value: "自主约课" },
  { key: 2, value: "后台排课" },
]);

export const OtoNotesStatus = new Enum({
  1: "审核通过",
  2: "未上传",
  3: "待审核",
  4: "驳回",
});

export const OtoClassStatus = new Enum({
  1: "已开课",
  2: "未开课",
  3: "已结课",
});

export const OtoStudentStatus = new Enum({
  1: "上课",
  2: "请假",
  3: "未排",
});

export const OtoArrangeAttribute = new Enum({
  1: "正课",
  2: "加课",
  3: "调课",
});

export const ClassManageStatus = new Enum({
  1: "上课中",
  2: "未开课",
  3: "已结课",
  4: "未完成",
  5: "无效",
});

export const CurriculumDetailStatus = new Enum({
  1: "已开课",
  2: "未开课",
  3: "已结课",
  4: "未完成",
  5: "无效",
});

export const CurriculumAttendType = new Enum({
  0: "--",
  1: "人脸识别",
  2: "手动考勤",
  3: "缺勤",
  4: "请假",
  5: "直播间签到",
  6: "自动考勤",
  7: "课时票",
});

export const ClassTimeStudentStatus = new Enum({
  0: "未上课",
  1: "出勤",
  2: "请假",
  3: "旷课",
});

export const ClassTimeContentMastery = new Enum({
  1: "知道",
  2: "理解",
  3: "掌握",
  4: "运用",
});

// 合同类型
export const ContractType = new Enum({
  1: "购买合同",
  2: "赠送合同",
});

// 科目类型
export const SubjectType = new Enum({
  1: "购买",
  2: "赠送",
});

// 合同属性
export const ContractAttr = new Enum({
  1: "新签",
  2: "续签",
});

// 合同状态
export const ContractStatus = new Enum({
  1: "未执行",
  2: "执行中",
  3: "合同结束",
});

// 合同来源
export const ContractSource = new Enum({
  1: "后台创建",
  2: "学员自主下单",
});

// 合同审批状态
export const ContractAuditStatus = new Enum({
  1: "合同已创建，待提交",
  2: "等待添加付款记录",
  3: "已添加付款记录，待审批",
  // 4: "审批通过，等待设置业绩分配",
  // 5: "已设置业绩分配，待审批",
  6: "审批通过",
  7: "已取消",
});

// 合同退款状态
export const ContractRefundStatus = new Enum({
  1: "未退款",
  2: "退款申请中",
  3: "退款中",
  4: "退款失败",
  5: "退款成功",
  6: "部分退款",
  7: "拒绝退款",
});

export const ContractDonateType = new Enum({
  0: "常规赠送",
  1: "推荐转赠",
  2: "推荐赠送",
  3: "推荐被赠",
  4: "活动赠送",
  5: "校长赠送",
  6: "其他赠送",
});

export const DiscountDonateType = new Enum({
  1: "按本次购买课时数赠送",
  2: "无条件赠送",
});

export const DiscountCouponType = new Enum({
  1: "按本次签约金额满减",
  2: "无条件满减",
});

// 签约概率
export const SignPossibility = new Enum({
  1: "大",
  2: "中",
  3: "小",
  4: "无",
});

// 课时包状态
export const PeriodPackageStatus = new Enum({
  1: "正常",
  2: "不可签约",
  3: "不可排课",
  4: "不可签约不可排课",
});

// 上课方式
export const PeriodPackageTeachingStatus = new Enum({
  1: "线上直播",
  2: "线下面授",
});

// 课时包是否推荐
export const PeriodPackageIsRecommend = new Enum({
  1: "是",
  2: "否",
});

//是否绑定微信
export const weChatBinding = new Enum({
  1: "是",
  0: "否",
});

export const YesNo = new Enum({
  1: "是",
  2: "否",
});

export const YesNoExt = new Enum({
  1: "是",
  0: "否",
});

export const ContractSubjectAttr = new Enum({
  1: "新科",
  2: "续科",
});

export const ContractStudyStatus = new Enum({
  1: "未开课",
  2: "已开课",
  3: "已结课",
  4: "已退款",
});

// 付款类型
export const ContractPayStyle = new Enum({
  1: "合同款",
  2: "首款",
  3: "尾款",
});

// 线索来源
export const ClueSource = new Enum({
  1: "自主注册",
  2: "跨校区下单",
  3: "后台创建",
  4: "批量导入",
});

// 评价标签关联维度
export const EvaluateLatitude = new Enum({
  1: "校园环境",
  2: "教学满意度",
  3: "服务满意度",
});

// 上架状态
export const ShelfStatus = new Enum({
  1: "已上架",
  2: "已下架",
  3: "待上架",
});

export const CrmPlatformType = new Enum({
  1: "飞鱼CRM",
  2: "百度营销通",
});

export const CrmClueRegisterStatus = new Enum({
  1: "已注册",
  2: "未注册",
});

export const CrmClueSource = new Enum([
  { key: 1, value: "自主注册" },
  { key: 2, value: "跨校区下单" },
  { key: 3, value: "后台创建" },
  { key: 4, value: "批量导入" },
]);

export const CrmLandingStatus = new Enum({
  1: "未开始",
  2: "进行中",
  3: "已结束",
});

export const CrmDealRate = new Enum({
  1: "大",
  2: "中",
  3: "小",
  4: "无",
});

export const CrmVisitStatus = new Enum({
  1: "待上门",
  2: "上门",
  3: "未上门",
  4: "取消预约",
});

export const CrmAuditionShopType = new Enum({
  1: "普通课程",
  2: "班级课程",
  3: "公开课",
  4: "计费约课",
  31: "一对一排课",
  32: "班课排课",
});

export const CrmAuditionStatus = new Enum({
  1: "已试听",
  2: "未试听",
  3: "待试听",
  4: "已取消",
});

export const CrmClueCreatedType = new Enum({
  1: "自主注册",
  2: "录入",
  3: "批量导入",
  4: "飞鱼CRM同步",
  5: "营销通同步",
});

export const CrmAdvSyncStatus = new Enum({
  1: "成功",
  2: "失败",
});

export const CrmSeatAllotStatus = new Enum({
  1: "已分配",
  2: "未分配",
});

export const CrmSeatStatus = new Enum({
  1: "在线",
  2: "离线",
});

export const CrmSeatCallStatus = new Enum({
  1: "通话中",
  2: "未通话",
});

export const CrmNumberStatus = new Enum({
  1: "已分配",
  2: "未分配",
});

export const CrmNumberType = new Enum({
  1: "手机号",
  2: "固定电话",
  3: "非固定95号",
  4: "固定95外显",
  5: "101号码",
});

export const CrmNumberCallStatus = new Enum({
  1: "通话中",
  2: "未通话",
});

export const CrmNumberPhoneStatus = new Enum({
  1: "正常",
  2: "封号",
  3: "美洽提供",
});

export const CrmCallType = new Enum({
  1: "呼出",
  2: "呼入",
});

export const CrmCallStatus = new Enum({
  1: "主叫未接",
  2: "被叫未接",
  3: "双方接听",
});

export const CrmSipType = new Enum({
  1: "纯外呼",
  2: "外呼+呼入",
});

export const ClockInActivityType = new Enum({
  1: "免费",
  2: "付费",
});

export const ClockInActivityStatus = new Enum({
  0: "未开始",
  1: "进行中",
  2: "已结束",
  3: "已取消",
});

export const ShipType = new Enum({
  1: "自行发货",
  2: "上门揽收",
});

export const LogisticsStatus = new Enum({
  1: "待发货",
  2: "部分发货",
  3: "已发货",
  4: "已签收",
  5: "已取消",
  6: "待揽收",
  20: "已接单",
  21: "收件中",
  22: "改派",
  7: "快递员修改订单信息",
  10: "已取件",
  15: "已结算",
  99: "订单已取消",
  101: "运输中",
});

// 证书状态
export const CertificateStatus = new Enum({
  1: "已发布",
  2: "待发布",
  3: "已关闭",
});

// 证书来源
export const CertificateSource = new Enum({
  1: "完成学习",
  2: "手动颁发",
});

// 课程单卖状态
export const CourseSellStatus = new Enum({
  0: "允许单卖",
  1: "禁止单卖",
});

// 班级课程是否绑定
export const CourseBindOrNot = new Enum({
  0: "否",
  1: "是",
});
// 课程展示状态
export const CourseDisplayStatus = new Enum({
  0: "显示",
  1: "隐藏",
});

// 展示状态
export const DisplayStatus = new Enum({
  1: "展示",
  2: "隐藏",
});
//分班计划
export const DivideStatus = new Enum({
  1: "单个班级",
  2: "多个班级",
});
// 开启状态
export const OpenStatus = new Enum({
  1: "开启",
  2: "关闭",
});
export const OpenStatusExt = new Enum([
  {
    key: "1",
    value: "开启",
  },
  {
    key: "0",
    value: "关闭",
  },
]);
// 讲义状态
export const NotesStatus = new Enum({
  1: "已上传",
  2: "未上传",
});
// 班级请假状态
export const ClassesLeaveStatus = new Enum({
  1: "待审批",
  2: "已同意",
  3: "已驳回",
  4: "取消请假",
  5: "取消到课",
});
// 课程课时状态
export const CoursePeriodsStatus = new Enum({
  1: "未上课",
  2: "上课中",
  3: "已上课",
});
// 公立校班级状态
export const ClassesStatus = new Enum({
  1: "上课中",
  2: "已结业",
});
// 公立校班级学员状态
export const ClassesStudentStatus = new Enum({
  1: "在班",
  2: "退班审核中",
  3: "退班",
});
// 公立校班级学员报名方式
export const ClassesJoinType = new Enum({
  1: "线上购买",
  2: "线下报名",
  3: "调班",
});
// 公立校班级学员到课情况
export const ClassesOpStatus = new Enum({
  0: "到课",
  1: "申请请假中",
  2: "请假",
  5: "旷课",
});
//会员等级
export const VipLevelType = new Enum({
  2: "月",
  3: "季度",
  // 4: "半年",
  5: "年",
});
//会员获取途径
export const VipGetType = new Enum({
  1: "前台购买",
  2: "后台添加",
  3: "会员特权",
});
//考试发布状态
export const PublishStatus = new Enum({
  1: "未发布",
  2: "已发布",
  3: "已下架",
});
//学员状态
export const StudentPeriodStatus = new Enum({
  1: "正常",
  2: "过期",
});
//班会状态
export const MeetingStatus = new Enum({
  1: "未开始",
  2: "进行中",
  3: "已结束",
});
//班会参与情况
export const JoinMeetingStatus = new Enum({
  0: "缺勤",
  1: "参与",
});
//使用场景
export const UseSceneStatus = new Enum({
  1: "常规售卖",
  2: "班级专属",
});
//来源
export const SourceStatus = new Enum({
  1: "普通课程",
  2: "班级",
  3: "会员免费",
});

// 举报原因
export const PlaintReason = new Enum({
  1: "政治敏感",
  2: "色情低俗",
  3: "垃圾营销",
  4: "违法信息",
  5: "有害信息",
  6: "诈骗信息",
  7: "侵害未成年权益",
  8: "内容抄袭",
  9: "其他",
});

// 举报状态
export const PlaintStatus = new Enum({
  0: "待处理",
  1: "已处理",
  2: "暂不处理",
});

// 联报优惠活动状态
export const DiscountActivityStatus = new Enum({
  0: "未开始",
  1: "已上架",
  2: "已下架",
  3: "已开始",
  4: "已结束",
});

//设备类型
export const EquipmentType = new Enum({
  1: "iOS",
  2: "安卓",
});

//app版本状态
export const AppVersionStatus = new Enum({
  1: "正常",
  2: "已撤回",
});

//app下载设置
export const AppDownloadSet = new Enum({
  1: "手动更新",
  2: "强制更新",
});
// 优惠券使用商品类型 1课程 2图书 3文库 4一对一 5班级 6电子书
export const CouponGoodsType = new Enum({
  1: "课程",
  2: "实物商品",
  3: "文库",
  4: "约课",
  5: "班级",
  6: "电子书",
});
export const msgStatus = new Enum([
  { key: 1, value: "成功" },
  { key: 2, value: "失败" },
]);
