<template>
  <div class="main-wrapper">
    <!--    header-->
    <Header/>
    <!--    content-->
    <router-view/>
    <!--    footer-->
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
  .main-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .content-container {
    flex: 1 0 auto;
  }
  .footer {
    flex: 0 0 auto;
  }
</style>