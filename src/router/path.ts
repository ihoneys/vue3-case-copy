import { RouteRecordRaw } from "vue-router";
import Home from "@/pages/entrance.vue";
import Notice from "@/pages/notice.vue";
import CopyLabel from "@/pages/copy-label.vue";
import AddAddress from "@/pages/add-address.vue";
import Address from "@/pages/address.vue";
import Detail from "@/pages/detail.vue";
import PayOrder from "@/pages/pay-order.vue";
import MailingWay from "@/pages/mailing-way.vue";
import Record from "@/pages/record.vue";
import Signture from "@/pages/signture.vue";
import Write from "@/pages/write-info.vue";
import TakeAddress from "@/pages/take-address.vue";
import CheckPay from "@/pages/check-pay.vue";
import Agreement from "@/pages/agreement.vue";
import Demo from "@/pages/demo.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/notice",
    name: "notice",
    component: Notice,
  },
  {
    path: "/copy",
    name: "copy",
    component: CopyLabel,
  },
  {
    path: "/addAddress",
    name: "addAddress",
    component: AddAddress,
  },
  {
    path: "/address",
    name: "address",
    component: Address,
  },
  {
    path: "/detail",
    name: "detail",
    component: Detail,
  },
  {
    path: "/payOrder",
    name: "payOrder",
    component: PayOrder,
  },
  {
    path: "/mailing",
    name: "mailing",
    component: MailingWay,
  },
  {
    path: "/record",
    name: "record",
    component: Record,
  },
  {
    path: "/signture",
    name: "signture",
    component: Signture,
  },
  {
    path: "/write",
    name: "write",
    component: Write,
    children: [
      {
        path: "/write/agreement",
        name: "/write/agreement",
        component: Agreement,
      },
    ],
  },
  {
    path: "/takeAddress",
    name: "takeAddress",
    component: TakeAddress,
  },
  {
    path: "/checkPay",
    name: "checkPay",
    component: CheckPay,
  },
  {
    path: "/agreement",
    name: "agreement",
    component: Agreement,
  },
  {
    path: "/demo",
    name: "demo",
    component: Demo,
  },
];
export default routes;
