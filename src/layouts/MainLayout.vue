<template>
  <div class="main-wrapper">
    <!--        header-->
    <Header/>
    <!--    content-->
    <div class="container">
        <router-view/>
    </div>
    <!--        footer-->
    <Footer/>
  </div>
</template>

<script>
    import Header from "@/components/app/Header";
    import Footer from "@/components/app/Footer";

    export default {
        name: "MainLayout",
        components: {
            Header, Footer
        }
    }
</script>

<style scoped>
</style>