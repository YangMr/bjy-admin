import Vue from "vue";
import * as enums from "@/utils/enums";
import tool from "@/utils/tool-common";

Vue.filter("ts", function (value, type = "datetime", empty = "") {
  return tool.ts(value, type, empty);
});

Vue.filter("tsFormat", function (value, format, empty = "") {
  return tool.tsFormat(value, format, empty);
});

Vue.filter("tsFormatDate", function (value, format = "yyyy/MM/dd", empty = "") {
  return tool.tsFormat(value, format, empty);
});

Vue.filter(
  "tsFormatLong",
  function (value, format = "yyyy/MM/dd hh:mm:ss", empty = "") {
    return tool.tsFormat(value, format, empty);
  },
);

Vue.filter("price", function (value) {
  return tool.calcPrice(value);
});

Vue.filter("formatSeconds", function (value) {
  return tool.formatSeconds(value);
});

Vue.filter("enum", function (value, type) {
  return enums[type].getValue(value) || "--";
});

const getPeriodSurplus = (Vue.prototype.$getPeriodSurplus = function (value) {
  return (
    value.periods_num -
    value.refund_periods_num -
    value.confirm_periods_num -
    value.dispatch_periods_num -
    (value.applying_refund_periods_num || 0)
  );
});

Vue.filter("periodSurplus", function (value) {
  return getPeriodSurplus(value);
});

Vue.filter("fileSize", function (value) {
  return tool.formatFileSize(value);
});
