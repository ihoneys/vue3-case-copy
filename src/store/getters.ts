// 是否本人
export const getIsMyself = state => state.writeInfo.isMyself
// 当前选择地址
export const getCurrentAddress = state => state.currentAddress
// 是否自提
export const getIsTake = state => state.isTake
// 复印用途数据
export const getCopyPageData = state => state.copyPageData
// 保存填写信息
export const getNewWriteInfo = state => state.writeInfo
// 医院id
export const getHosUnitId = state => state.unitId
// 被委托人签名
export const getSignImage = state => state.signImage
// 委托人签名
export const getClientImage = state => state.clientImage
// 当前申请id
export const getApplyRecordId = state => state.applyRecordId
// 保存入口拿到医院参数
export const getRequestParams = state => state.requestParams
// 更新地址
export const getUpdateAddress = state => state.updateAddress

export const getMailingAddress = state => state.mailing
// 复印用途只谈一次
export const getCopyDialog = state => state.copyDialog
// 是否订单重填
export const getIsResetWrite = state => state.isResetWrite