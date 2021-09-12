<template>
  <div class="col-lg-3 order-lg-1 order-2">
    <!-- shop-sidebar-wrap start -->
    <div class="shop-sidebar-wrap">

      <!-- shop-sidebar start -->
      <div v-if="priceRange[0] && priceRange[1]"
           class="shop-sidebar mb-30">
        <h4 class="title">ФИЛЬТР ПО ЦЕНЕ</h4>
        <!-- filter-price-content start -->
        <div class="filter-price-content">
          <div class="price-slider mb-20">
            <vue-slider v-model="priceRange"
                        :lazy="true"
                        :min=productFilters.minPrice
                        :max=productFilters.maxPrice
                        :silent="true"
            />
          </div>
          <div class="filter-price-wapper">
            <div class="filter-price-cont">
              <div class="input-type">
                <input type="text" :value="priceRange[0]" readonly/>
              </div>
              <span>—</span>
              <div class="input-type">
                <input type="text"  :value="priceRange[1]" readonly/>
              </div>
              <a class="add-to-cart-button price-range-btn" @click="applyFilters()" href="#">
                <span>FILTER</span>
              </a>
            </div>
          </div>
        </div>
        <!-- filter-price-content end -->
      </div>
      <!-- shop-sidebar end -->

      <!-- shop-sidebar start -->
      <div class="shop-sidebar mb-30">
        <h4 class="title">КАТЕГОРИИ</h4>
        <ul>
          <li v-for="category in categoryList" :key="category.slug"
              :class="category.slug === productFilters.category ? 'active' : ''">
            <a @click.prevent="setFilters({'category': category.slug})">{{ category.title }}
              <span>{{ category.products_count }}</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- shop-sidebar end -->
    </div>
    <!-- shop-sidebar-wrap end -->
  </div>
</template>

<script>
  import mainApi from "../../api/main_server/endpoints/root";
  import {useStore} from 'vuex';
  import {computed} from "vue";
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/antd.css'

  export default {
    name: "Filters",
    data() {
      return {
        categoryList: [],
      }
    },
    mounted: async function() {
      await mainApi.getCategoryList()
          .then(res => {
            this.categoryList = res.data;
          });
    },
    components: {
      VueSlider
    },

    setup() {
      const store = useStore()

      let productFilters = computed(() => store.getters["catalog/filters/getFilters"])
      const setFilters = (filters) => store.dispatch('catalog/filters/setFilters', filters)

      let priceRange = computed({
            get() {
              return [productFilters.value.priceFrom, productFilters.value.priceTo]
            },
            set(newRange) {
              store.commit("catalog/filters/setFilters", {
                'priceFrom': newRange[0],
                'priceTo': newRange[1],
              })
            }
          }
      )

      const applyFilters = () => store.dispatch('catalog/productList/getProductList')

      return {
        productFilters,
        setFilters,
        priceRange,
        applyFilters,
      }
    }
  }
</script>

<style scoped>
  .filter-price-cont{
    margin-right: 60px;
  }
  .filter-price-cont .input-type input {
    width: 80px;
  }
  .price-range-btn{
    position: absolute;
    right: 0;
  }
</style>