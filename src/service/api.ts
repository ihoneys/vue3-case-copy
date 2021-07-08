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

// base64上传
export const uploadImageBas64 = (data) => {
    return request({
        method: "post",
        url: "/file/uploadBase64File",
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

// 委托书配置
export const getEntrustedMattersByParams = (data) => {
    return request({
        method: "post",
        url: "/configItem/getEntrustedMattersByParams",
        data
    })
}

// 委托书保存
export const saveMatterContent = (data) => {
    return request({
        method: "post",
        url: "/powerAttorney/save",
        data
    })
}

// 复印用途保存
export const saveCopyContent = (data) => {
    return request({
        method: "post",
        url: "/copyPurpose/save",
        data
    })
}

// 根据申请记录id(applyId)获取复印用途信息
export const getCopyPurposeContent = (applyId) => {
    return request({
        method: "get",
        url: `/copyPurpose/get/${applyId}`
    })
}


// 地址列表
export const getAddressList = (userId) => {
    return request({
        method: "get",
        url: `/addressManagement/list`,
        params: {
            userId
        }
    })
}

// 保存 or 更新地址
export const saveOrUpdateAddress = (data) => {
    return request({
        method: "post",
        url: `/addressManagement/save`,
        data
    })
}

// 根据医院id获取快递公司列表接口
export const getExpressCompany = (unitId) => {
    return request({
        method: "get",
        url: `/configItem/getExpressCompanyListByUnitId`,
        params: {
            unitId
        }
    })
}



