

const service_routes = [
    {
        path: "/:catchAll(.*)",
        component: { render: (h) => h("div", ["404! Page Not Found!"]) },
    },
];


export default service_routes;
