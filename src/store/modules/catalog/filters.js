
const state = () => ({
    category: 'category-1',

    minPrice: null,  // границы слайдера цен
    maxPrice: null,
    priceFrom: null,  // выбранный на слайдере диапазон
    priceTo: null,

    searchText: null
})

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
}

const mutations = {
    setFilters (state, payload) {
        if (payload.maxPrice && typeof payload.maxPrice == 'number') {
            payload.maxPrice++
        }
        console.log(payload)
        Object.keys(payload).forEach(function(key) {
            state[key] = payload[key]
        });
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}