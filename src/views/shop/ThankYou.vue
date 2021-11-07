<template>
  <div class="main-content-wrap section-ptb wishlist-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2 text-center">
          <div class="search-error-wrapper">
            <h3>Спасибо за заказ!</h3>
            <p class="home-link">Менеджер уточнит остатки на складе и свяжется с вами.</p>
            <p v-if="lastOrderNumber" class="home-link">Номер заказа: {{ lastOrderNumber }}.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {useStore} from "vuex";
  import {computed} from "vue";

  export default {
    name: "ThankYou",
    components: {
    },
    setup() {
      const store = useStore()

      let lastOrderNumber = computed(() => store.getters["shop/checkout/getLastOrderNumber"]);
      return {
        lastOrderNumber,
      }
    },
  }
</script>

<style scoped>
</style>