<template>
  <div class="col-lg-3 order-lg-1 order-2">
    <!-- shop-sidebar-wrap start -->
    <div class="shop-sidebar-wrap">

      <!-- shop-sidebar start -->
      <div v-if="isFiltered" class="shop-sidebar mb-30 clean-filters">
        <h4 class="title">УБРАТЬ ФИЛЬТРЫ</h4>
        <div class="sidebar-search-icon" @click="cleanFilters()">
          <button class="search-close">
            <span class="ion-android-close"></span>
          </button></div>
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
              <a class="add-to-cart-button price-range-btn" @click.prevent="applyPriceRange()" href="#">
                <span>FILTER</span>
              </a>
            </div>
          </div>
        </div>
        <!-- filter-price-content end -->
      </div>
      <!-- shop-sidebar end -->

    </div>
    <!-- shop-sidebar-wrap end -->
  </div>
</template>

<script>
  import mainApi from "../../api/main_server/endpoints/root";
  import {useStore} from 'vuex';
  import {computed, inject, ref} from "vue";
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
      const setFilters  = inject('setFilters');

      let priceRange = ref([])

      let productFilters = computed(() => {
            let filters = store.getters["shop/productList/getFilters"]
            priceRange.value = [filters.priceFrom, filters.priceTo]
            return filters
          }
      )

      const applyPriceRange = function () {
        setFilters({
          'priceFrom': priceRange.value[0],
          'priceTo': priceRange.value[1],
        })
      }

      let isFiltered = computed(() => store.getters['shop/productList/isFiltered'])
      let cleanFilters = () => store.dispatch("shop/productList/cleanFilters")

      return {
        productFilters,
        setFilters,
        priceRange,
        applyPriceRange,
        isFiltered,
        cleanFilters,
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

  .clean-filters {
    position: relative;
  }
  .clean-filters button {
    color: #f85151;
  }
</style>