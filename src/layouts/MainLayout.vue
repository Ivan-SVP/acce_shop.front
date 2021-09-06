<template>
  <div class="main-wrapper">
    <!--        header-->
    <Header/>
    <!--    content-->

    <router-view/>

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