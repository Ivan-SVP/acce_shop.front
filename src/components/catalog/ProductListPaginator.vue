<template>
  <div class="paginatoin-area">
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <ul class="pagination-box">
          <li>
            <a class="Previous" @click.prevent="prevPage"><i class="ion-chevron-left"></i></a>
          </li>

          <li v-for="beforePage in nearPages.before" :key="beforePage.index"><a @click.prevent="setPage(beforePage)">{{beforePage}}</a></li>
          <li class="active"><a disabled="disabled">{{pagination.currentPage}}</a></li>
          <li v-for="afterPage in nearPages.after" :key="afterPage.index"><a @click.prevent="setPage(afterPage)">{{afterPage}}</a></li>

          <li>
            <a class="Next" @click.prevent="nextPage"><i class="ion-chevron-right"></i> </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "productListPaginator",
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    ...mapGetters({
      pagination: "shop/productList/getPaginatorParams",
    }),

    pageCount() {
      return Math.ceil(this.pagination.count / this.pagination.page_size)
    },
    needFirst() {
      return this.pagination.currentPage > this.link_count
    },
    needLast() {
      return this.pagination.currentPage < this.pageCount - this.link_count
    },
    link_count(){
      if (this.windowWidth < 350) {
        return 1
      } else if (this.windowWidth < 500) {
        return 2
      } else if (this.windowWidth < 1198) {
        return 3
      }
      return 5
    },
    nearPages() {
      // вычисляет ближайшие страницы пагинации
      const LINK_COUNT = this.link_count
      let before = [];
      let after = [];
      let current = this.pagination.currentPage

      // берет 3 слева 3 справа
      let start = current - LINK_COUNT > 0 ? current - LINK_COUNT : 1
      let end = current + LINK_COUNT <= this.pageCount ? current + LINK_COUNT : this.pageCount
      // если текущая ближе трех страниц к краям, результаты корректируются, стараясь оставлять ровное количество
      if (current - start !== LINK_COUNT) {
        let new_end = end + (LINK_COUNT - (current - start))
        end = new_end <= this.pageCount ? new_end : this.pageCount
      } else if (end - current !== LINK_COUNT) {
        let new_start = start - (LINK_COUNT - (end - current))
        start = new_start > 0 ? new_start : 1
      }
      // создает массив номеров страниц, разделяя на "слева от текущей(до)" и "справа(после)"
      for (let i = start; i <= end; i++) {
        if (i < current){  // до текущей
          if (i === start && this.needFirst) {  // если нужно показать первую(чтобы не менялось общее количество)
            before.push(1)
          } else {
            before.push(i)
          }
        } else if (i > current){  // после текущей
          if (i === end && this.needLast) {  // если нужно показать последнюю
            after.push(this.pageCount)
          } else {
            after.push(i)
          }
        }
      }
      return {
        'before': before,
        'after': after,
      }
    },
  },
  methods: {
    ...mapActions({
      setCurrentPage: "shop/productList/setCurrentPage",
    }),

    prevPage(){
      if (this.pagination.currentPage > 1) {
        this.setCurrentPage(this.pagination.currentPage - 1)
      }
    },
    nextPage(){
      if (this.pagination.currentPage < this.pageCount) {
        this.setCurrentPage(this.pagination.currentPage + 1)
      }
    },
    setPage(number) {
      if (0 < number <= this.pageCount){
        this.setCurrentPage(number)
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },


}
</script>

<style scoped>

</style>