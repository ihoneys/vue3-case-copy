const mutations = {
  changeIsMyself(state, status) {
    state.writeInfo.isMyself = status;
  },
  changeIsTake(state, way) {
    state.mailing.way = way;
  },
  // 下一步保存
  changeWriteInfo(state, writeInfo) {
    for (const key in writeInfo) {
      if (writeInfo[key]) {
        state.writeInfo[key] = writeInfo[key];
      }
    }
  },
  // 获取暂存数据
  changeReuqestApplyRecord(state, data) {
    const {
      applyType,
      clientIdCardPros,
      clientIdCardCons,
      clientIdCardHold,
      clientIdCardNo,
      clientName,
      clientNameRelation,
      clientPhone,
      patientIdCardPros,
      patientIdCardCons,
      patientIdCardNo,
      patientName,
      patientPhone,
      patientHosCardNo,
      inHosArea,
      inHosTime,
      outHosTime,
      remark,
      id,
    } = data;
    state.writeInfo.isMyself = applyType ? 0 : 1;
    console.log(clientIdCardPros, 'clientIdCardProsclientIdCardPros');
    state.writeInfo.othersCardPositive = clientIdCardPros ? [{ url: clientIdCardPros, isImage: true }] : [];

    state.writeInfo.othersCardReverse = clientIdCardCons ? [{ url: clientIdCardCons, isImage: true }] : [];
    state.writeInfo.othersCardHand = clientIdCardHold ? [{ url: clientIdCardHold, isImage: true }] : [];
    state.writeInfo.othersCardId = clientIdCardNo;
    state.writeInfo.othersName = clientName;
    state.writeInfo.othersRelation = clientNameRelation;
    state.writeInfo.othersPhone = clientPhone;
    state.writeInfo.patientCardPositive = patientIdCardPros ? [{ url: patientIdCardPros, isImage: true }] : [];
    state.writeInfo.patientCardReverse = patientIdCardCons ? [{ url: patientIdCardCons, isImage: true }] : [];
    state.writeInfo.patientCardId = patientIdCardNo;
    state.writeInfo.patientName = patientName;
    state.writeInfo.patientPhone = patientPhone;
    state.writeInfo.hospitalName = inHosArea;
    state.writeInfo.inHosTime = inHosTime;
    state.writeInfo.outHosTime = outHosTime;
    state.writeInfo.isSelected = true;
    state.writeInfo.feedback = remark;
    state.writeInfo.id = id;
    state.writeInfo.hosNo = patientHosCardNo;
  },
  changeApplyRecordId(state, recordId) {
    state.applyRecordId = recordId;
  },
  changeSignImage(state, imgUrl) {
    state.signImage = imgUrl;
  },
  changeClientImage(state, imgUrl) {
    state.clientImage = imgUrl;
  },
  changeCopyData(state, data) {
    for (const key in data) {
      state.copyPageData[key] = data[key];
    }
  },
  changeUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  changeUpdateAddress(state, addressInfo) {
    for (const key in addressInfo) {
      state.updateAddress[key] = addressInfo[key];
    }
  },
  changeMailingAddress(state, obj) {
    for (const key in obj) {
      state.mailing[key] = obj[key];
    }
  },
  changeCurrentAddressAndId(state, { addressId, currentAddress }) {
    state.mailing.addressId = addressId;
    state.mailing.mailingAddress = currentAddress;
  },
  changeExpressCompany(state, value) {
    state.mailing.expressCompany = value;
  },
  changeCopyDialog(state) {
    state.copyDialog = false;
  },
  changeRequestParams(state, { unitId = 11, openId = null, userId = null }) {
    state.requestParams.unitId = unitId;
    state.requestParams.openId = openId;
    state.requestParams.userId = userId;
  },
  changeIsResetWrite(state, value) {
    state.isResetWrite = value;
  },
};

export default mutations;
