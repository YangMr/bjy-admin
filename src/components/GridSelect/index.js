/**
this.$showGridSelect("DemoSelect", {
  //== 对话框的 props
  dialog: {
    //== 重写 title 属性
    title: "测试",
    //== 点击确定的响应函数，done用于控制对话框的关闭，不传时默认关闭
    onOk: (selectedRows, done) => {
      if (selectedRows.length == 0) {
        return this.$message.error("请选择");
      }
      this.selectedRows = selectedRows;
      done();
    },
    //== 点击取消的响应函数，用法同 onOk
    onCancel: (selectedRows, done) => {
      done();
    }
  },
  //== 内部 module 的 props
  module: {
    //== 重写 selectType 属性
    selectType: "single",
    //== 需要打开对话框即选中时使用
    selectedRows: this.selectedRows,
    //== 禁选自定义
    rowSelectDisabled: row => {
      return row.id == 8;
    },
  },
});
 */

import Vue from "vue";
import Dialog from "./Dialog.vue";
import PresetProps from "./default-props";
import store from "@/store";
import router from "@/router";
const DialogConstructor = Vue.extend({ ...Dialog, store, router });

/**
 * 弹出表格选择弹窗
 * @param {*} moduleName
 * @param {*} options
 */
export async function showGridSelect(moduleName, props = {}) {
  const module = await import(
    /* webpackChunkName: "grid-select-module" */ `./modules/${moduleName}.vue`
  );

  let { dialog: dialogProps = {}, module: moduleProps = {} } = props;
  const dialog = new DialogConstructor();
  const moduleVNode = dialog.$createElement(module.default);
  moduleVNode.$router = router;
  moduleVNode.$store = store;
  // dialog options
  dialogProps = generateProps(moduleName, "dialog", dialogProps);
  Object.assign(dialog, dialogProps);
  dialog.visible = true;
  dialog.$slots.default = [moduleVNode];
  const done = () => {
    dialog.visible = false;
  };
  dialog._onOk = () => {
    store.commit("config/REMOVE_SINGLE_DIALOG", dialog);
    if (dialog.onOk) {
      dialog.onOk(moduleVNode.componentInstance.getSelectList(), done);
      if (dialog.onOk.length < 2) {
        dialog.visible = false;
      }
    } else {
      dialog.visible = false;
    }
  };
  dialog._onCancel = () => {
    store.commit("config/REMOVE_SINGLE_DIALOG", dialog);
    if (dialog.onCancel) {
      dialog.onCancel(moduleVNode.componentInstance.getSelectList(), done);
      if (dialog.onCancel.length < 2) {
        dialog.visible = false;
      }
    } else {
      dialog.visible = false;
    }
  };
  dialog.$mount();
  document.body.appendChild(dialog.$el);
  store.commit("config/SAVE_DIALOG", dialog);

  // module options
  moduleProps = generateProps(moduleName, "module", moduleProps);
  Object.assign(moduleVNode.componentOptions.propsData, moduleProps);
  moduleVNode.$store = store;
}

function generateProps(moduleName, elementName, curProps) {
  const result = curProps || {};
  if (PresetProps[moduleName]) {
    const defaultProps = PresetProps[moduleName][elementName];
    for (const key in defaultProps) {
      if (!(key in result)) {
        result[key] = defaultProps[key];
      }
    }
  }
  return result;
}

export default function (Vue) {
  Vue.prototype.$showGridSelect = showGridSelect;
}
