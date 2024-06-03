import Vue from "vue";
import Router from "vue-router";
import LeftNav from "@/components/nav/leftNav.vue";
import Home from "@/views/home.vue";
import Dashboard from "@/views/workbench/dashboard.vue";
import Mission from "@/views/workbench/mission/mission.vue";
import Plan from "@/views/workbench/plan.vue";
import Maillist from "@/views/workbench/maillist.vue";
import EnterpriseList from "@/views/enterprise/index.vue";
import EnterpriseAdd from "@/views/enterprise/add.vue";
import EnterpriseDetail from "@/views/enterprise/detail.vue";
import EnterpriseValidate from "@/views/enterprise/validate.vue";
import VehicleManage from "@/views/vehicle/index.vue";
import DeptManager from "@/views/dept/index.vue";
import NotFound from "@/components/404.vue";

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = (resolve) => require(["@/views/login"], resolve);
Vue.use(Router);
let router = new Router({
  mode: "history",
  base: "adminstyle",
  routes: [
    {
      path: "/login",
      type: "login",
      name: "Login",
      component: Login,
    },
    {
      path: "*",
      component: NotFound,
    },
    {
      path: "/index",
      component: () => import("@/views/home.vue"),
      meta: {
        title: "首页",
      },
    },
    {
      path: "/",
      title: "首页",
      name: "index", // 当前路由的name
      type: "home", // 根据type区分不同模块（顶部导航）
      menuShow: true,
      component: () => import("@/views/home.vue"),
      meta: {
        title: "首页",
      },
    },
    {
      path: "/user",
      name: "User", // 根据name区分不同子模块（左侧导航）
      redirect: "/user/student",
      type: "user",
      title: "用户",
      component: Home,
      menuShow: true,
      children: [
        {
          path: "/user/student",
          component: LeftNav,
          name: "Student", // 当前路由的name
          iconCls: "iconfont icon-home", // 图标样式class
          menuShow: true,
          children: [
            {
              path: "/user/student",
              component: () => import("@/views/user/student/index.vue"),
              title: "学员管理",
              menuShow: true,
            },
          ],
        },
        {
          path: "/user/teacher",
          component: LeftNav,
          name: "mySet", // 当前路由的name
          iconCls: "iconfont icon-home", // 图标样式class
          menuShow: true,
          children: [
            {
              path: "/user/teacher",
              component: () => import("@/views/user/teacher/index.vue"),
              title: "讲师管理",
              menuShow: true,
            },
          ],
        },
        {
          path: "/user/assist",
          component: LeftNav,
          name: "mySet", // 当前路由的name
          iconCls: "iconfont icon-home", // 图标样式class
          menuShow: true,
          children: [
            {
              path: "/user/assist",
              component: () => import("@/views/user/assist/index.vue"),
              title: "助教管理",
              menuShow: true,
            },
          ],
        },
        {
          path: "/user/role",
          component: LeftNav,
          name: "mySet", // 当前路由的name
          iconCls: "iconfont icon-home", // 图标样式class
          menuShow: true,
          children: [
            {
              path: "/user/role",
              component: () => import("@/views/user/role/index.vue"),
              title: "后台角色管理",
              menuShow: true,
            },
          ],
        },
        {
          path: "/user/account",
          component: LeftNav,
          name: "mySet", // 当前路由的name
          iconCls: "iconfont icon-home", // 图标样式class
          menuShow: true,
          children: [
            {
              path: "/user/account",
              component: () => import("@/views/user/account/index.vue"),
              title: "后台用户管理",
              menuShow: true,
            },
          ],
        },
      ],
    },

    {
      path: "/finance",
      name: "Finance", // 根据name区分不同子模块（左侧导航）
      redirect: "/finance/order/manage",
      type: "finance",
      title: "财务",
      component: Home,
      menuShow: true,
      children: [
        {
          path: "/finance/order",
          component: LeftNav,
          redirect: "/finance/order/manage",
          name: "Order", // 当前路由的name
          iconCls: "iconfont icon-home", // 图标样式class
          menuShow: true,
          title: "订单管理",
          children: [
            {
              path: "/finance/order/manage",
              component: () => import("@/views/finance/order/manage/index.vue"),
              title: "订单管理",
              menuShow: true,
            },
            {
              path: "/finance/bills/payments",
              component: () =>
                import("@/views/finance/bills/payments/index.vue"),
              title: "收款单",
              menuShow: true,
            },
            {
              path: "/finance/bills/ship",
              component: () => import("@/views/finance/bills/ship/index.vue"),
              title: "发货单",
              menuShow: true,
            },
            {
              path: "/finance/bills/refund",
              component: () => import("@/views/finance/bills/refund/index.vue"),
              title: "退款审批",
              menuShow: true,
              meta: {
                title: "退款审批",
              }
            },
            {
              path: "/exports",
              component: () => import("@/views/finance/bills/refund/exports.vue"),
              title: "查看导出",
              menuShow: false,
              meta: {
                title: "查看导出",
              },
            },
            {
              path: "/finance/order/address",
              component: () =>
                import("@/views/finance/order/address/index.vue"),
              title: "发货地址",
              menuShow: true,
            },
            {
              path: "/finance/order/setting",
              component: () =>
                import("@/views/finance/order/setting/index.vue"),
              title: "订单设置",
              menuShow: true,
            },
          ],
        },
        {
          path: "/finance/vcurrency",
          component: LeftNav,
          redirect: "/finance/vcurrency/record",
          name: "Vcurrency", // 当前路由的name
          iconCls: "iconfont icon-home", // 图标样式class
          menuShow: true,
          title: "金币管理",
          children: [
            {
              path: "/finance/vcurrency/record",
              component: () =>
                import("@/views/finance/vcurrency/record/index.vue"),
              title: "金币充值记录",
              menuShow: true,
            },
            {
              path: "/finance/vcurrency/balance",
              component: () =>
                import("@/views/finance/vcurrency/balance/index.vue"),
              title: "金币余额管理",
              menuShow: true,
            },
          ],
        },
      ],
    },
    {
      path: "/course",
      name: "Course", // 根据name区分不同子模块（左侧导航）
      redirect: "/course/manage",
      type: "course",
      title: "教学",
      component: Home,
      menuShow: true,
      children: [
        {
          path: "/course/manage",
          component: LeftNav,
          redirect: "/course/manage",
          name: "CourseManage", // 当前路由的name
          iconCls: "iconfont icon-home", // 图标样式class
          menuShow: true,
          title: "课程管理",
          children: [
            {
              path: "/course/manage",
              component: () => import("@/views/course/manage/index.vue"),
              title: "课程管理",
              menuShow: true,
            },
            {
              path: "/course/open-course",
              component: () => import("@/views/course/open-course/index.vue"),
              title: "公开课管理",
              menuShow: true,
            },
            {
              path: "/course/sharing",
              component: () => import("@/views/course/sharing/index.vue"),
              title: "课程共享管理",
              menuShow: true,
            },
            {
              path: "/course/catagory",
              component: () => import("@/views/course/catagory/index.vue"),
              title: "课程分类",
              menuShow: true,
            },
            {
              path: "/course/mobile-share",
              component: () => import("@/views/course/mobile-share/index.vue"),
              title: "课程分享海报",
              menuShow: true,
            },
            {
              path: "/course/service-tag",
              component: () => import("@/views/course/service-tag/index.vue"),
              title: "课程服务标签",
              menuShow: true,
            },
            {
              path: "/course/setting",
              component: () => import("@/views/course/setting/index.vue"),
              title: "课程设置",
              menuShow: true,
            },
          ],
        },
        // {
        //   path: "/finance/vcurrency",
        //   component: LeftNav,
        //   redirect: "/finance/vcurrency/record",
        //   name: "Vcurrency", // 当前路由的name
        //   iconCls: "iconfont icon-home", // 图标样式class
        //   menuShow: true,
        //   title: "金币管理",
        //   children: [
        //     {
        //       path: "/finance/vcurrency/record",
        //       component: () =>
        //         import("@/views/finance/vcurrency/record/index.vue"),
        //       title: "金币充值记录",
        //       menuShow: true,
        //     },
        //     {
        //       path: "/finance/vcurrency/balance",
        //       component: () =>
        //         import("@/views/finance/vcurrency/balance/index.vue"),
        //       title: "金币余额管理",
        //       menuShow: true,
        //     },
        //   ],
        // },
      ],
    },
    // {
    //   path: "/dashboardManager",
    //   name: "dashboard", // 根据name区分不同子模块（左侧导航）
    //   redirect: "/dashboard/plan",
    //   type: "dashboard",
    //   title: "工作台",
    //   component: Home,
    //   menuShow: true,
    //   children: [
    //     {
    //       path: "/dashboard/plan",
    //       component: LeftNav,
    //       title: "我的设置",
    //       iconCls: "el-icon-menu",
    //       menuShow: true,
    //       children: [
    //         {
    //           path: "/dashboard/plan",
    //           component: Plan,
    //           title: "行程计划",
    //           menuShow: true,
    //         },
    //         {
    //           path: "/dashboard/mission",
    //           component: Mission,
    //           title: "我的任务",
    //           menuShow: true,
    //         },
    //         {
    //           path: "/dashboard/maillist",
    //           component: Maillist,
    //           title: "通讯录",
    //           menuShow: true,
    //         },
    //       ],
    //     },
    //     {
    //       path: "/dashboard/mySet",
    //       component: LeftNav,
    //       name: "mySet", // 当前路由的name
    //       iconCls: "iconfont icon-home", // 图标样式class
    //       menuShow: true,
    //       children: [
    //         {
    //           path: "/dashboard/mySet",
    //           component: Dashboard,
    //           title: "首页",
    //           menuShow: true,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   path: "/enterpriseManager",
    //   type: "enterprise",
    //   name: "enterprise",
    //   title: "企业管理",
    //   component: Home,
    //   redirect: "/enterprise/list",
    //   menuShow: true,
    //   children: [
    //     {
    //       path: "/enterprise/list",
    //       component: LeftNav,
    //       name: "enterpriseList",
    //       title: "企业数据",
    //       iconCls: "iconfont icon-home", // 图标样式class
    //       menuShow: true,
    //       children: [
    //         {
    //           path: "/enterprise/list",
    //           component: EnterpriseList,
    //           title: "企业列表",
    //           name: "abcde3",
    //           menuShow: true,
    //         },
    //         {
    //           path: "/enterprise/detail",
    //           component: EnterpriseDetail,
    //           title: "企业详情",
    //           name: "abcde4",
    //           menuShow: false,
    //         },
    //       ],
    //     },
    //     {
    //       path: "/enterprise/add",
    //       component: LeftNav,
    //       name: "enterpriseAdd",
    //       iconCls: "el-icon-menu",
    //       menuShow: true,
    //       children: [
    //         {
    //           path: "/enterprise/add",
    //           component: EnterpriseAdd,
    //           title: "企业添加",
    //           name: "abcde",
    //           menuShow: true,
    //         },
    //       ],
    //     },
    //     {
    //       path: "/enterprise/validate",
    //       component: LeftNav,
    //       name: "enterpriseValidate",
    //       iconCls: "el-icon-menu",
    //       menuShow: true,
    //       children: [
    //         {
    //           path: "/enterprise/validate",
    //           component: EnterpriseValidate,
    //           title: "企业认证",
    //           name: "ddfff",
    //           menuShow: true,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   path: "/vehicleManager",
    //   type: "vehicle",
    //   name: "vehicle",
    //   title: "车辆信息",
    //   component: Home,
    //   redirect: "/vehicle/list",
    //   menuShow: true,
    //   children: [
    //     {
    //       path: "/vehicle/list",
    //       component: LeftNav,
    //       name: "vehicleList",
    //       iconCls: "iconfont icon-home", // 图标样式class
    //       menuShow: true,
    //       children: [
    //         {
    //           path: "/vehicle/list",
    //           component: VehicleManage,
    //           title: "车辆信息",
    //           name: "aaaabcde",
    //           menuShow: true,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   path: "/deptManager",
    //   type: "Question",
    //   name: "Question",
    //   title: "题库",
    //   component: Home,
    //   redirect: "/question/list",
    //   menuShow: true,
    //   children: [
    //     {
    //       path: "/question",
    //       component: LeftNav,
    //       redirect: "/question/list",
    //       name: "QuestionList",
    //       iconCls: "iconfont icon-home", // 图标样式class
    //       menuShow: true,
    //       children: [
    //         {
    //           path: "/question/list",
    //           component: DeptManager,
    //           title: "题库管理",
    //           name: "QuestionBankManageWrap",
    //           menuShow: true,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   path: "/financeManager",
    //   type: "finance", // 根据type区分不同模块（顶部导航）
    //   name: "finance", // 根据name区分不同子模块（左侧导航）
    //   title: "财务",
    //   redirect: "/finance/aaaaa",
    //   component: Home,
    //   menuShow: true,
    //   children: [
    //     {
    //       path: "/finance/aaaaa",
    //       component: LeftNav,
    //       title: "订单管理",
    //       name: "dingdanguanli",
    //       iconCls: "el-icon-menu",
    //       menuShow: true,
    //       children: [
    //         {
    //           path: "/finance/aaaaa",
    //           component: Plan,
    //           title: "订单管理",
    //           name: "Order",
    //           menuShow: true,
    //         },
    //         {
    //           path: "/finance/bbbbbb",
    //           component: Mission,
    //           title: "收款单",
    //           name: "BillsPaymentsList",
    //           menuShow: true,
    //         },
    //         {
    //           path: "/finance/cccccc",
    //           component: Maillist,
    //           title: "发货单",
    //           name: "BillsShipList",
    //           menuShow: true,
    //         },
    //       ],
    //     },
    //     {
    //       path: "/finance/dddddd",
    //       component: LeftNav,
    //       title: "金币管理", // 当前路由的name
    //       name: "jinbiguanli",
    //       iconCls: "iconfont icon-home", // 图标样式class
    //       menuShow: true,
    //       children: [
    //         {
    //           path: "/finance/dddddd",
    //           component: VehicleManage,
    //           title: "金币管理",
    //           name: "CurrencyManage",
    //           menuShow: true,
    //         },
    //       ],
    //     },
    //   ],
    // },

    {
      path: "/systemManager",
      type: "system", // 根据type区分不同模块（顶部导航）
      name: "system", // 根据name区分不同子模块（左侧导航）
      title: "系统管理",
      redirect: "/system/bbbbbb",
      component: Home,
      menuShow: true,
      children: [
        {
          path: "/system",
          component: LeftNav,
          title: "全局属性",
          name: "quanjushuxing",
          iconCls: "el-icon-menu",
          menuShow: true,
          children: [
            {
              path: "/system/aaaaa",
              component: Plan,
              title: "教学分类管理",
              name: "aaaaa",
              menuShow: true,
            },
            {
              path: "/system/bbbbbb",
              component: Mission,
              title: "动态属性",
              name: "bbbbbb",
              menuShow: true,
            },
            {
              path: "/system/cccccc",
              component: Maillist,
              title: "敏感词",
              name: "cccccc",
              menuShow: true,
            },
          ],
        },
        {
          path: "/system/dddddd",
          component: LeftNav,
          name: "quanjucanshu",
          title: "全局参数", // 当前路由的name
          iconCls: "iconfont icon-home", // 图标样式class
          menuShow: true,
          children: [
            {
              path: "/system/dddddd",
              component: VehicleManage,
              title: "全局参数",
              name: "dddddd",
              menuShow: true,
            },
          ],
        },
        {
          path: "/system/userinfo",
          component: LeftNav,
          name: "setuserinfo",
          title: "全局参数", // 当前路由的name
          iconCls: "iconfont icon-home", // 图标样式class
          menuShow: true,
          children: [
            {
              path: "/system/userinfo",
              component: VehicleManage,
              title: "用户信息",
              name: "userinfo",
              menuShow: true,
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name != "Login") {
    let breadCurrent = {
      title: typeof to.title == "function" ? to.title(to) : to.title,
      url: to.name,
      query: to.query,
      params: to.params,
      component: to.meta.componentName || "",
    };
    sessionStorage.breadList = JSON.stringify(breadCurrent);
    console.log(breadCurrent);
  }
  // console.log('to:' + to.path)
  if (to.path.startsWith("/login")) {
    window.localStorage.removeItem("access-user");
    next();
  } else if (to.path.startsWith("/register")) {
    window.localStorage.removeItem("access-user");
    next();
  } else {
    let user = JSON.parse(window.localStorage.getItem("access-user"));
    if (!user) {
      next({ path: "/login" });
    } else {
      next();
    }
  }
});

export default router;
