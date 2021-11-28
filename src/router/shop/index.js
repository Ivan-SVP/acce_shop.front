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
                meta: {'pageTitle': 'Каталог'},
                component: () => import('../../views/shop/MainCatalog'),
            },
            {
                path: 'shop/:productSlug',
                name: 'product-detail',
                meta: {'pageTitle': 'Карточка товара'},
                component: () => import('../../views/shop/ProductDetail'),
            },
            {
                path: 'cart',
                name: 'cart',
                meta: {'pageTitle': 'Корзина'},
                component: () => import('../../views/shop/Cart'),
            },
            {
                path: 'checkout',
                name: 'checkout',
                meta: {'pageTitle': 'Оформление заказа'},
                component: () => import('../../views/shop/Checkout'),
            },
            {
                path: 'thank-you',
                name: 'thank-you',
                component: () => import('../../views/shop/ThankYou'),
            },
            {
                path: 'contacts',
                name: 'contacts',
                meta: {'pageTitle': 'Контакты'},
                component: () => import('../../views/shop/Contacts'),
            },
            {
                path: 'about',
                name: 'about',
                meta: {'pageTitle': 'О нас'},
                component: () => import('../../views/shop/About'),
            },
        ],
    },
];


export default shop_routes;
