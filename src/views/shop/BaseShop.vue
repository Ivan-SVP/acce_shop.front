<template>
  <div>
    <!-- breadcrumb-area -->
    <Breadcrumbs/>

    <!-- main-content-wrap -->
    <div class="main-content-wrap shop-page section-ptb">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Breadcrumbs from "../../components/app/Breadcrumbs";

  export default {
    name: "BaseShop",
    components: {
      Breadcrumbs,
    },
  }
</script>

<style>
  .active {
    color: #ff5151;
  }
</style>