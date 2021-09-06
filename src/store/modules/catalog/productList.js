import mainApi from "@/api/main_server/endpoints/root";


const state = () => ({
    productList: [],
    sortBy: 'title',
    paginator: {
        'currentPage': 1,
        'page_size': 20,
        'count': 0,
    },

})

const getters = {
    getProductList: state => {
        return state.productList
    },
    getPaginatorParams: state => {
        return state.paginator
    },
    getSortParams: () => {
        return [
            {'key': 'title', 'value': 'А-Я'},
            {'key': '-title', 'value': 'Я-А'},
            {'key': 'price', 'value': 'Сначала дешвле'},
            {'key': '-price', 'value': 'Сначала дороже'},
        ]
    },
}

const actions = {
    async getProductList({commit, state, rootGetters}) {
        await mainApi.getProductList(
            {
                'ordering': state.sortBy,
                'page_size': state.paginator.page_size,
                'page': state.paginator.currentPage,
                ...rootGetters["catalog/filters/getFiltersBack"]
            },
        )
            .then(res => {
                commit('setProductList', res.data.results);
                commit('updatePaginator', {
                    'count': res.data.count,
                    'page_size': res.data.page_size,
                });

                let filtersForUpdate = {
                    'minPrice': res.data.min_price || 0,
                    'maxPrice': res.data.max_price || 0,
                }
                if (state.priceFrom < filtersForUpdate.min_price) {
                    filtersForUpdate['priceFrom'] = filtersForUpdate.minPrice
                }
                if (!state.priceTo || state.priceTo > filtersForUpdate) {
                    filtersForUpdate['priceTo'] = filtersForUpdate.maxPrice
                }
                commit('catalog/filters/setFilters', filtersForUpdate, {root: true})
            })
            .catch(() => {
                commit('setProductList', []);
                commit('updatePaginator', {
                    'count': 0,
                });
            })

    },
    async sortBy ({commit}, sortParam) {
        commit('setSortBy', sortParam);
        this.dispatch('catalog/productList/getProductList');
    },
    async setCurrentPage ({commit}, page) {
        commit("setCurrentPage", page);
        this.dispatch('catalog/productList/getProductList');
    },
}

const mutations = {
    setProductList (state, productList) {
        state.productList = productList
    },
    setSortBy (state, sortParam) {
        state.sortBy = sortParam
    },
    updatePaginator (state, params) {
        state.paginator['count'] = params.count || 0
        state.paginator['page_size'] = params.page_size || 20
    },
    setCurrentPage (state, page) {
        state.paginator['currentPage'] = page
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}