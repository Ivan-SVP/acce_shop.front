<template>
  <div>
    <!-- breadcrumb-area -->
    <Breadcrumbs/>

    <!-- main-content-wrap -->
    <router-view/>
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
    color: #1117a3;
  }
</style>