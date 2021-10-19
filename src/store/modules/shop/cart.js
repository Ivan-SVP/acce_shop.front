
function setCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
}

function getCartFromLocalStorage() {
    let cart = localStorage.getItem('cart')  // TODO делать запрос на бэк, обновлять продукты
    return cart ? JSON.parse(cart) : []
}

const state = {
    'cart': getCartFromLocalStorage()
}

const getters = {
    getCartItemList: state => {
        return state.cart
    },
    getCartTotal: state => {
        return state.cart.reduce((acc, cartItem) => {
            return (cartItem.quantity * cartItem.product.final_price) + acc;
        }, 0).toFixed(2);
    },
}

const mutations = {
    setToCart (state, data) {
        let product = data.product
        let qty = data.qty || 1
        let rewrite = !!data.rewrite

        const cartItem = state.cart.find(item => item.product.id === product.id)

        if (!cartItem) {
            state.cart.push({
                'product': product,
                'quantity': qty,
                'amount': qty * product.final_price,
            })
        } else {
            cartItem.quantity = rewrite ? qty : cartItem.quantity + qty
            cartItem.amount = cartItem.quantity * product.final_price
        }

        setCartToLocalStorage(state.cart)
        console.log(state.cart)
    },
    removeFromCart (state, product) {
        const index = state.cart.findIndex(item => item.id === product.id)
        state.cart.splice(index, 1)

        setCartToLocalStorage(state.cart)
    },
}

const actions = {
    addToCart({commit}, data) {
        data.rewrite = false
        commit('setToCart', data)
    },
    setToCart({commit}, data) {
        data.rewrite = true
        commit('setToCart', data)
    },
    removeFromCart({commit}, product) {
        commit('removeFromCart', product)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}