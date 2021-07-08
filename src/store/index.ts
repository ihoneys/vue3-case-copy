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

interface CardInfo {
    url?: string,
    isImage?: boolean
}

interface WriteInfoData {
    isMyself: number,
    othersCardPositive: Array<CardInfo>,
    othersCardReverse: Array<CardInfo>,
    othersCardHand: Array<CardInfo>,
}

interface StateInterface {
    writeInfo: WriteInfoData,
    currentAddress: string,
    isTake: string,
    copyPageData: CurCopyData,
}
const state = {
    applyRecordId: 1064,
    currentAddress: "",
    updateAddress: {
        user: '',
        phone: '',
        area: '',
        address: '',
        defaultChecked: false,
        id: '',
    },
    isTake: "1", // 1快递 2 院内自取
    requestParams: {
        userId: 11,
        openId: 11,
        unitId: 11,
    },
    writeInfo: {
        isMyself: 0,
        othersCardPositive: [],
        othersCardReverse: [], // 反面
        othersCardHand: [], // 手持
        othersName: '',
        othersCardId: '', // 身份号
        othersPhone: '', // 电话号码
        othersRelation: '', // 与患者关系
        patientCardPositive: [], //患者身份证,
        patientCardReverse: [], //患者反面
        patientCardId: '',
        patientPhone: '', // 患者手机号
        patientName: '',
        hospitalName: '', // 院区
        inHosTime: "", // 入院时间
        outHosTime: "", // 出院时间
        isSelected: false, // 是否勾选
        feedback: '',
        typeTime: 'inHosTime',
    },
    copyPageData: {
        printNums: 1,
        insuranceLocation: "",
        copyContent: [],
        copyPurpose: []
    },
    signImage: ""
}

export default createStore({
    state,
    mutations,
    actions,
    getters,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})

