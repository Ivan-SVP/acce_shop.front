<template>
  <div class="container">
    <div class="row">
      <Filters/>
      <ProductList/>
    </div>
  </div>
</template>

<script>
  import Filters from "../../components/catalog/Filters";
  import ProductList from "../../components/catalog/ProductList";

  import {computed, provide, watch} from "vue";
  import { useStore } from 'vuex';
  import {useRouter} from "vue-router";

  export default {
    name: "MainCatalog",
    components: {
      Filters,
      ProductList,
    },
    setup() {
      const store = useStore()
      const router = useRouter()

      const setFilters = (filters) => store.dispatch('catalog/productList/setFilters', filters)
      setFilters(JSON.parse(JSON.stringify(router.currentRoute.value.query)))

      let queryFilters = computed(() => store.getters["catalog/productList/getFiltersQuery"])

      watch(queryFilters, (filters) => {
        router.push({'query': filters})
      })

      provide('setFilters', setFilters)
    },
  }
</script>

<style scoped>

</style>