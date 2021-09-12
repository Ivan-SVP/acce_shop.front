<template>
  <div id="app">
      <component :is="layout">
          <router-view/>
      </component>
  </div>
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
</style>
