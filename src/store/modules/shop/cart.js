import mainApi from "@/api/main_server/endpoints/root";


function setCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
}

function getCartFromLocalStorage() {
    let cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
}

const state = {
    'cart': getCartFromLocalStorage()
}

const getters = {
    getCartItemList: state => {
        return state.cart
    },
    getCartItemSlugs: state => {
        return state.cart.map(function(item) {
            return item.product.slug;
        });
    },
    getCartItem: (state) => (slug) => {
        return state.cart.find(cartItem => cartItem.product.slug === slug)
    },
    getCartTotal: state => {
        return state.cart.reduce((acc, cartItem) => {
            return (cartItem.quantity * cartItem.product.final_price) + acc;
        }, 0).toFixed(2);
    },
    getCartTotalWithoutDiscount: state => {
        return state.cart.reduce((acc, cartItem) => {
            return (cartItem.quantity * cartItem.product.price) + acc;
        }, 0).toFixed(2);
    },
}

const mutations = {
    setToCart (state, data) {
        let product = data.product
        let qty = data.quantity > 0 ? data.quantity : 1
        let rewrite = !!data.rewrite

        const cartItem = state.cart.find(item => item.product.slug === product.slug)

        if (!cartItem) {
            qty = product.quantity < qty ? product.quantity : qty
            state.cart.push({
                'product': product,
                'quantity': qty,
                'amount': qty * product.final_price,
            })
        } else {
            if (rewrite) {
                qty = product.quantity < qty ? product.quantity : qty
            } else {
                qty = product.quantity < cartItem.quantity + qty ? product.quantity - cartItem.quantity : qty
                qty = qty + cartItem.quantity
            }
            cartItem.quantity = qty
            cartItem.amount = cartItem.quantity * product.final_price
        }

        setCartToLocalStorage(state.cart)
    },
    removeFromCart (state, product) {
        const index = state.cart.findIndex(item => item.product.slug === product.slug)
        state.cart.splice(index, 1)

        setCartToLocalStorage(state.cart)
    },
    refreshCart (state, products) {
        products.forEach(function (prod){
            let currentItem = state.cart.find(cartItem => cartItem.product.slug === prod.slug)
            currentItem.product = prod
            if (currentItem.quantity > prod.quantity) {
                currentItem.quantity = prod.quantity
            }
        })
    }
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
    async refreshCart({commit, getters}) {
        let itemSlugs = getters["getCartItemSlugs"]
        if (!itemSlugs) {
            return
        }
        await mainApi.getProductList({'slug__in': itemSlugs.join(',')})
            .then(res => {
                commit('refreshCart', res.data.results)
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