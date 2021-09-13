const getDefaultState = () => {
    return {
        category: 'category-1',

        minPrice: null,  // границы слайдера цен
        maxPrice: null,
        priceFrom: null,  // выбранный на слайдере диапазон
        priceTo: null,

        searchText: null
    }
}

const state = getDefaultState()

const getters = {
    getFilters: state => {
        return {
            'category': state.category,
            'minPrice': state.minPrice,
            'maxPrice': state.maxPrice,
            'priceFrom': state.priceFrom,
            'priceTo': state.priceTo,
            'searchText': state.searchText,
        }
    },
    getFiltersBack: state => {  // для запросав на бэк
        return {
            'category__slug': state.category,
            'price__gte': state.priceFrom,
            'price__lte': state.priceTo,
            'search': state.searchText,
        }
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
    setFilters ({commit}, payload) {
        commit("setFilters", payload)

        delete payload.priceFrom
        delete payload.priceTo
        delete payload.minPrice
        delete payload.maxPrice

        let params = {}
        if (payload) {
            params['updatePriceRange'] = true
        }

        this.dispatch('catalog/productList/getProductList', params)
    },
    cleanFilters ({commit}) {
        commit("cleanFilters")

        let params = {'updatePriceRange': true}
        this.dispatch('catalog/productList/getProductList', params)
    },
}

const mutations = {
    setFilters(state, payload) {
        Object.keys(payload).forEach(function (key) {
            state[key] = payload[key]
        });
    },
    cleanFilters(state) {
        Object.assign(state, getDefaultState())
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}