<template>
  <div class="main-wrapper">
    <!-- header -->
    <Header/>

    <!-- breadcrumb-area -->
    <Breadcrumbs/>

    <!-- main-content-wrap -->
    <div class="main-content-wrap shop-page section-ptb">
        <router-view/>
    </div>

    <!-- footer -->
    <Footer/>
  </div>
</template>

<script>
    import Header from "../components/app/Header";
    import Footer from "../components/app/Footer";
    import Breadcrumbs from "../components/app/Breadcrumbs";

    export default {
        name: "ShopLayout",
        components: {
            Header,
            Breadcrumbs,
            Footer
        }
    }
</script>

<style scoped>
</style>