<template>
  <div class="main-content-wrap section-ptb cart-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <form @submit.prevent="" class="cart-table">
            <div class="table-content table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th class="plantmore-product-thumbnail">Фото</th>
                  <th class="cart-product-name">Название</th>
                  <th class="plantmore-product-price">Цена</th>
                  <th class="plantmore-product-quantity">Кол-во</th>
                  <th class="plantmore-product-subtotal">Итого</th>
                  <th class="plantmore-product-remove">Убрать</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="cartItem in cartItemList" :key="cartItem.product.id">
                  <td class="plantmore-product-thumbnail">
                    <router-link :to="{name: 'product-detail', params: { productSlug: cartItem.product.slug }}">
                      <img v-if="cartItem.product.product_images && cartItem.product.product_images[0]"
                           :src="cartItem.product.product_images[0].image"
                           :alt="cartItem.product.title">
                      <img v-else src="@/assets/images/other/01.jpg" :alt="cartItem.product.title">
                    </router-link>
                  </td>
                  <td class="plantmore-product-name">
                    <router-link :to="{name: 'product-detail', params: { productSlug: cartItem.product.slug }}">
                      {{ cartItem.product.title }}
                    </router-link>
                  </td>
                  <td class="plantmore-product-price"><span class="amount">{{ cartItem.product.final_price }}</span></td>
                  <td class="plantmore-product-quantity">
                    <input :value="cartItem.quantity" @change="setToCart(cartItem.product, $event)" type="number" min="1" :max="cartItem.product.quantity">
                  </td>
                  <td class="product-subtotal"><span class="amount">{{ cartItem.amount }} р</span></td>
                  <td class="plantmore-product-remove"><a @click.prevent="removeFromCart(cartItem.product)"><i class="ion-close"></i></a></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-md-8">
                <div class="coupon-all">

                  <div class="coupon2">
                    <router-link :to="{name: 'shop', query: queryFilters}"  class="btn continue-btn">Вернуться в магазин</router-link>
                  </div>

                </div>
              </div>
              <div class="col-md-4 ml-auto">
                <div class="cart-page-total">
                  <ul>
                    <li>Итого <span>{{ cartTotalFull }} р</span></li>
                    <li v-if="cartTotalFull !== cartTotal">Итого со скидкой <span>{{ cartTotal }} р</span></li>
                  </ul>
                  <router-link :to="{name: 'checkout'}" class="proceed-checkout-btn">Оформить заказ</router-link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import {computed} from "vue";

  export default {
    name: "Cart",
    components: {
    },
    setup() {
      const store = useStore()

      let cartItemList = computed(() => store.getters["shop/cart/getCartItemList"]);

      let removeFromCart = (product) => store.dispatch('shop/cart/removeFromCart', product)

      function setToCart(product, event) {
        let quantity = event.target.value
        store.dispatch('shop/cart/setToCart', {'product': product, 'quantity': quantity})
      }

      let cartTotal = computed(() => store.getters["shop/cart/getCartTotal"]);
      let cartTotalFull = computed(() => store.getters["shop/cart/getCartTotalWithoutDiscount"]);

      let queryFilters = store.getters["shop/productList/getFiltersQuery"]

      store.dispatch('shop/cart/refreshCartItems')
      return {
        cartItemList,
        removeFromCart,
        setToCart,
        cartTotal,
        cartTotalFull,
        queryFilters,
      }
    },
  }
</script>

<style scoped>
.table-content table td{
  width: 140px;
}
.proceed-checkout-btn{
  background: #930000;
}
.btn::before{
  background-color: transparent;
}
</style>