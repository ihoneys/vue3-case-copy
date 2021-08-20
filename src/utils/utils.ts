import { Dialog, Toast } from "vant";
import CryptoJS from "crypto-js";
/**
 *
 * @param obj
 * @returns {boolean}
 */
export function isObjEmpty(obj: any): boolean {
  return (
    obj === undefined ||
    obj === "undefined" ||
    obj == null ||
    obj === "" ||
    obj.length === 0 ||
    (typeof obj === "object" && Object.keys(obj).length === 0)
  );
}

export function defineSteps(isSpilce: boolean = false): any {
  const steps = [
    {
      title: "填写信息",
    },
    {
      title: "补充资料",
    },
    {
      title: "领取方式",
    },
    {
      title: "预缴费用",
    },
  ];
  if (isSpilce) {
    steps.splice(1, 1);
    return steps;
  } else {
    return steps;
  }
}

/**
 *
 * @param func 执行函数
 * @param wait 间隔时间
 * @param immediate 是否立即执行
 * @returns
 */

export const debounce = (
  func: Function,
  wait: number,
  immediate: boolean
): Function => {
  // 设置定时器
  let timeout;
  return (...args) => {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    // 进入先清除定时器
    clearTimeout(timeout);
    // 重新设置一个定时器，如果没有连续触发函数，就执行定时器，也是就是核心原理
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
};

export function getYearsMonthDay(isComplete: boolean = false): string {
  function addDateZero(num) {
    return num < 10 ? "0" + num : num;
  }
  const d = new Date();
  let yearsMonthDay = `${d.getFullYear()}年${addDateZero(
    d.getMonth() + 1
  )}月${addDateZero(d.getDate())}日`;
  if (isComplete) {
    yearsMonthDay = `${yearsMonthDay} ${addDateZero(
      d.getHours()
    )}:${addDateZero(d.getMinutes())}:${addDateZero(d.getSeconds())}`;
  }
  return yearsMonthDay;
}

export function checkPhone(value: string): boolean {
  return !/^1[3456789]\d{9}$/.test(value);
}

export function checkIdCard(value: string): boolean {
  return !/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(
    value
  );
}

export function createDialog(
  message: string,
  showCancelButton = false,
  callBack = () => {}
): void {
  Dialog({
    title: "提示",
    message,
    confirmButtonColor: "#00C6B8",
    showCancelButton,
  })
    .then(callBack)
    .catch(() => {});
}

export function createToast(
  message: string,
  type: any,
  callBack = () => {}
): void {
  setTimeout(() => {
    Toast({
      message,
      type,
      duration: 2000,
      onClose() {
        callBack();
      },
    });
  }, 50);
}

export function getUrlParams(): any {
  let url = decodeURIComponent(window.location.href);
  url = url.replace(/\s/g, "");
  const params = url.match(/([^?=&]+)(=([^&]*))/g) || [];
  const obj = params.reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );
  return obj;
}

export function validateFunc(arr) {
  const action = arr.filter((item) => !item.value);
  if (action.length) {
    createDialog(action[0].text);
    return false;
  }
  return true;
}

export function validateHasEmoji(arr) {
  const actions = arr.filter((item) => isEmojiCharacter(item.value));
  if (actions.length) {
    createDialog(actions[0].text);
    return false;
  } else {
    return true;
  }
}

export function aseDecrypt(encryptedStr) {
  if (!encryptedStr) return;
  let key = "3CJQFPI8GDNV9RKZ";
  key = CryptoJS.enc.Utf8.parse(key);
  let base64 = CryptoJS.enc.Base64.parse(encryptedStr);
  let src = CryptoJS.enc.Base64.stringify(base64);
  let decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: [],
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

export function isEmojiCharacter(substring) {
  for (var i = 0; i < substring.length; i++) {
    var hs = substring.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        var uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (substring.length > 1) {
      var ls = substring.charCodeAt(i + 1);
      if (ls == 0x20e3) {
        return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true;
      } else if (0x2b05 <= hs && hs <= 0x2b07) {
        return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true;
      } else if (
        hs == 0xa9 ||
        hs == 0xae ||
        hs == 0x303d ||
        hs == 0x3030 ||
        hs == 0x2b55 ||
        hs == 0x2b1c ||
        hs == 0x2b1b ||
        hs == 0x2b50
      ) {
        return true;
      }
    }
  }
}
