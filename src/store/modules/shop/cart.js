import mainApi from "@/api/main_server/endpoints/root";
import {v4 as uuidv4} from "uuid";


function createEmptyCart() {
    return {
        'cartItems': [],
        'uuid': uuidv4(),
    }
}

function getOrCreateCartFromLocalStorage() {
    let cart = localStorage.getItem('cart');

    if (!cart) {
        cart = createEmptyCart();
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    if (typeof cart === 'string') {
        cart = JSON.parse(cart)
    }
    return cart
}

function updateCartItemsOfLocalStorage(cartItems) {
    let cart = getOrCreateCartFromLocalStorage()
    cart['cartItems'] = cartItems
    localStorage.setItem('cart', JSON.stringify(cart))
}

function clearLocalStorageCart() {
    localStorage.setItem('cart', JSON.stringify(createEmptyCart()))
}


const state = getOrCreateCartFromLocalStorage()

const getters = {
    getCartItemList: state => {
        return state.cartItems
    },
    getCartDataForBackend: state => {
        let cartItems = state.cartItems.map(function(item) {
            return  {
                'product': item.product.slug,
                'price': item.product.final_price,
                'quantity': item.quantity,
            }
        });

        return {
            'uuid': state.uuid,
            'order_items': cartItems,
        }
    },
    getCartItemSlugs: state => {
        return state.cartItems.map(function(item) {
            return item.product.slug;
        });
    },
    getCartItem: (state) => (slug) => {
        return state.cartItems.find(cartItem => cartItem.product.slug === slug)
    },
    getCartTotal: state => {
        return state.cartItems.reduce((acc, cartItem) => {
            return (cartItem.quantity * cartItem.product.final_price) + acc;
        }, 0).toFixed(2);
    },
    getCartTotalWithoutDiscount: state => {
        return state.cartItems.reduce((acc, cartItem) => {
            return (cartItem.quantity * cartItem.product.price) + acc;
        }, 0).toFixed(2);
    },
}

const mutations = {
    setToCart (state, data) {
        let product = data.product
        let qty = data.quantity > 0 ? data.quantity : 1
        let rewrite = !!data.rewrite

        const cartItem = state.cartItems.find(item => item.product.slug === product.slug)

        if (!cartItem) {
            qty = product.quantity < qty ? product.quantity : qty
            state.cartItems.push({
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

        updateCartItemsOfLocalStorage(state.cartItems)
    },
    removeFromCart (state, product) {
        const index = state.cartItems.findIndex(item => item.product.slug === product.slug)
        state.cartItems.splice(index, 1)

        updateCartItemsOfLocalStorage(state.cartItems)
    },
    refreshCartItems (state, products) {
        products.forEach(function (prod){  // TODO убирать/обнулять, которые не пришли
            let currentItem = state.cartItems.find(cartItem => cartItem.product.slug === prod.slug)
            currentItem.product = prod
            if (currentItem.quantity > prod.quantity) {
                currentItem.quantity = prod.quantity
            }
        })
        updateCartItemsOfLocalStorage(state.cartItems)
    },
    syncFromLocalStorage (state) {
        Object.assign(state, getOrCreateCartFromLocalStorage())
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
    async refreshCartItems({commit, getters}) {
        let itemSlugs = getters["getCartItemSlugs"]
        if (!itemSlugs.length) {
            return
        }
        await mainApi.getProductList({'slug__in': itemSlugs.join(',')})
            .then(res => {
                commit('refreshCartItems', res.data.results)
            })
    },
    clearCart({commit}) {
        clearLocalStorageCart()
        commit('syncFromLocalStorage')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}