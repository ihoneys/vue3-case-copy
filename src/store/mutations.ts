

const mutations = {
    changeIsMyself(state, status) {
        state.writeInfo.isMyself = status
    },
    changeCurrentAddress(state, value) {
        state.currentAddress = value
    },
    changeIsTake(state, way) {
        state.isTake = way
    },
    // 下一步保存
    changeWriteInfo(state, writeInfo) {
        for (const key in writeInfo) {
            if (writeInfo[key]) {
                state.writeInfo[key] = writeInfo[key]
            }
        }
    },
    // 获取暂存数据
    changeReuqestApplyRecord({ writeInfo }, data) {
        const { applyType, clientIdCardPros, clientIdCardCons, clientIdCardHold, clientIdCardNo, clientName, clientNameRelation, clientPhone, patientIdCardPros, patientIdCardCons, patientIdCardNo, patientName, patientPhone, inHosArea, inHosTime, outHosTime, remark } = data
        writeInfo.isMyself = applyType ? 0 : 1
        writeInfo.othersCardPositive = clientIdCardPros ? [{ url: clientIdCardPros, isImage: true }] : []
        writeInfo.othersCardReverse = clientIdCardCons ? [{ url: clientIdCardCons, isImage: true }] : []
        writeInfo.othersCardHand = clientIdCardHold ? [{ url: clientIdCardHold, isImage: true }] : []
        writeInfo.othersCardId = clientIdCardNo
        writeInfo.othersName = clientName
        writeInfo.othersRelation = clientNameRelation
        writeInfo.othersPhone = clientPhone
        writeInfo.patientCardPositive = patientIdCardPros ? [{ url: patientIdCardPros, isImage: true }] : []
        writeInfo.patientCardReverse = patientIdCardCons ? [{ url: patientIdCardCons, isImage: true }] : []
        writeInfo.patientCardId = patientIdCardNo
        writeInfo.patientName = patientName
        writeInfo.patientPhone = patientPhone
        writeInfo.hospitalName = inHosArea
        writeInfo.inHosTime = inHosTime
        writeInfo.outHosTime = outHosTime
        writeInfo.isSelected = true
        writeInfo.feedback = remark
    },
    changeApplyRecordId(state, recordId) {
        state.applyRecordId = recordId
    }
}

export default mutations