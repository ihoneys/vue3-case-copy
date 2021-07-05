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