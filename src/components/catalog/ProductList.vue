<template>
  <div class="col-lg-9 order-lg-2 order-1">
    <!-- shop-product-wrapper start -->
    <div class="shop-product-wrapper">
      <div class="row">
        <div class="col">
          <!-- shop-top-bar start -->
          <div class="shop-top-bar">
            <!-- product-view-mode start -->

            <div class="product-mode">
              <!--shop-item-filter-list-->
<!--              <ul class="nav shop-item-filter-list" role="tablist">-->
<!--                <li class="active"><a class="active" data-toggle="tab" href="#grid"><i class="ion-ios-keypad-outline"></i></a></li>-->
<!--                <li><a data-toggle="tab" href="#list"><i class="ion-ios-list-outline"></i></a></li>-->
<!--              </ul>-->
              <!-- shop-item-filter-list end -->
            </div>
            <!-- product-view-mode end -->
            <!-- product-short start -->
            <div class="product-short">
              <select class="nice-select" v-model="sortedBy" @change="sortBy(sortedBy)">
                <option v-for="param in sortParams" :key="param.key" :value="param.key">
                  {{param.value}}
                </option>
              </select>
            </div>
            <!-- product-short end -->
          </div>
          <!-- shop-top-bar end -->
        </div>
      </div>

      <!-- shop-products-wrap start -->
      <div class="shop-products-wrap">
        <div class="tab-content">
          <div class="tab-pane active" id="grid">
            <div class="shop-product-wrap">
              <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-6 col-"
                     v-for="product in productList"
                     :key="product.id"
                >
                  <!-- single-product-wrap start -->
                  <div class="single-product-wrap">
                    <div class="product-image">
                      <router-link :to="{name: 'product-detail', params: { slug: product.slug }}">
                        <img v-if="product.product_images[0]" :src="product.product_images[0].image" :alt="product.title">
                        <img v-else src="@/assets/images/product/product-01.jpg" :alt="product.title">
                      </router-link>
                      <span v-if="product.discount" class="label">-{{product.discount}} %</span>
                      <div class="product-action">
                        <a href="#" class="add-to-cart"><i class="ion-bag"></i></a>
                        <a href="#" class="wishlist"><i class="ion-android-favorite-outline"></i></a>
                        <a href="#" class="quick-view" data-toggle="modal" data-target="#exampleModalCenter"><i class="ion-ios-search"></i></a>
                      </div>
                    </div>
                    <div class="product-content">
                      <h3>
                        <router-link :to="{name: 'product-detail', params: { slug: product.slug }}" :alt="product.title">
                          {{product.title}}
                        </router-link>
                      </h3>
                      <div v-if="product.discount" class="price-box">
                        <span class="old-price">{{product.price}} ₽</span>
                        <span class="new-price">{{product.discount_price}} ₽</span>
                      </div>
                      <div v-else class="price-box">
                        <span>{{product.price}} ₽</span>
                      </div>
                    </div>
                  </div>
                  <!-- single-product-wrap end -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- shop-products-wrap end -->

      <!-- paginatoin-area start -->
      <ProductListPaginator/>
      <!-- paginatoin-area end -->
    </div>
    <!-- shop-product-wrapper end -->
  </div>
</template>

<script>

  import { useStore } from 'vuex';
  import {computed, ref} from "vue";
  import ProductListPaginator from './ProductListPaginator'

  export default {
    name: "ProductList",
    components: {
      ProductListPaginator,
    },
    setup() {
      const store = useStore()

      store.dispatch('catalog/productList/getProductList', {'updatePriceRange': true})

      let productList = computed(() => store.getters["catalog/productList/getProductList"]);

      let sortedBy = ref(store.state.catalog.productList.sortBy)
      let sortBy = (sortParam) => store.dispatch('catalog/productList/sortBy', sortParam)
      let sortParams = store.getters["catalog/productList/getSortParams"];

      return {
        productList,

        sortedBy,
        sortBy,
        sortParams,
      }
    }
  }
</script>

<style scoped>
  .product-image{
    width: 100%;
    padding-top: 100%; /* 1:1 Aspect Ratio */
    position: relative;
  }
  .product-image > a, .product-image > a img{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .product-image > a img{
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    margin: auto;
    display: block;
  }

  .product-content{
    overflow: hidden;
  }
  .product-content > h3{
    max-width: 100%;
    white-space: nowrap;
  }
</style>