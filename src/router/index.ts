import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { clearPending } from "../service/request";
import routes from "./path";
// const routerHash = createWebHashHistory();
// const routerHistory = createWebHistory();
const router = createRouter({
  history: createWebHistory("medical-record-front"),
  routes,
});

router.beforeEach(({ meta, fullPath }, form, next) => {
  clearPending();
  next();
});

export default router;
