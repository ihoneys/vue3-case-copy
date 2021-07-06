import { createStore, createLogger } from "vuex"
import mutations from "./mutations"
import * as actions from "./actions"
import * as getters from "./getters"

const debug = process.env.NODE_ENV !== 'production'
// initial state
const state = {
    writeInfo: {
        isMyself: 0
    },
    vuex: 'vuex'
}

export default createStore({
    state,
    mutations,
    actions,
    getters,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})

