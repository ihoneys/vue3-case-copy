import axios, { AxiosRequestConfig } from 'axios';
import { nextTick } from 'vue'
import { Toast } from "vant"

import { debounce } from "../utils/utils"
import { BASE_URL, TIMEOUT } from "./config";

let loadingInstance //loading 实例
let needLoadingRequestCount = 0 //当前正在请求的数量

const showLoading = () => {
  if (needLoadingRequestCount === 0 && !loadingInstance) {
    loadingInstance = Toast.loading({
      message: '加载中...',
      duration: 30000,
      forbidClick: true,
    })
  }
  needLoadingRequestCount++
}

const closeLoading = () => {
  nextTick(() => {
    needLoadingRequestCount--
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0) //保证大于等于0
    if (needLoadingRequestCount === 0) {
      if (loadingInstance) {
        hideLoading()
      }
    }
  })
}

const hideLoading = debounce(() => {
  loadingInstance.clear()
  loadingInstance = null
}, 0, true)

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
});

let promiseTimeout

instance.interceptors.request.use((config: AxiosRequestConfig) => {

  // 1.发送网络请求时, 在界面的中间位置显示Loading的组件
  showLoading()
  // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面

  // promiseTimeout = setInterval(() => {
  //   return Promise.reject("请求超时")
  // }, TIMEOUT)
  // 3.params/data序列化的操作
  if (config.url?.includes('/file/upload')) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  return config;
}, err => {
  closeLoading()
  return Promise.reject(err)
});

instance.interceptors.response.use((res: any) => {
  // clearInterval(promiseTimeout)
  closeLoading()
  if (res.data.returnCode === 0) {
    return res.data;
  } else {
    return Promise.reject(res.data.returnMsg)
  }
}, err => {
  closeLoading()
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
});

export default instance;

