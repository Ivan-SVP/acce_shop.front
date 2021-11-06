<template>
  <ul class="mt-5">
    <li v-for="category in catList" :key="category.slug"
        :class="category.slug === productFilters.category ? 'active' : ''">

      <template v-if="category.children.length">
        <a @click.prevent="setFilters({'category': category.slug})">{{ category.title }}
          <span>{{ category.products_count }}</span>
        </a>
        <category-node  v-bind:catList="category.children" v-bind:lvl="lvl+1"></category-node>
      </template>

      <a v-else @click.prevent="setFilters({'category': category.slug})">{{'- '.repeat(lvl)}}{{ category.title }}
        <span>{{ category.products_count }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
import {computed, inject} from "vue";
import {useStore} from "vuex";


export default {
  name: "CategoryNode",
  props: {
    catList: Array,
    lvl: Number,
  },
  setup() {
    const store = useStore()
    const setFilters  = inject('setFilters');

    let productFilters = computed(() => {
          return store.getters["shop/productList/getFilters"]
        }
    )

    return {
      setFilters,
      productFilters,
    }
  }
}
</script>

<style scoped>

</style>