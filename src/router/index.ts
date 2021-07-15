import { createRouter, createWebHashHistory } from 'vue-router'
import { clearPending } from '../service/request'
import routes from './path'
const routerHash = createWebHashHistory()
const router = createRouter({
    history: routerHash,
    routes,
})

router.beforeEach(({ meta, fullPath }, form, next) => {
    clearPending()
    next()
})

export default router
