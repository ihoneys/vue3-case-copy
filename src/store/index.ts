import { createStore, createLogger } from "vuex"
import mutations from "./mutations"
import * as actions from "./actions"
import * as getters from "./getters"

const debug = process.env.NODE_ENV !== 'production'
// initial state
interface CurCopyData {
    printNums: number,
    insuranceLocation: string,
    copyContent: string,
    copyPurpose: string,
}

interface WriteInfoData {
    isMyself: number
}

interface StateInterface {
    writeInfo: WriteInfoData,
    currentAddress: string,
    isTake: string,
    copyPageData: CurCopyData,
}
const state: StateInterface = {
    writeInfo: {
        isMyself: 0
    },
    currentAddress: "",
    isTake: "1", // 1快递 2 院内自取
    copyPageData: {
        printNums: 0,
        insuranceLocation: "",
        copyContent: "",
        copyPurpose: ""
    }
}

export default createStore({
    state,
    mutations,
    actions,
    getters,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})

