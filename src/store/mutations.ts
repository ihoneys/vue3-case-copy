

const mutations = {
    changeIsMyself(state, status) {
        state.writeInfo.isMyself = status
    },
    changeCurrentAddress(state, value) {
        state.currentAddress = value
    },
    changeIsTake(state, way) {
        state.isTake = way
    }
}

export default mutations