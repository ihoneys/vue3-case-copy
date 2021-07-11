import { Dialog } from "vant";

export function isObjEmpty(obj: any): boolean {
    return (
        obj === undefined ||
        obj === 'undefined' ||
        obj == null ||
        obj === '' ||
        obj.length === 0 ||
        (typeof obj === 'object' && Object.keys(obj).length === 0)
    )
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
        steps.splice(1, 1)
        return steps
    } else {
        return steps
    }
}

export const debounce = (func: Function, wait: number, immediate: number): Function => {
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
        if (callNow)
            func.apply(this, args);
    }
}

export function getYearsMonthDay(isComplete: boolean = false): string {
    function addDateZero(num) {
        return num < 10 ? '0' + num : num
    }
    const d = new Date()
    let yearsMonthDay = `${d.getFullYear()}年${addDateZero(d.getMonth() + 1)}月${addDateZero(d.getDate())}日`
    if (isComplete) {
        yearsMonthDay = `${yearsMonthDay} ${addDateZero(d.getHours())}:${addDateZero(d.getMinutes())}:${addDateZero(d.getSeconds())}`
    }
    return yearsMonthDay
}

export function checkPhone(value: string): boolean {
    return !(/^1[3456789]\d{9}$/.test(value))
}

export function checkIdCard(value: string): boolean {
    return !(/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(value))
}

export function createDialog(message: string): void {
    Dialog({
        title: "提示",
        message,
        confirmButtonColor: "#00C6B8"
    })
}

export function getUrlParams(): any {
    let hre = window.location.href
    let query = hre.split('?')[1]
    let obj = {}
    if (query) {
      var queryParams = query.split('&')
      if (!queryParams) return false
      for (let i in queryParams) {
        var typeArr = queryParams[i].split('=')
        let key = typeArr[0]
        let value = typeArr[1]
        obj[key] = value
      }
    }
    return obj
  }