// import vm from "@/main";
import VueRouter from 'vue-router'
import Vue from "vue";
import store from "@/store"

import catalog_routes from "@/router/catalog";
import auth_routes from "@/router/auth";
import main_routes from "@/router/main";
import service_routes from "@/router/service";


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
      ...main_routes,
      ...catalog_routes,

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