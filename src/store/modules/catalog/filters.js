
const state = () => ({
    category: 'category-1',

    minPrice: 0,  // границы слайдера цен
    maxPrice: 0,
    priceFrom: 0,  // выбранный на слайдере диапазон
    priceTo: 0,
})

const getters = {
    getFilters: state => {
        return {
            'category': state.category,
            'minPrice': state.minPrice,
            'maxPrice': state.maxPrice,
            'priceFrom': state.priceFrom,
            'priceTo': state.priceTo,
        }
    },
    getFiltersBack: state => {  // для запросав на бэк
        return {
            'category': state.category,
            'price__gte': state.priceFrom,
            'price__lt': state.priceTo,
        }
    },
}

const actions = {
    setFilters ({commit}, payload) {
        commit("setFilters", payload)
        this.dispatch('catalog/productList/getProductList')
    },
}

const mutations = {
    setFilters (state, payload) {
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