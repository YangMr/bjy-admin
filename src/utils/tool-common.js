import store from "../store.js";

/**
 * 通用工具
 */
// 表格格式化工具
 function gridFormat(formatter, origin) {
  let value = origin;
  switch (formatter) {
    case "datetime":
      value = origin ? ts(origin) : "-";
      break;
    case "date":
      value = origin ? ts(origin, "date") : "-";
      break;
    case "price":
      value = calcPrice(origin);
      break;
    case "empty":
      value = origin || "-";
      break;
    case "discount":
      value = origin + "%";
  }
  return value;
}
 function calcStart(timestamp) {
  let day = new Date(timestamp * 1000).getDay(),
    diffDay = 1;
  if (day != 2) {
    diffDay = day - 1;
  } else {
    diffDay = 1;
  }
  let start = parseInt(timestamp) - 3600 * 24 * 1 * diffDay;
  let end = start + 3600 * 24 * 6;
  return {
    start,
    end,
  };
}
/**
 * 时间戳转时间字符串
 * @param {*} timestamp 时间戳
 * @param {*} type 类型
 * @param {*} empty 空值时的返回
 */
function ts(timestamp, type = "datetime", empty = "-") {
  if (timestamp == 0 || !timestamp) {
    return empty;
  }
  let format;
  switch (type) {
    case "datetime":
      format = "yyyy/MM/dd hh:mm:ss";
      break;
    case "date":
      format = "yyyy/MM/dd";
      break;
    case "dateline":
      format = "yyyy-MM-dd";
      break;
  }
  console.log(timestamp)

  if (format) {
    return format;
  }
  return empty;
}
function handleToFront(param) {
  window.open(param);
}
/**
 * 时间戳转时间字符串
 * @param {*} timestamp 时间戳
 * @param {*} format 格式
 * @param {*} empty 空值时的返回
 */
function tsFormat(timestamp, format = "yyyy/MM/dd hh:mm:ss", empty = "--") {
  if (timestamp == 0 || !timestamp) {
    return empty;
  }
  return new Date(timestamp * 1000).format(format);
}

// 2019-6-24
function timestampToDay(timestamp) {
  let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  return date.format("yyyy/MM/dd");
}

function autoMapper(sourse, target, formatter) {
  if (!target || !sourse) {
    return;
  }
  let sourseKeys = Object.keys(sourse);
  sourseKeys.forEach(key => {
    if (!target.hasOwnProperty(key)) {
      return;
    }
    let value = sourse[key];
    if (formatter) {
      target[key] = formatter(key);
    } else if (typeof value === "object") {
      autoMapper(value, target[key], formatter);
    } else {
      target[key] = value;
    }
  });
}

function toArray(obj, _id = "id", _value = "value") {
  let arr = [];
  for (let i in obj) {
    let item = {};
    item[_id] = i;
    item[_value] = obj[i];
    arr.push(item);
  }
  return arr;
}

function mate(aim, all, _id = "id", _value = "value") {
  let value = [];
  if (!aim) {
    return;
  }
  let arr = aim.split(",");
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    for (let j = 0; j < all.length; j++) {
      if (current == all[j][_value]) {
        value.push(all[j][_id]);
        break;
      }
    }
  }
  return value;
}

// 计算价格
function calcPrice(price) {
  if (!price) price = 0;
  return (price / 100).toFixed(2);
}

// 数组元素交换
function swapArrayItem(arr, fromIndex, toIndex) {
  arr[toIndex] = arr.splice(fromIndex, 1, arr[toIndex])[0];
  return arr;
}

// 数组转","分隔的字符串
function splitStr(arr, attr, cut = ",") {
  let str = "";
  arr &&
    arr.length &&
    arr.forEach(item => {
      str += item[attr] + cut;
    });
  str = str.substr(0, str.length - 1);
  return str;
}

// 将对象第一级属性全部重置为空字符串
// obj - 待处理对象     exceptKeyAry - 排除的键值数组    val - 重置的值
function clearObj(obj, exceptKeyAry = [], val = "") {
  for (const key in obj) {
    if (exceptKeyAry.includes(key)) continue;
    obj[key] = val;
  }
}

/**
 * base64转file
 * @param {*} dataurl base64串
 */
function dataURLtoFile(dataurl) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function downloadNativeFile(url, fileName, callback) {
  url = "/adminstyle" + url;
  downloadFile(url, fileName, callback);
}

function downloadFile(url, fileName, callback) {
  store.commit("setShowFullModal", true);
  if (url.indexOf("?") < 0) {
    url += "?";
  } else {
    url += "&";
  }
  let xhr = new XMLHttpRequest();
  xhr.open("get", url + new Date().getTime());
  xhr.responseType = "blob";
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let blob = xhr.response;
      let blobUrl = URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      link.click();

      callback && callback();

      store.commit("setShowFullModal", false);
    }
  };
  xhr.onerror = () => {
    callback && callback();
  };
  xhr.send();
}

function sheetToBlob(sheet, sheetName) {
  sheetName = sheetName || "sheet1";
  let workbook = {
    SheetNames: [sheetName],
    Sheets: {},
  };
  workbook.Sheets[sheetName] = sheet;
  // 生成excel的配置项
  let wopts = {
    bookType: "xlsx", // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: "binary",
  };
  let wbout = window.XLSX.write(workbook, wopts);
  let blob = new Blob([s2ab(wbout)], {
    type: "application/octet-stream",
  });
  // 字符串转ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 1; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  return blob;
}

function openDownloadDialog(url, saveName) {
  if (typeof url == "object" && url instanceof Blob) {
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(url, saveName);
      return;
    } else {
      url = URL.createObjectURL(url); // 创建blob地址
    }
  }
  let aLink = document.createElement("a");
  aLink.href = url;
  aLink.download = saveName || "";
  let event;
  if (window.MouseEvent) event = new MouseEvent("click");
  else {
    event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null,
    );
  }
  aLink.dispatchEvent(event);
}

function exportExcel(columns, list, sheetName, saveName) {
  let aoa = [[]];
  columns.forEach(c => {
    if (!c.key || !c.title) {
      return;
    }
    aoa[0].push(c.title);
  });
  list.forEach(item => {
    let array = [];
    columns.forEach(c => {
      if (!c.key || !c.title) {
        return;
      }
      array.push(item[c.key]);
    });
    aoa.push(array);
  });
  let sheet = window.XLSX.utils.aoa_to_sheet(aoa);
  let blob = sheetToBlob(sheet, sheetName);
  openDownloadDialog(blob, saveName);
}

function downloadBase64(base64, fileName) {
  let arr = base64.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  let blob = new Blob([u8arr], {
    type: mime,
  });
  let blobUrl = URL.createObjectURL(blob);
  let link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName;
  link.click();
}

/**
 * 验证url是否合法 true-合法  false-不合法
 * @param {*} url
 */
function validateUrl(url) {
  return Boolean(
    url && (url.startsWith("http://") || url.startsWith("https://")),
  );
}

/**
 * 验证手机号
 * @param {*} mobile
 */
function validateMobile(mobile) {
  return Boolean(mobile && /^[0-9]{11}$/.test(mobile));
}

/**
 * 验证名称；只能包含中文、英文、数字、英文句号
 * @param {*} name 名称
 * @return 错误消息，如果错误消息为空，则正常
 */
function validateName(name) {
  name = name.trim();
  if (!name) return "请输入";
  // 测试说不用做此检测了
  // const reg = /^[.\sa-zA-Z0-9\u4e00-\u9fa5]+$/;
  // if (!reg.test(name)) {
  //   return "只能包含中文、英文、数字、空格、英文句号";
  // }
  return "";
}

// 防抖
function debounce(func, wait) {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// 节流
function throttle(func, wait) {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, wait);
  };
}

// 获取字母序号 number >= 1
function getLetterNumber(number) {
  return String.fromCharCode(64 + number);
}

function getDpi() {
  let div = document.createElement("div");
  div.style.width = "10pt";
  div.style.position = "absolute";
  div.style.zIndex = "-1";
  document.body.appendChild(div);
  let width = div.clientWidth;
  document.body.removeChild(div);
  return (10 * 72) / width;
}

/**
 * 获取 uuid
 * @param {*} len 生成uuid的长度
 */
function uuid(len = 16) {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    "",
  );
  let uuids = [],
    i,
    radix = chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuids[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;
    // rfc4122 requires these characters
    uuids[8] = uuids[13] = uuids[18] = uuids[23] = "-";
    uuids[14] = "4";
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuids[i]) {
        r = 0 | (Math.random() * 16);
        uuids[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuids.join("");
}

function toChinesNum(num) {
  let changeNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = temp => {
    let strArr = temp.toString().split("").reverse();
    let newNum = "";
    for (let i = 0; i < strArr.length; i++) {
      newNum =
        (i == 0 && strArr[i] == 0
          ? ""
          : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
          ? ""
          : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
        newNum;
    }
    return newNum;
  };
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) {
    noWan = "0" + noWan;
  }
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}
//判断是不是单校区
function checkSingle() {
  //是单校区为true
  const user = store.state.loginUser;
  const schools = user ? user.school : [];
  if (schools.length > 1) {
    //非单校区
    return false;
  }
  return true;
}

function formatSeconds(seconds, options) {
  let defaultOptions = { hourText: "时", minuteText: "分", secondText: "秒" };
  options = Object.assign({}, defaultOptions, options);
  let content = "";
  if (seconds > 3600) {
    content += parseInt(seconds / 3600) + options.hourText;
  }
  if (seconds > 60) {
    content += parseInt((seconds / 60) % 60) + options.minuteText;
  }
  if (seconds % 60 > 0 || !content) {
    content += (seconds % 60) + options.secondText;
  }
  return content;
}

// 深拷贝
function deepClone(target) {
  let result,
    $ = window.$;
  if (typeof target === "object") {
    if (Array.isArray(target)) {
      result = $.extend(true, [], target);
    } else {
      result = $.extend(true, {}, target);
    }
  } else {
    result = target;
  }
  return result;
}

function formatFileSize(size) {
  if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + "MB";
  }
  return (size / 1024).toFixed(2) + "KB";
}

export default {
  gridFormat,
  calcStart,
  ts,
  tsFormat,
  toArray,
  mate,
  timestampToDay,
  deepClone,
  calcPrice,
  swapArrayItem,
  splitStr,
  clearObj,
  downloadFile,
  downloadNativeFile,
  exportExcel,
  autoMapper,
  downloadBase64,
  validateUrl,
  validateMobile,
  validateName,
  debounce,
  throttle,
  getLetterNumber,
  getDpi,
  uuid,
  dataURLtoFile,
  toChinesNum,
  checkSingle,
  formatSeconds,
  formatFileSize,
  handleToFront,
};
