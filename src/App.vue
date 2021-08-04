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
    import ShopLayout from "./layouts/ShopLayout";

    export default {
        computed: {
            layout() {
                let resultLayout = 'empty'
                this.$route.matched.forEach(
                    function (item) {
                      if (item.meta.layout) {
                        resultLayout = item.meta.layout
                      }
                    });
                return resultLayout + '-layout'
            }
        },
        components: {
            EmptyLayout, MainLayout, ShopLayout
        }
    }
</script>

<style>
</style>
