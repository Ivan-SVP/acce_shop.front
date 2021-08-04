
const shop_routes = [
    {
        path: '/shop',
        name: 'shop',
        meta: {'layout': 'shop'},
        component: {
            render: (c) => c('router-view'),
        },
        redirect: { name: 'main-catalog'},
        children: [
            {
                path: 'catalog',
                name: 'main-catalog',
                component: () => import('../../views/shop/MainCatalog'),
            },
        ],
    },
];


export default shop_routes;
