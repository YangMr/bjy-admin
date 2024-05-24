import Vue from "vue";
import store from "../store/index";

/**
 * 检测是否单校区，决定是否展示 element（单校区不展示，多校区展示）
 * 如果传入false，则跳过检测
 * v-show-school // 默认无需传参
 * v-show-school="false" // 传入false表示不检测
 */
Vue.directive("show-school", {
  inserted(el, binding) {
    const { value } = binding;
    if (value === false) return;
    // console.log(store.getters.showSchool);
    if (!store.getters.showSchool) {
      // el.parentNode && el.parentNode.removeChild(el);
      el.style.setProperty("display", "none", "important");
    }
  },
});

/**
 * 开关指令
 * v-switch:test
 */
Vue.directive("switch", {
  inserted(el, binding, vnode) {
    const { arg } = binding;
    if (!store.getters.getSwitch(arg)) {
      if (vnode.componentInstance && vnode.componentInstance.$parent.rules) {
        vnode.componentInstance.$parent.rules[
          vnode.componentInstance.prop
        ][0].required = false;
      }
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
});

/**
 * 权限指令，一下两种写法都可，优先取 arg 的值，如果没有则取 value 的值
 * v-permission:test
 * v-permission="'test'" // 一般用于有逻辑的表达式
 */
Vue.directive("permission", {
  inserted(el, binding) {
    const { arg, value } = binding;
    const url = arg || value;
    if (!store.getters.getPermission(url)) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
});
