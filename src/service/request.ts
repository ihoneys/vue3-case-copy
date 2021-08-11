import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { nextTick } from "vue";
import { Toast } from "vant";

import { createDialog, debounce } from "../utils/utils";
import { DEV_BASE_URL, PRO_BASE_URL, TEST_BASE_URL, TIMEOUT } from "./config";

import qs from "qs";

const envMap = {
  development: DEV_BASE_URL,
  production: PRO_BASE_URL,
  test: TEST_BASE_URL,
};

const base_URL = envMap[import.meta.env.MODE];

console.log(base_URL,'路径地址')

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map();
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data),
  ].join("&");
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel);
      }
    });
};
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data),
  ].join("&");
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url);
    cancel(url);
    pending.delete(url);
  }
};
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }
  pending.clear();
};

let loadingInstance; //loading 实例
let needLoadingRequestCount = 0; //当前正在请求的数量

const MESSAGE = "加载中...";
const PAY_MESSAGE = "支付确认中...";
const showLoading = (message: string) => {
  if (needLoadingRequestCount === 0 && !loadingInstance) {
    loadingInstance = Toast.loading({
      message: message,
      duration: 500000,
      forbidClick: true,
    });
  }
  needLoadingRequestCount++;
};

const closeLoading = () => {
  nextTick(() => {
    needLoadingRequestCount--;
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); //保证大于等于0
    if (needLoadingRequestCount === 0) {
      if (loadingInstance) {
        hideLoading();
      }
    }
  });
};

const hideLoading = debounce(
  () => {
    loadingInstance.clear();
    loadingInstance = null;
  },
  0,
  true
);

const instance = axios.create({
  baseURL: base_URL,
  timeout: TIMEOUT,
});

// 请求
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    removePending(config);
    addPending(config);

    // 1.发送网络请求时, 在界面的中间位置显示Loading的组件
    let showLoadingMessage = MESSAGE;

    if (config.url?.includes("/trade/queryPayStatus")) {
      showLoadingMessage = PAY_MESSAGE;

      config.timeout = 1000 * 60 * 2;
    }

    showLoading(showLoadingMessage);

    // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面

    // 3.params/data序列化的操作
    if (config.url?.includes("/file/upload")) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (err) => {
    closeLoading();
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    removePending(res);
    closeLoading();
    
    const { returnCode, returnMsg } = res.data;
    if (returnCode === 2 || returnCode === 1) {
      createDialog(returnMsg || "请求失败");
    }

    if (returnCode === 0) {
      return res.data;
    }
  },
  (err) => {
    closeLoading();
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log("请求错误");
          break;
        case 401:
          console.log("未授权访问");
          break;
        default:
          console.log("其他错误信息");
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
