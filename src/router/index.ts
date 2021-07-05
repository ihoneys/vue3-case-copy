import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './path'
const routerHash = createWebHashHistory()
const router = createRouter({
    history: routerHash,
    routes,
})

router.beforeEach(({ meta, fullPath }, form, next) => {
    next()
})

export default router
