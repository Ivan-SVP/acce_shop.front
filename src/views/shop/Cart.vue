<template>
  <div class="main-content-wrap section-ptb cart-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <form action="#" class="cart-table">
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
                    <input :value="cartItem.quantity" type="number">
                  </td>
                  <td class="product-subtotal"><span class="amount">{{ cartItem.amount }}</span></td>
                  <td class="plantmore-product-remove"><a @click="removeFromCart(cartItem.product)"><i class="ion-close"></i></a></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-md-8">
                <div class="coupon-all">

                  <div class="coupon2">
                    <input class="submit btn" name="update_cart" value="Update cart" type="submit">
                    <a href="shop.html" class="btn continue-btn">Continue Shopping</a>
                  </div>

                  <div class="coupon">
                    <h3>Coupon</h3>
                    <p>Enter your coupon code if you have one.</p>
                    <input id="coupon_code" class="input-text" name="coupon_code" value="" placeholder="Coupon code" type="text">
                    <input class="button" name="apply_coupon" value="Apply coupon" type="submit">
                  </div>
                </div>
              </div>
              <div class="col-md-4 ml-auto">
                <div class="cart-page-total">
                  <h2>Cart totals</h2>
                  <ul>
                    <li>Subtotal <span>$170.00</span></li>
                    <li>Total <span>$170.00</span></li>
                  </ul>
                  <a href="#" class="proceed-checkout-btn">Proceed to checkout</a>
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

      return {
        cartItemList,
        removeFromCart,
      }
    },
  }
</script>

<style scoped>
</style>