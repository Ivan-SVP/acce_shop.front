<template>
  <div class="main-content-wrap section-ptb checkout-page">
    <div class="container">
      <!-- checkout-details-wrapper start -->
      <div class="checkout-details-wrapper">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <!-- billing-details-wrap start -->
            <div class="billing-details-wrap">
              <form action="#">
                <h3 class="shoping-checkboxt-title">Ваши данные</h3>
                <div class="row">
                  <div class="col-lg-12">
                    <p class="single-form-row">
                      <label>Имя / ФИО (для доставки) <span class="required">*</span></label>
                      <input v-model="name" type="text" name="email" placeholder="Иван" required>
                    </p>
                  </div>
                  <div class="col-lg-12">
                    <p class="single-form-row">
                      <label>Email <span class="required">*</span></label>
                      <input v-model="email" type="email" name="email" placeholder="ivan@mail.ru" required>
                    </p>
                  </div>
                  <div class="col-lg-12">
                    <p class="single-form-row">
                      <label>Телефон <span class="required">*</span></label>
                      <input v-model="phone" type="text" name="phone" placeholder="88009008090" required>
                    </p>
                  </div>
                  <div class="col-lg-12">
                    <p class="single-form-row m-0">
                      <label>Адрес(для доставки)</label>
                      <textarea v-model="address" class="checkout-mess" rows="2" cols="5"></textarea>
                    </p>
                  </div>
                  <div class="col-lg-12">
                    <p class="single-form-row m-0">
                      <label>Комментарий (предпочтительный способ связи, время и пр.)</label>
                      <textarea v-model="comment" class="checkout-mess" rows="2" cols="5"></textarea>
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <!-- billing-details-wrap end -->
          </div>
          <div class="col-lg-6 col-md-6">
            <!-- your-order-wrapper start -->
            <div class="your-order-wrapper">
              <h3 class="shoping-checkboxt-title">Ваш заказ</h3>
              <!-- your-order-wrap start-->
              <div class="your-order-wrap">
                <!-- your-order-table start -->
                <div class="your-order-table table-responsive">
                  <table>
                    <thead>
                    <tr>
                      <th class="product-name">Товар</th>
                      <th class="product-total">Итого</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="cartItem in cartItemList" :key="cartItem.product.id"
                        :class="'cart_item' + (cartItem.quantity ? '' : ' text-danger')"
                    >
                      <td class="product-name">
                        {{ cartItem.product.title }} <strong class="product-quantity"> × {{ cartItem.quantity }}</strong>
                      </td>
                      <td class="product-total">
                        <span class="amount">{{ cartItem.amount }} р</span>
                      </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr class="order-total">
                      <th>Итого</th>
                      <td><strong><span class="amount">{{ cartTotal }} р</span></strong>
                      </td>
                    </tr>
                    </tfoot>
                  </table>
                </div>
                <!-- your-order-table end -->

                <!-- your-order-wrap end -->
                <div class="payment-method">
                  <div class="payment-accordion">
                    <!-- ACCORDION START -->
                    <h5>Оплата</h5>
                    <div class="payment-content">
                      <p style="font-weight: bold">Оплата осуществляется одним из способов:</p>
                      <p> - по выставленному счету/ссылке</p>
                      <p> - при получении</p>
                      <p> - переводом на карту</p>
                      <p>Оплатить можно, как только мы убедимся, что все позиции в наличии.</p>
                    </div>
                    <!-- ACCORDION END -->
                    <!-- ACCORDION START -->
                    <h5 class="mt-10">Доставка</h5>
                    <div class="payment-content">
                      <p>Доставка возможна почтой, транстпортными компаниями(любыми популярными).</p>
                      <p>Стоимость зависит от категории, товара(вес, габаритные размеры) и суммы заказа и может снижаться <span class="text-danger">до 0р.</span> </p>
                    </div>
                    <!-- ACCORDION END -->
                    <!-- ACCORDION START -->
                    <h5 class="mt-10">Что дальше</h5>
                    <div class="payment-content">
                      <p>Мы проверим фактическое наличие и сотояние товара -> согласуем с вами детали заказа, доставки, оплаты -> передадим заказ оператору доставки, а вам - трек номер.</p>
                    </div>
                    <!-- ACCORDION END -->
                  </div>
                  <div class="order-button-payment">
                    <input type="submit" value="Оформить заказ" @click.prevent="createOrder()" />
                    <p class="text-danger">{{ orderError }}</p>
                  </div>
                </div>
                <!-- your-order-wrapper start -->

              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- checkout-details-wrapper end -->
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import {computed, ref, watch} from "vue";
  import {useRouter} from "vue-router";

  export default {
    name: "Checkout",
    components: {
    },
    setup() {
      const store = useStore()
      const router = useRouter()

      let cartItemList = computed(() => store.getters["shop/cart/getCartItemList"]);
      let cartTotal = computed(() => store.getters["shop/cart/getCartTotal"]);

      let checkoutData = store.getters['shop/checkout/getCheckoutData']
      let name = ref(checkoutData.name)
      let email = ref(checkoutData.email)
      let phone = ref(checkoutData.phone)
      let address = ref(checkoutData.address)
      let comment = ref(checkoutData.comment)

      watch(name, (newName) => {
        store.commit('shop/checkout/setName', newName)
      })
      watch(email, (newEmail) => {
        store.commit('shop/checkout/setEmail', newEmail)
      })
      watch(phone, (newPhone) => {
        store.commit('shop/checkout/setPhone', newPhone)
      })
      watch(address, (newAddress) => {
        store.commit('shop/checkout/setAddress', newAddress)
      })
      watch(comment, (newComment) => {
        store.commit('shop/checkout/setComment', newComment)
      })

      let orderError = ref('');
      async function createOrder(){
        if (!name.value || !email.value || !phone.value) {
          orderError.value = 'Заполните обязательные поля!'
          return
        }
        if (length.cartItemList < 1) {
          orderError.value = 'Заказ не может быть пустым.'
          return
        }

        await store.dispatch('shop/checkout/createOrder').then(
            () => {
              orderError.value = ''
              router.push({'name': 'thank-you'})
            }, error => {
              let error_message = error.response.data['order_items']
              if (!error_message) {
                orderError.value = 'Произошла непредвиденная ошибка, не удалось создать заказ.'
              } else {
                orderError.value = String(error_message)
              }
            }
        )
      }

      store.dispatch('shop/cart/refreshCartItems')
      return {
        cartItemList,
        cartTotal,
        checkoutData,

        name,
        email,
        phone,
        address,
        comment,

        createOrder,
        orderError,
      }
    },
  }
</script>

<style scoped>
</style>