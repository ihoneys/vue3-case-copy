import { cancelApply, payOrder } from "../service/api";
import { createToast, isObjEmpty } from "./utils";



export interface Res { // 微信需要传入的数据，数据格式定义
    appId?: string;
    timeStamp?: string;
    nonceStr?: string;
    package?: string;
    signType?: string;
    sign?: string;
}

export interface PayParams {
    payAmount: number,
    applyId: number,
    openId: number,
    userId: number,
    unitId: number,
}

export async function toPay(payPost: PayParams, successCallBack = () => { }, failCallBack = () => { }): Promise<void> {
    console.log("去支付了")
    const { data } = await payOrder(payPost)
    console.log(data, '支付返回参数')
    if (!isObjEmpty(data)) {
        createToast('支付跳转中...', 'loading', () => {
            window.location.href = data.payUrl
        })
    } else {
        createToast('支付失败', 'fail', failCallBack)
    }

}

export function cancelApplyMethod(id: number, callBack = () => { }): void {
    console.log("取消申请")
    cancelApply({ id }).then(res => {
        const { returnCode } = res
        if (returnCode === 0) {
            createToast('取消成功！', 'success', callBack)
        } else {
            createToast('取消失败', 'fail', callBack)
        }
    })
}

export function resetWriteInfo(router: any, commit: any, id: number, applyStatus: number): void {
    console.log("补充资料")
    router.push({
        name: "write",
        query: {
            recordId: id,
            applyStatus,
        }
    })
    commit('changeIsResetWrite', true);
}

export function checkLogistics(expressNo): void {
    window.location.href = `https://m.kuaidi100.com/app/query/?nu=${expressNo}`
}