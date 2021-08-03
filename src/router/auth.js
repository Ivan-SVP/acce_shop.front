

const auth_routes = [
    {
        path: '/login',
        name: 'login',
        meta: {'layout': 'empty'},
        component: () => import('../views/auth/Login.vue')
    },
];


export default auth_routes;
