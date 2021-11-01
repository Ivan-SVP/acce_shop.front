import mainApi from "@/api/main_server/endpoints/root";

const state = {
    'name': 'name',
    'email': 'email@mail.ru',
    'phone': '89041683641',
    'address': null,
    'comment': null,
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
}

const actions = {
    async createOrder({commit, getters, rootGetters, dispatch}) {
        let checkoutData = getters['getCheckoutData'];
        Object.assign(checkoutData, rootGetters["shop/cart/getCartDataForBackend"])

        await mainApi.createOrder(checkoutData)
            .then(res => {
                console.log(res)
                dispatch('shop/cart/clearCart', {}, {root:true})
            })
            // TODO validation
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}