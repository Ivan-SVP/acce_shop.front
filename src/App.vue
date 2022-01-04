<template>
  <component :is="layout">
      <router-view/>
  </component>
</template>

<script>
    import EmptyLayout from "./layouts/EmptyLayout";
    import MainLayout from "./layouts/MainLayout";

    export default {
        computed: {
            layout() {
                let resultLayout = this.$route.meta.layout || 'empty'
                return resultLayout + '-layout'
            }
        },
        components: {
            EmptyLayout, MainLayout
        }
    }
</script>

<style>
  #app {
    height: 100%;
  }
</style>
