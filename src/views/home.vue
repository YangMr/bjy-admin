<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"
          ><img src="../assets/logo.png" style="padding-left: 8px"
        /></a>
      </div>
      <div class="topbar-logos">
        <a href="/" style="color: #fff"
          ><span v-show="!$store.state.collapsed">车车综合管理</span></a
        >
      </div>
      <div class="topbar-title">
        <!--展开折叠开关-->
        <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-outdent" v-show="!collapsed" title="收起"></i>
          <i class="iconfont icon-indent" v-show="collapsed" title="展开"></i>
        </div>
        <el-row
          ><!-- v-show="$store.state.topNavState==='home'"注意：这里就是topNavState作用之处，根据当前路由所在根路由的type值判断显示不同顶部导航菜单 -->
          <el-col :span="24">
            <el-menu
              :default-active="defaultActiveIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              :router="true"
            >
              <el-menu-item
                v-for="(item, index) in routers"
                :key="index"
                :class="{
                  'is-active':
                    defaultActiveIndex == item.name ||
                    defaultActiveIndex == '/' + item.name,
                }"
                :index="item.path"
              >
                {{ item.title }}
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i> {{ nickname }}
            <i class="el-icon-caret-bottom"></i
          ></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/system/userinfo')">
                <span style="color: #555; font-size: 14px">个人信息</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/system/userinfo')">
                <span style="color: #555; font-size: 14px">修改密码</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <!--中间-->
    <div v-if="defaultActiveIndex == '/Manager' || defaultActiveIndex == '/'">
      首页数据

      <hr />
      <div @click="$router.push({ name: 'system' })">系统管理</div>
      <hr />
      <div @click="$router.push({ name: 'dddddd' })">全局参数11</div>
      <hr />
      <div @click="$router.push({ name: 'quanjucanshu' })">全局参数22</div>
      <hr />
      <div @click="$router.push({ name: 'QuestionList' })">题库</div>
      <hr />
      <div @click="$router.push({ name: 'vehicleList' })">车辆信息</div>
    </div>
    <transition name="fade" mode="out-in" v-else>
      <router-view></router-view>
    </transition>
  </el-row>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      defaultActiveIndex: "/Manager",
      loading: false,
      nickname: "",
      routers: [],
      collapsed: this.$store.state.collapsed,
    };
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchNavData();

    this.$http
      .get("/api/index/course", {
        school_id: "",
      })
      .then((data) => {
        console.log(data);
      });
  },
  methods: {
    //折叠导航栏
    collapse() {
      this.collapsed = !this.collapsed;
      this.$store.state.collapsed = this.collapsed;
    },
    handleSelect(index) {
      this.defaultActiveIndex = index;
    },
    fetchNavData() {
      // 初始化菜单激活项
      var cur_path = this.$route.path; //获取当前路由
      var routers = this.$router.options.routes; // 获取路由对象
      console.log(this.$router);
      var nav_type = "",
        nav_name = "";
      this.routers = [];
      for (var i = 0; i < routers.length; i++) {
        if (routers[i].menuShow) {
          this.routers.push(routers[i]);
        }
        var children = routers[i].children;
        if (children) {
          for (var j = 0; j < children.length; j++) {
            var grand_children = children[j].children;
            if (grand_children) {
              for (var k = 0; k < grand_children.length; k++) {
                if (grand_children[k].path === cur_path) {
                  nav_type = routers[i].type;
                  nav_name = routers[i].name;
                  break;
                }
                // 如果该菜单下还有子菜单
                if (children[j].children) {
                  let grandChildren = children[j].children;
                  for (let z = 0; z < grandChildren.length; z++) {
                    if (grandChildren[z].path === cur_path) {
                      nav_type = routers[i].type;
                      nav_name = routers[i].name;
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      }
      this.$store.state.topNavState = nav_type; // 改变topNavState状态的值
      this.$store.state.leftNavState = nav_name; // 改变leftNavState状态的值
      this.defaultActiveIndex = "/" + nav_name;
    },
    jumpTo(url) {
      this.defaultActiveIndex = url;
      this.$router.push(url); //用go刷新
    },
    logout() {
      //logout
      let that = this;
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonClass: "el-button--warning",
      })
        .then(() => {
          //确认
          localStorage.removeItem("access-user");
          that.$router.go("/login"); //用go刷新
        })
        .catch(() => {});
    },
  },
  mounted() {
    let user = localStorage.getItem("access-user");
    if (user) {
      user = JSON.parse(user);
      this.nickname = user.nickname || "";
    }
  },
  watch: {
    $route: "fetchNavData", //监听router值改变时，改变导航菜单激活项
  },
};
</script>
