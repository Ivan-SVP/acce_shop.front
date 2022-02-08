<template>
  <div class="main-content-wrap section-ptb product-details-page">
    <div class="container">
      <div class="row">
        <div class="col-xl-6 col-lg-7 col-md-6">
          <div class="product-details-images">
            <div class="product_details_container">
              <!-- product_big_images start -->
              <div class="product_big_images-right">
                <div class="portfolio-full-image tab-content">

                  <div v-for="(image, index) in product.product_images"
                       :key="image.id"
                       :id="'img-tab-' + index"
                       :class="'tab-pane product-image-position' + (index === 0 ? ' active' : '')"
                       role="tabpanel"
                  >
                    <a :href="image.image" class="img-poppu" target="_blank">
                      <img :src="image.image" :alt="product.title">
                    </a>
                  </div>
                </div>
              </div>
              <!-- product_big_images end -->

              <!-- Start Small images -->
              <ul class="product_small_images-left vartical-product-active nav" role="tablist">
                <li v-for="(image, index) in product.product_images"
                    :key="image.id"
                    :class="'pot-small-img' + (index === 0 ? ' active' : '')"
                    role="presentation"
                >
                  <a :href="'#img-tab-' + index" role="tab" data-toggle="tab">
                    <img :src="image.image" :alt="product.title">
                  </a>
                </li>
              </ul>
              <!-- End Small images -->
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-5 col-md-6">
          <!-- product_details_info start -->
          <div class="product_details_info">
            <h2>{{ product.title }}</h2>
            <!-- pro_details start -->
            <div class="pro_details">
              <p>{{ product.shot_description }}</p>
            </div>
            <!-- pro_details end -->
            <!-- pro_dtl_prize start -->
            <ul v-if="product.discount" class="pro_dtl_prize">
              <li class="old_prize">{{product.price}} ₽</li>
              <li >{{product.final_price}} ₽</li>
            </ul>
            <ul v-else class="pro_dtl_prize">
              <li>{{product.final_price}} ₽</li>
            </ul>
            <!-- pro_dtl_prize end -->
            <!-- product-quantity-action start -->
            <div class="product-quantity-action">
              <div class="prodict-statas"><span>Количество :</span></div>
              <div class="product-quantity">
                <div class="product-quantity">
                  <input v-model="quantity" type="number" :max="countProductsAvailable" min="0">
                </div>
              </div>
            </div>
            <!-- product-quantity-action end -->
            <!-- pro_dtl_btn start -->
            <ul class="pro_dtl_btn">
              <li>
                <a href="#" class="buy_now_btn" @click.prevent="addToCart">в корзину</a>
                <span v-if="cartItem" class="text-success"> ({{cartItem.quantity}} уже в корзине)</span>
              </li>
  <!--            <li><a href="#"><i class="ion-heart"></i></a></li>-->
            </ul>
            <!-- pro_dtl_btn end -->
          </div>
          <!-- product_details_info end -->
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="product-details-tab mt-60">
            <ul role="tablist" class="mb-50 nav">
              <li class="active" role="presentation">
                <a data-toggle="tab" role="tab" href="#description" class="active">Описание</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12">
          <div class="product_details_tab_content tab-content">
            <!-- Start Single Content -->
            <div class="product_tab_content tab-pane active" id="description" role="tabpanel">
              <div class="product_description_wrap">
                <div class="product_desc mb--30">
                  <p>{{ product.description }}</p>
                </div>
              </div>
            </div>
            <!-- End Single Content -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import {useRouter} from "vue-router";
  import {computed, ref} from "vue";

  export default {
    name: "ProductDetail",
    components: {
    },
    setup() {
      const store = useStore()
      const router = useRouter()
      let quantity = ref(0)

      let product = computed(() => {
        let p = store.getters['shop/productDetail/getProduct']
        if (p.quantity) {
          quantity.value = 1
        }
        return p
      })
      store.dispatch("shop/productDetail/getProduct", router.currentRoute.value.params.productSlug)

      function addToCart() {
        if (quantity.value === 0) {
          return
        }
        store.dispatch('shop/cart/addToCart', {'product': product.value, 'quantity': quantity.value})
      }

      let cartItem = computed(() => store.getters["shop/cart/getCartItem"](product.value.slug))

      let countProductsAvailable = computed(function () {
        if (!product) {
          return 0
        }
        let p = product.value

        if (!p.quantity) {
          return 0
        }

        if (cartItem.value) {
          let qty = p.quantity - cartItem.value.quantity
          if (qty === 0) {
            quantity.value = 0
          } else {
            if (quantity.value === 0) {
              quantity.value = 1
            }
          }
          return qty
        } else {
          if (quantity.value === 0) {
            quantity.value = 1
          }
        }
        return p.quantity
      })


      return {
        store,
        router,
        product,
        quantity,
        addToCart,
        countProductsAvailable,
        cartItem,
      }
    },
  }
</script>

<style scoped>
.product-quantity-action .product-quantity input {
  width: 60px;
}
.buy_now_btn{
  display: inline-block;
}
</style>