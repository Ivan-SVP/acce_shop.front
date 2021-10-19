import mainApi from "@/api/main_server/endpoints/root";

const getDefaultState = () => {
    return {
        productList: [],

        paginator: {
            'currentPage': 1,
            'page_size': 20,
            'count': 0,
        },

        // сортировка, фильтры, поиск
        sortBy: 'title',

        category: 'category-1',

        minPrice: null,  // границы слайдера цен
        maxPrice: null,
        priceFrom: null,  // выбранный на слайдере диапазон
        priceTo: null,

        searchText: null,
        updatePriceRange: true,
    }
}

const state = getDefaultState()

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
    getFilters: state => {
        return {
            'category': state.category,
            'minPrice': Number(state.minPrice),
            'maxPrice': Number(state.maxPrice),
            'priceFrom': Number(state.priceFrom),
            'priceTo': Number(state.priceTo),
            'searchText': state.searchText,
            'updatePriceRange': state.updatePriceRange,
        }
    },
    getFiltersQuery: state => {
        let filters = {
            'category': state.category,
            'sortBy': state.sortBy,
            'updatePriceRange': true,
            'currentPage': state.currentPage,
        }
        if (state.searchText) {
            filters['searchText'] = state.searchText
        }
        return filters
    },
    getFiltersBack: state => {  // для запросав на бэк
        let result = {
            'ordering': state.sortBy,

            'category__slug': state.category,
            'price__gte': state.priceFrom,
            'price__lte': state.priceTo,

            'page_size': state.paginator.page_size,
            'page': state.paginator.currentPage,
        }
        if (state.updatePriceRange) {
            result['update_price_range'] = state.updatePriceRange
        }
        if (state.searchText) {
            result['search'] = state.searchText
        }
        return result
    },
    isFiltered: state => {
        return (
            (state.priceFrom && state.priceFrom > state.minPrice) ||
            (state.priceTo && state.priceTo < state.maxPrice) ||
            state.searchText
        )
    },

}

const actions = {
    async getProductList({commit, getters}) {

        await mainApi.getProductList(getters['getFiltersBack'])
            .then(res => {
                commit('setProductList', res.data.results);

                commit('updatePaginator', {
                    'count': res.data.count,
                    'page_size': res.data.page_size,
                });
                let currentFilters = getters["getFilters"]
                if (currentFilters.updatePriceRange) {
                    if (typeof res.data.min_price == 'number' && typeof res.data.max_price == 'number') {

                        let filtersForUpdate = {
                            'minPrice': res.data.min_price,
                            'maxPrice': res.data.max_price,
                        }
                        if (!currentFilters.priceFrom || filtersForUpdate.maxPrice < currentFilters.priceFrom < filtersForUpdate.minPrice) {
                            filtersForUpdate['priceFrom'] = filtersForUpdate.minPrice
                        }
                        if (!currentFilters.priceTo || filtersForUpdate.maxPrice < currentFilters.priceTo < filtersForUpdate.minPrice) {
                            filtersForUpdate['priceTo'] = filtersForUpdate.maxPrice
                        }
                        commit('shop/productList/setFilters', filtersForUpdate, {root: true})
                    }
                }
            })
            .catch(() => {
                commit('setProductList', []);
                commit('updatePaginator', {
                    'count': 0,
                });
            })

    },
    async setCurrentPage ({commit}, page) {
        commit("setCurrentPage", page);
        this.dispatch('shop/productList/getProductList');
    },
    async setFilters ({commit}, payload) {
        payload['updatePriceRange'] = (
            'category' in payload ||
            'search' in payload
        );
        commit("setFilters", payload)

        if (payload.page) {
            commit("setCurrentPage", Number(payload.page))
        }

        this.dispatch('shop/productList/getProductList')
    },
    async cleanFilters ({commit}) {
        commit("cleanFilters")
        this.dispatch('shop/productList/getProductList')
    },
}

const mutations = {
    setProductList (state, productList) {
        state.productList = productList
    },
    updatePaginator (state, params) {
        state.paginator['count'] = params.count || 0
        state.paginator['page_size'] = params.page_size || 20
    },
    setCurrentPage (state, page) {
        state.paginator['currentPage'] = page
    },
    setNeedUpdatePriceRange(state, value) {
        state.update_price_range = value
    },

    setFilters(state, payload) {
        Object.keys(payload).forEach(function (key) {
            state[key] = payload[key]
        });
    },
    cleanFilters(state) {
        let default_filters = {
            'category': 'category-1',

            'minPrice': null,  // границы слайдера цен
            'maxPrice': null,
            'priceFrom': null,  // выбранный на слайдере диапазон
            'priceTo': null,

            'searchText': null,
            'updatePriceRange': true,
        }
        Object.assign(state, default_filters)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}