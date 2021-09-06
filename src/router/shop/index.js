const shop_routes = [
    {
        path: '/',
        name: 'shop',
        meta: {'layout': 'main'},
        component: () => import('../../views/shop/BaseShop.vue'),
        redirect: {name: 'main-catalog'},
        children: [
            {
                path: 'catalog',
                name: 'main-catalog',
                component: () => import('../../views/shop/MainCatalog'),
            },
            {
                path: 'catalog/:slug',
                name: 'product-detail',
                component: () => import('../../views/shop/MainCatalog'),
            },

        ],
    },


];


export default shop_routes;
