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