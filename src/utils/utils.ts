export function isObjEmpty(obj) {
    return (
        obj === undefined ||
        obj === 'undefined' ||
        obj == null ||
        obj === '' ||
        obj.length === 0 ||
        (typeof obj === 'object' && Object.keys(obj).length === 0)
    )
}



export function defineSteps(isSpilce = false) {
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

export const debounce = (func, wait, immediate) => {
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

export function getYearsMonthDay(isComplete = false): string {
    function addDateZero(num) {
        return num < 10 ? '0' + num : num
    }
    const d = new Date()
    let yearsMonthDay = `${d.getFullYear()}年${addDateZero(d.getMonth() + 1)}月${addDateZero(d.getDate())}日`
    if(isComplete) {
        yearsMonthDay =  `${yearsMonthDay} ${addDateZero(d.getHours())}:${addDateZero(d.getMinutes())}:${addDateZero(d.getSeconds())}`
    }
    return yearsMonthDay
}
