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

  export default {
    name: "MainCatalog",
    components: {
      Filters,
      ProductList,
    },
  }
</script>

<style scoped>

</style>