

const catalog_routes = [
    {
        path: '/catalog',
        name: 'main-catalog',
        meta: {'layout': 'main'},
        component: () => import('../../views/catalog/MainCatalog.vue'),
    },
];


export default catalog_routes;
