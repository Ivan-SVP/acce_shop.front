<template>
  <div class="breadcrumb-area">
    <div class="container">
      <div class="row">
        <div class="col-12 text-left">
          <h2 class="breadcrumb-title">{{ pageTitle }}</h2>
          <!-- breadcrumb-list start -->
          <ul class="breadcrumb-list">
            <li v-for="crumb in breadCrumbs" :key="crumb[0]" :class="'breadcrumb-item' + (crumb[1] ? '' : ' active')">
              <a v-if="crumb[1]" :href="crumb[1]">{{ crumb[0] }}</a>
              <template v-else>{{ crumb[0] }}</template>
            </li>
          </ul>
          <!-- breadcrumb-list end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {useRouter} from "vue-router";
    import {computed} from "vue";

    export default {
        name: "Breadcrumbs",
        setup() {
          const router = useRouter()

          let pageTitle = computed(() => router.currentRoute.value.meta.pageTitle || '')
          let breadCrumbs = computed(() => {
            return [
              ['Главная', '/'],
              [pageTitle.value || '...', null],
            ]
          })

          return {
            pageTitle,
            breadCrumbs,
          }
        },
    }
</script>

<style scoped>
  .breadcrumb-area {
    background: linear-gradient(176deg,#ccccdd, transparent);
  }
</style>