
export const changeIsMyselfAction = ({ commit, state }, status) => {
    commit("changeIsMyself", status)
}

export const changeCurrentAddressAction = ({ commit, state }, value) => {
    commit("changeCurrentAddress", value)
}

export const changeIsTakeAction = ({ commit, state }, value) => {
    commit("changeIsTake", value)
}

export const changeStorageWriteInfoAction = ({ commit, state }, data) => {
    commit("changeReuqestApplyRecord", data)
    commit("changeApplyRecordId", data.id)
}