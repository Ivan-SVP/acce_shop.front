import mainApi from "@/api/main_server/endpoints/root";

const getDefaultState = () => {
    return {
        product: {},
    }
}

const state = getDefaultState()

const getters = {
    getProduct: state => {
        return state.product
    },
}

const actions = {
    async getProduct({commit}, productSlug) {

        await mainApi.getProduct(productSlug)
            .then(res => {
                commit('setProduct', res.data);
            })
            .catch(() => {
            })
    },
}

const mutations = {
    setProduct (state, productData) {
        state.product = productData
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}