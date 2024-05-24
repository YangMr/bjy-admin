import Vue from "vue";
import iView from "iview";

Date.prototype.format = function (fmt) {
  const o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      String(this.getFullYear()).substr(4 - RegExp.$1.length),
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k]
          : ("00" + o[k]).substr(String(o[k]).length),
      );
  return fmt;
};

Array.prototype.pushItems = function (items) {
  if (items instanceof Array) {
    items.forEach(t => {
      this.push(t);
    });
  }
};

String.prototype.getDate = Number.prototype.getDate = function () {
  return new Date(new Date(this * 1000).format("yyyy/MM/dd"));
};

Vue.prototype.$promiseConfirm = function (
  content,
  title = "提示",
  config = {},
) {
  return new Promise(resolve => {
    let conf = {
      title: title,
      content: content,
      okText: config.okText || "确定",
      cancelText: config.cancelText || "取消",
      onOk: function () {
        if (config.onOk) {
          config.onOk();
        } else {
          resolve();
        }
      },
    };
    if (config.onCancel) {
      conf.onCancel = config.onCancel;
    }
    this.$Modal.confirm(conf);
  });
};

Vue.prototype.$deleteConfirm = function (
  content = "确定删除吗？",
  title = "提示",
  config = {},
) {
  return this.$promiseConfirm(content, title, config);
};

Vue.prototype.$promiseAlert = function (content, config = {}) {
  return new Promise(resolve => {
    let title = config.title || "提示";
    let conf = {
      title: title,
      content: content,
      onOk: function () {
        resolve();
      },
    };
    let type = config.type || "info";
    this.$Modal[type](conf);
  });
};

Vue.prototype.$downloadFile = function (url, fileName) {
  this.$store.commit("setShowFullModal", true);
  this.$tool.downloadFile(url, fileName, () => {
    this.$store.commit("setShowFullModal", false);
  });
};

// 重写iview InputNumber浮点方法
iView.InputNumber.computed.precisionValue = function () {
  let arr = String(this.currentValue).split(".");
  if (this.precision && arr[1] && arr[1].length > this.precision) {
    return this.currentValue.toFixed(this.precision);
  }
  return this.currentValue;
};

export default function (vue) {
  vue.$Message.createSuccess = (message = "创建成功") => {
    vue.$Message.success(message);
  };

  vue.$Message.editSuccess = (message = "编辑成功") => {
    vue.$Message.success(message);
  };

  vue.$Message.saveSuccess = () => {
    vue.$Message.success("保存成功");
  };

  vue.$Message.deleteSuccess = () => {
    vue.$Message.success("删除成功");
  };

  vue.$Message.copySuccess = () => {
    vue.$Message.success("复制成功");
  };

  vue.$Message.errorSchool = (message = "请选择所属校区") => {
    vue.$Message.error(message);
  };
}
