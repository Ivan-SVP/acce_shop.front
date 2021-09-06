import { createRouter, createWebHistory } from 'vue-router'
import store from "../store"
import shop_routes from "../router/shop";
import auth_routes from "../router/auth";
import service_routes from "../router/service";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...shop_routes,

        ...auth_routes,
        ...service_routes,
    ]
});


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next({
                name: 'login', query: { next: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
});


export default router
