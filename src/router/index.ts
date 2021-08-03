import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { clearPending } from "../service/request";
import routes from "./path";
// const routerHash = createWebHashHistory()
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes,
});

router.beforeEach(({ meta, fullPath }, form, next) => {
  clearPending();
  next();
});

export default router;
