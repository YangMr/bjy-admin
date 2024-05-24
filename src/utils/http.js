import { Guid } from "./guid";
import buildConfig from '../api/env';
const Http = function () {
  let DeviceID = localStorage.DeviceID;
  if (!DeviceID) {
    DeviceID = Guid.NewGuid().ToString("D");
    localStorage.DeviceID = DeviceID;
  }
  this.DeviceID = DeviceID;
};

Http.prototype.fetch = function (url, method, params = {}, fetchConfig = {}) {
  console.log(buildConfig.baseURL)
  if (url.indexOf("http") == -1) url = buildConfig.baseURL + url;
  fetchConfig.showLoading =
    fetchConfig.showLoading === undefined ? true : fetchConfig.showLoading;
  if (this.beforeRequest) {
    this.beforeRequest(fetchConfig);
  }
  let config = {
    method: method,
    mode: "cors",
    headers: {
      DeviceType: "Admin",
      DeviceID: this.DeviceID,
    },
  };
  if (params instanceof FormData) {
    config.body = params;
  } else {
    if (method == "get" || method == "head") {
      if (url.indexOf("?") > 0) {
        url += "&";
      } else {
        url += "?";
      }
      for (let key in params) {
        let value = params[key];
        if (
          typeof value == "function" ||
          value === undefined ||
          value === null
        ) {
          continue;
        }
        url += key + "=" + encodeURIComponent(value) + "&";
      }
    } else {
      let obj = {};
      for (let key in params) {
        let value = params[key];
        if (
          typeof value == "function" ||
          value === undefined ||
          value === null
        ) {
          continue;
        }
        obj[key] = value;
      }
      config.body = JSON.stringify(obj);
    }
    config.headers["Content-Type"] = "application/json";
  }
  if (sessionStorage.breadList) {
    config.headers.menuUrl = JSON.parse(sessionStorage.breadList).url;
  }
  if (localStorage.adminToken) {
    config.headers.Authorization = "Bearer " + localStorage.adminToken;
  }
  return new Promise(resolve => {
    fetch(url, config).then(async res => {
      if (this.afterRequest) {
        this.afterRequest(fetchConfig);
      }
      if (res.status == 200) {
        let data = await res.json();
        if (data.code == 200) {
          resolve(data.data || data);
        } else if (data.code == 203) {
          resolve(data);
        } else if (data.code == 4004) {
          window.location.href = buildConfig.baseURL + "/404.html";
        } else if (fetchConfig.onError) {
          fetchConfig.onError(data);
        } else if (this.onApiError) {
          this.onApiError(data);
        }
      } else if (this.onApiError) {
        this.onApiError({
          code: res.status,
          msg: res.status.toString(),
        });
      }
      if (fetchConfig.onComplete) {
        fetchConfig.onComplete();
      }
    });
  });
};

Http.prototype.get = function (url, params, config) {
  return this.fetch(url, "get", params, config);
};

Http.prototype.post = function (url, params, config) {
  return this.fetch(url, "post", params, config);
};

Http.prototype.put = function (url, params, config) {
  return this.fetch(url, "put", params, config);
};

Http.prototype.delete = function (url, params, config) {
  return this.fetch(url, "delete", params, config);
};

export default new Http();
