// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import http from "./utils/http";
import store from './store.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont.css'
import '@/assets/css/style.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.config.productionTip = false;
Vue.config.login_flag = false;
Vue.component('footer-copyright', {
  template: '<p class="footer-msg">版权信息</p>'
});
// http
Vue.prototype.$http = http;
http.beforeRequest = function (config) {
  console.log(config.showLoading)
  if (config.showLoading) {
    store.state.setShowFullModal = true;
  }
};
http.afterRequest = function (config) {
  console.log(config.showLoading)
  if (config.showLoading) {
    store.state.setShowFullModal = false;
  }
};
http.onApiError = function (data) {
  console.log(data.msg)
  if (data.code == 202) {
    if (!Vue.config.login_flag) {
      Vue.config.login_flag = true;
      Vue.prototype.$message.error({
        content: data.msg,
        onClose: () => {
          store.commit("logout");
          router.push({
            name: "Login",
          });
          Vue.config.login_flag = false;
        },
      });
    }
    router.push({
      name: "Login",
    });
  } else {
    Vue.prototype.$message.error(data.msg);
  }
};
// component
import components from "@/components";
Vue.use(components);
import GridSelect from "@/components/GridSelect";
Vue.use(GridSelect);
// tools
import toolCommon from "./utils/tool-common";
import toolBusiness from "./utils/tool-business";
Vue.prototype.$tool = { ...toolCommon, ...toolBusiness };
Vue.filter('formatDateTime', function (value) {
  if (!value) return ''
  let date = new Date(value);
  let y = date.getFullYear() + '/';
  let mon = (date.getMonth() + 1) + '/';
  let d = date.getDate();
  return y + mon + d;
});

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
