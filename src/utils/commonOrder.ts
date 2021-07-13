import { useRouter } from "vue-router";
import { Toast } from "vant";

import { cancelApply } from "../service/api";

declare let WeixinJSBridge: any
declare let document: any


export interface Res { // 微信需要传入的数据，数据格式定义
    appId?: string;
    timeStamp?: string;
    nonceStr?: string;
    package?: string;
    signType?: string;
    sign?: string;
}

// const toPays = async () => {
//     const isWeChatBrowser = isWeixinBrower()
//     const orderParams = {
//         orderNo: currentOrder.orderId,
//         tradeType: 'JSAPI',
//     }
//     if (isWeChatBrowser) {
//         const { signParam, success, message } = await invokingPrepaid(orderParams)
//         if (!success) return Toast.fail(message)
//         delete signParam.packages
//         signParam.orderNo = currentOrder.orderId
//         pullWechatPay(signParam)
//     } else {
//         console.log("不在微信中")
//     }
// }

// const pullWechatPay = (signParam: Res): void => {
//     if (typeof WeixinJSBridge === 'undefined') {
//         if (document.addEventListener) {
//             document.addEventListener('WeixinJSBridgeReady', onBridgeReadyPayFor, false)
//         } else if (document.attachEvent) {
//             document.attachEvent('WeixinJSBridgeReady', onBridgeReadyPayFor)
//             document.attachEvent('onWeixinJSBridgeReady', onBridgeReadyPayFor)
//         }
//     } else {
//         onBridgeReadyPayFor(signParam)
//     }
// }

// const onBridgeReadyPayFor = (signParam): void => {
//     WeixinJSBridge.invoke('getBrandWCPayRequest', signParam, (res) => {
//         if (res.err_msg == 'get_brand_wcpay_request:ok') {
//             const backParams = {
//                 orderId: currentOrder.orderId,
//             }
//             // 支付回调查询
//             // weChatCallback(backParams).then((res) => {

//             // })
//             Toast({
//                 type: 'success',
//                 message: '支付成功',
//                 onClose: () => {
//                     // router.push('orderList')
//                 },
//             })
//             alert('支付成功')
//             console.log('s6a5d46sa4d6sa4d6sa46')
//         } else {
//             Toast.fail('未完成支付')
//         }
//     })
// }


const WeChartJSBridge = (res: Res): void => {
    if (typeof WeixinJSBridge === 'undefined') { // WeixinJSBridge 在TS编译会报错，因为该对象只在微信浏览器中存在，在文件头部声明 declare let WeixinJSBridge: any 即可
        if (document.addEventListener) {
            // 监听调用，可有可无
            document.addEventListener('WeixinJSBridgeReady', () => {
                onBridgeReady(res)
            }, false)
        }
        else if (document.attachEvent) { // attachEvent()只在IE中有用，IE11已经不再支持
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady(res)
    }
}

const onBridgeReady = (res: Res): void => {
    WeixinJSBridge.invoke('getBrandWCPayRequest', {
        appId: res.appId,
        // 公众号名称，由商户传入
        timeStamp: res.timeStamp,
        // 时间戳，自1970年以来的秒数
        nonceStr: res.nonceStr,
        // 随机串
        package: res.package,
        signType: res.signType,
        // 微信签名方式：
        paySign: res.sign
        // 微信签名
    },
        (res: any) => {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            }
            if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                // 支付取消
            }

            if (res.err_msg === 'get_brand_wcpay_request:fail') {
                // 支付失败
            }
        })
}




export function toPay(): void {
    console.log("去支付")

}

export function canleApplyMethod(id: number): void {
    console.log("取消申请")
    cancelApply({ id }).then(res => {
        const { returnCode } = res
        if (returnCode === 0) {
            Toast.success({
                message: "取消成功！",
                type: "success",
                onClose() {
                    // router.push("/record")
                    // window.onload()
                }
            })
        }
    })
}

export function resetWriteInfo(router: any, commit: any, id: number): void {
    console.log("补充资料")
    router.push({
        name: "write",
        query: {
            recordId: id
        }
    })    
    commit('changeIsResetWrite', true);
}

export function checkLogistics(): void {
    console.log("查看物流")
}