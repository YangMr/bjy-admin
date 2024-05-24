/**
 * 业务工具
 */

import order from "./order";
import toolCommon from "./tool-common";
import store from "@/store.js";
import http from "./http";

let vue = null;
/**
 * 上传文件
 * @param {*} file 文件file / base64串
 * @param {*} ext 文件后缀
 */
async function uploadFile(file, ext, progressUpdate, ossParams) {
  if (!ext) {
    ext = "png";
  }
  // if (!store.state.ossClient) {
  //   return vue.$Message.error("OSS 未初始化，请联系管理员配置");
  // }
  // if (typeof file == "string") {
  //   file = toolCommon.dataURLtoFile(file);
  // }
  // let filename =
  //   "/uploads/files/" +
  //   new Date().format("yyyyMMdd") +
  //   "/" +
  //   Number(new Date()) +
  //   toolCommon.uuid(16);
  // if (ext) {
  //   filename += "." + ext;
  // }
  // // const result = await store.state.ossClient.put(filename, file);
  // const result = await store.state.ossClient.multipartUpload(filename, file, {
  //   progress: function (p) {
  //     if (progressUpdate) {
  //       progressUpdate(p * 100);
  //     }
  //   },
  // });
  // return {
  //   ext,
  //   type: file.type,
  //   size: file.size,
  //   originalName: file.name,
  //   path: result.res.requestUrls[0].split("?")[0],
  // };
  console.log(progressUpdate);
  if (!ossParams) {
    return vue.$Message.error("OSS 未初始化，请联系管理员配置");
  }
  if (typeof file == "string") {
    file = toolCommon.dataURLtoFile(file);
  }
  let filename = ossParams.dir + toolCommon.uuid(16);
  if (ext) {
    filename += "." + ext;
  }
  let formData = new FormData();
  formData.append("key", `${filename}`);
  formData.append("success_action_status", 200); // 让服务端返回200，不设置则默认返回204。
  formData.append("OssAccessKeyId", ossParams.accessid);
  formData.append("policy", ossParams.policy);
  formData.append("signature", ossParams.signature);
  formData.append("callback", ossParams.callback);
  formData.append("file", file); // 必须放在最后
  // 发送 POST 请求
  const result = await http.post(ossParams.host, formData);
  return {
    ext,
    type: file.type,
    size: file.size,
    originalName: file.name,
    path: result.url,
  };
}
async function uploadAnyFile(accept = "") {
  return new Promise(resolve => {
    let file = document.createElement("input");
    file.type = "file";
    file.accept = accept;
    file.onchange = async function () {
      if (file.files.length == 0) {
        return;
      }
      let names = file.files[0].name.split(".");
      let data = await uploadFile(file.files[0], names[names.length - 1]);
      resolve(data);
    };
    file.click();
  });
}

async function uploadImage() {
  return uploadAnyFile("image/*");
}

// 获取优惠券使用范围描述
function courseDescrib(scopeType, commodity) {
  let ret = "";
  if (scopeType == 1) {
    ret = "课程 / 全部课程";
  } else if (scopeType == 2) {
    ret =
      "课程 / 指定分类" +
      (commodity ? " / " + toolCommon.splitStr(commodity, "title") : "");
  } else if (scopeType == 3) {
    ret =
      "课程 / 指定课程" +
      (commodity ? " / " + toolCommon.splitStr(commodity, "title") : "");
  }
  return ret;
}
function classDescrib(scopeType, commodity) {
  let ret = "";
  if (scopeType == 1) {
    ret = "班级 / 全部班级";
  } else if (scopeType == 2) {
    ret =
      "班级 / 指定教学分类" +
      (commodity ? " / " + toolCommon.splitStr(commodity, "title") : "");
  } else if (scopeType == 3) {
    ret =
      "班级 / 指定班级" +
      (commodity ? " / " + toolCommon.splitStr(commodity, "title") : "");
  } else if (scopeType == 4) {
    ret =
      "班级 / 指定年级" +
      (commodity ? " / " + toolCommon.splitStr(commodity, "title") : "");
  }
  return ret;
}
function goodsDescrib(scopeType, commodity) {
  let ret = "";
  if (scopeType == 1) {
    ret = "商品 / 全部商品";
  } else if (scopeType == 2) {
    ret =
      "商品 / 指定分类" +
      (commodity ? " / " + toolCommon.splitStr(commodity, "title") : "");
  } else if (scopeType == 3) {
    ret =
      "商品 / 指定商品" +
      (commodity ? " / " + toolCommon.splitStr(commodity, "title") : "");
  }
  return ret;
}
function ebooksDescrib(scopeType, commodity) {
  let ret = "";
  if (scopeType == 1) {
    ret = "电子书 / 全部电子书";
  } else if (scopeType == 2) {
    ret =
      "电子书 / 指定分类" +
      (commodity ? " / " + toolCommon.splitStr(commodity, "title") : "");
  } else if (scopeType == 3) {
    ret =
      "电子书 / 指定电子书" +
      (commodity ? " / " + toolCommon.splitStr(commodity, "title") : "");
  }
  return ret;
}
function getCouponUseRange(disType, scopeType, commodity) {
  let ret = "";
  switch (disType) {
    case 1: // 课程
      ret = courseDescrib(scopeType, commodity);
      break;
    case 4: // 一对一
      if (scopeType == 1) {
        ret = "一对一 / 全部约课";
      } else if (scopeType == 2) {
        ret =
          "一对一 / 指定约课讲师" +
          (commodity ? " / " + toolCommon.splitStr(commodity, "title") : "");
      }
      break;
    case 2: // 商品
      ret = goodsDescrib(scopeType, commodity);
      break;
    case 3:
      ret = "文库";
      break;
    case 5: //班级
      ret = classDescrib(scopeType, commodity);
      break;
    case 6: //电子书
      ret = ebooksDescrib(scopeType, commodity);
      break;
  }
  return ret;
}

// 是否出现继续学习选择
function showGotoStudy(courseType) {
  return (
    courseType == 2 ||
    courseType == 3 ||
    courseType == 5 ||
    courseType == 7 ||
    courseType == 8 ||
    courseType == 10
  );
}

// 带提示表格头的渲染器
function gridHeadRender(label, content, placement = "bottom", { style } = {}) {
  return h => {
    return h("div", { style }, [
      h("span", label),
      h(
        "Tooltip",
        {
          props: {
            content,
            "max-width": 250,
            transfer: true,
            placement,
          },
        },
        [
          h("i", {
            attrs: {
              class: "ivu-icon ivu-icon-md-help-circle",
            },
          }),
        ],
      ),
    ]);
  };
}

function handleMathJax(parent) {
  let promises = [];
  parent = parent || document;
  parent.querySelectorAll("mjx-container,svg").forEach(mjx => {
    let promise = new Promise(resolve => {
      let svg;
      if (mjx.tagName == "svg") {
        svg = mjx;
      } else {
        svg = mjx.querySelector("svg");
      }
      let serializer = new XMLSerializer();
      let img = document.createElement("img");
      img.src =
        "data:image/svg+xml;base64," +
        btoa(unescape(encodeURIComponent(serializer.serializeToString(svg))));
      img.style.width = svg.getAttribute("width");
      img.style.height = svg.getAttribute("height");
      img.style.position = "absolute";
      img.style.zIndex = "-1";
      img.onload = function () {
        document.body.appendChild(img);
        let imgNew = document.createElement("img");
        let canvas = document.createElement("canvas");
        canvas.setAttribute("width", img.naturalWidth);
        canvas.setAttribute("height", img.naturalHeight);
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        imgNew.src = canvas.toDataURL("image/png");
        imgNew.width = img.width;
        imgNew.height = img.height;
        mjx.parentNode.replaceChild(imgNew, mjx);
        document.body.removeChild(img);
        resolve();
      };
    });
    promises.push(promise);
  });
  return Promise.all(promises);
}

//等保,type==1说明需要验证,val是要验证的值,返回true验证通过，否则给出提示语
/**
 * 业务工具
 */
function guarantee(type, val) {
  const regTest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&~^()-+=<>]{6,16}$/;
  const msg = "密码必须包含数字和大小写字母任意两种组合，长度6-16位";
  if (type == 1) {
    if (!regTest.test(val)) {
      return msg;
    } else {
      return true;
    }
  } else {
    return true;
  }
}
function isText(_value) {
  //字符串是空就输出空，防止undefined
  _value = String(_value);
  if (
    _value == "null" ||
    _value == null ||
    _value == "" ||
    _value == "undefined"
  ) {
    return "";
  }
  return _value;
}
// 时间长度
function timeMeter(t, type = 1) {
  let time = Number(t);
  let h =
    time / 3600 < 10 ? "0" + parseInt(time / 3600) : parseInt(time / 3600);
  if (h != "00") time = time - h * 3600;
  let m = time / 60 < 10 ? "0" + parseInt(time / 60) : parseInt(time / 60);
  let s = time % 60 < 10 ? "0" + (time % 60) : time % 60;
  if (type == 1) {
    return h + ":" + m + ":" + s;
  } else if (type == 2) {
    return m + "分" + s + "秒";
  } else if (type == 3) {
    return h + "时" + m + "分" + s + "秒";
  } else if (type == 4) {
    return h + "小时" + m + "分钟" + s + "秒";
  }
}

/**
 * 通用formatter
 * @param {*} tag 格式化 tag
 * @param {*} origin 原始值
 */
function formatter(tag, origin) {
  let value;
  switch (tag) {
    case "datetime":
      value = origin ? toolCommon.ts(origin) : "--";
      break;
    case "date":
      value = origin ? toolCommon.ts(origin, "date") : "--";
      break;
    case "price":
      value = toolCommon.calcPrice(origin);
      break;
    case "recommend":
      value = origin ? "已推荐" : "未推荐";
      break;
    case "school":
      {
        const school = store.state.loginUser.school.find(i => i.id == origin);
        value = school ? school.org_name : "--";
      }
      break;
    case "second":
      value = origin ? toolCommon.formatSeconds(origin) : "--";
      break;
    case "empty":
      value = origin || "--";
      break;
  }
  return value;
}

export function use(vueInstance) {
  vue = vueInstance;
}

export function validateForm(formRef) {
  return new Promise(resolve => {
    formRef.validate(valid => {
      if (valid) {
        return resolve();
      }
      if (!valid) {
        vue.$Message.error("请完善信息");
      }
      for (let i in formRef.$children) {
        const child = formRef.$children[i];
        if (child.validateState === "error") {
          child.$el.scrollIntoView({ behavior: "smooth" });
          break;
        }
      }
    });
  });
}

export default {
  order,
  getCouponUseRange,
  gridHeadRender,
  showGotoStudy,
  handleMathJax,
  guarantee,
  isText,
  timeMeter,
  uploadFile,
  formatter,
  uploadImage,
  uploadAnyFile,
  validateForm,
};
