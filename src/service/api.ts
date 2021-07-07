import request from "./request"

// 首页医院配置
export const getHomeUnitConfig = (unitId) => {
    return request({
        url: "/configItem/getHomePageConfigByUnitId",
        params: {
            unitId
        }
    })
}

// 医院申请须知信息
export const getHospitalConfigNotice = (unitId) => {
    return request({
        url: "/configItem/getApplyGuideByUnitId",
        params: {
            unitId
        }
    })
}

// 根据医院id获取复印用途和复印内容配置信息
export const getCopyLabelData = (unitId) => {
    return request({
        url: "/basicConfig/getCopyPurposeAndContentByUnitId",
        params: {
            unitId
        }
    })
}

// 上传图片证件
export const uploadImage = (unitId, data) => {
    return request({
        method: "post",
        url: "/file/upload",
        params: {
            unitId
        },
        data
    })
}

// 填写信息下一步保存
export const saveApplyRecord = (data) => {
    return request({
        method: "post",
        url: "/applyRecord/save",
        data
    })
}


// 填写信息暂存
export const storageApplyRecord = (data) => {
    return request({
        method: "post",
        url: "/applyRecord/storage",
        data
    })
}

export const getApplyRecordDetail = (recordId) => {
    return request({
        method: "get",
        url: "/applyRecord/getApplyRecordDetail",
        params: {
            id: recordId
        }
    })
}

export const getApplyRecordContext = (recordId) => {
    return request({
        method: "get",
        url: `/applyRecord/get/${recordId}`,   
    })
}





