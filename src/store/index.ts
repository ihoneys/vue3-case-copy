import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

const debug = process.env.NODE_ENV !== 'production';

interface CurCopyData {
  printNums: number;
  insuranceLocation: string;
  copyContent: string;
  copyPurpose: string;
}

interface CardInfo {
  url?: string;
  isImage?: boolean;
}

interface WriteInfoData {
  isMyself: number;
  othersCardPositive: Array<CardInfo>;
  othersCardReverse: Array<CardInfo>;
  othersCardHand: Array<CardInfo>;
}

interface StateInterface {
  writeInfo: WriteInfoData;
  currentAddress: string;
  isTake: string;
  copyPageData: CurCopyData;
}
const state = {
  applyRecordId: null,
  currentAddress: '',
  signImage: '',
  clientImage: '',
  copyDialog: true,
  isResetWrite: false,
  updateAddress: {
    user: '',
    phone: '',
    area: '',
    address: '',
    defaultChecked: false,
    id: '',
  },
  requestParams: {
    userId: 0,
    openId: 0,
    unitId: 0,
  },
  writeInfo: {
    isMyself: 0,
    othersCardPositive: [],
    othersCardReverse: [], // 反面
    othersCardHand: [], // 手持
    othersName: '', // 被委托人姓名
    othersCardId: '', // 身份号
    othersPhone: '', // 电话号码
    othersRelation: '', // 与患者关系
    patientCardPositive: [], //患者身份证,
    patientCardReverse: [], //患者反面
    patientCardId: '', // 换证身份证
    patientPhone: '', // 患者手机号
    patientName: '', // 患者姓名
    hospitalName: '', // 院区
    hosNo: '', // 住院号
    inHosTime: '', // 入院时间
    outHosTime: '', // 出院时间
    isSelected: false, // 是否勾选
    feedback: '', // 反馈
    id: null,
    typeTime: 'inHosTime',
    submissionDate: '',
  },
  copyPageData: {
    printNums: 1,
    insuranceLocation: '',
    copyContent: [],
    copyPurpose: [],
  },
  mailing: {
    way: '1', // 1邮寄到付
    addressId: null,
    expressCompany: '',
    mailingAddress: '',
  },
};

const storePlugins = [createPersistedState({ storage: window.sessionStorage })];

if (debug) {
  storePlugins.push(createLogger());
}

export default createStore({
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: storePlugins,
});
