import mainApi from "@/api/main_server/endpoints/root";

const state = {
    'name': null,
    'email': null,
    'phone': null,
    'address': null,
    'comment': null,

    'lastOrderNumber': null,
}

const getters = {
    getCheckoutData: state => {
        return {
            'name': state.name,
            'email': state.email,
            'phone': state.phone,
            'address': state.address,
            'comment': state.comment,
        }
    },
    getLastOrderNumber: state => {
        return state.lastOrderNumber
    }
}

const mutations = {
    setName (state, newName) {
        state.name = newName
    },
    setEmail (state, newEmail) {
        state.email = newEmail
    },
    setPhone (state, newPhone) {
        state.phone = newPhone
    },
    setAddress (state, newAddress) {
        state.address = newAddress
    },
    setComment (state, newComment) {
        state.comment = newComment
    },
    setLastOrderNumber (state, number) {
        state.lastOrderNumber = number
    },
}

const actions = {
    async createOrder({commit, getters, rootGetters, dispatch}) {
        let checkoutData = getters['getCheckoutData'];
        Object.assign(checkoutData, rootGetters["shop/cart/getCartDataForBackend"])

        await mainApi.createOrder(checkoutData)
            .then(res => {
                console.log(res)
                dispatch('shop/cart/clearCart', {}, {root:true})
                commit('setLastOrderNumber', res.data.id)
            })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}