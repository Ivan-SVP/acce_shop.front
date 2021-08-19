<template>
  <div class="col-lg-9 order-lg-2 order-1">
    <!-- shop-product-wrapper start -->
    <div class="shop-product-wrapper">
      <div class="row">
        <div class="col">
          <!-- shop-top-bar start -->
          <div class="shop-top-bar">
            <!-- product-view-mode start -->

            <div class="product-mode">
              <!--shop-item-filter-list-->
<!--              <ul class="nav shop-item-filter-list" role="tablist">-->
<!--                <li class="active"><a class="active" data-toggle="tab" href="#grid"><i class="ion-ios-keypad-outline"></i></a></li>-->
<!--                <li><a data-toggle="tab" href="#list"><i class="ion-ios-list-outline"></i></a></li>-->
<!--              </ul>-->
              <!-- shop-item-filter-list end -->
            </div>
            <!-- product-view-mode end -->
            <!-- product-short start -->
            <div class="product-short">
              <select class="nice-select" name="sortBy" v-model="sortBy">
                <option v-for="param in sortParams" :key="param.key" v-bind:value="param.key">
                  {{param.value}}
                </option>
              </select>
            </div>
            <!-- product-short end -->
          </div>
          <!-- shop-top-bar end -->
        </div>
      </div>

      <!-- shop-products-wrap start -->
      <div class="shop-products-wrap">
        <div class="tab-content">
          <div class="tab-pane active" id="grid">
            <div class="shop-product-wrap">
              <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-6 col-"
                     v-for="product in productList"
                     :key="product.id"
                >
                  <!-- single-product-wrap start -->
                  <div class="single-product-wrap">
                    <div class="product-image">
                      <router-link :to="{name: 'product-detail', params: { slug: product.slug }}">
                        <img v-if="product.product_images[0]" :src="product.product_images[0].image" :alt="product.title">
                        <img v-else src="@/assets/images/product/product-01.jpg" :alt="product.title">
                      </router-link>
                      <span v-if="product.discount" class="label">-{{product.discount}} %</span>
                      <div class="product-action">
                        <a href="#" class="add-to-cart"><i class="ion-bag"></i></a>
                        <a href="#" class="wishlist"><i class="ion-android-favorite-outline"></i></a>
                        <a href="#" class="quick-view" data-toggle="modal" data-target="#exampleModalCenter"><i class="ion-ios-search"></i></a>
                      </div>
                    </div>
                    <div class="product-content">
                      <h3>
                        <router-link :to="{name: 'product-detail', params: { slug: product.slug }}" :alt="product.title">
                          {{product.title}}
                        </router-link>
                      </h3>
                      <div v-if="product.discount" class="price-box">
                        <span class="old-price">{{product.price}} ₽</span>
                        <span class="new-price">{{product.discount_price}} ₽</span>
                      </div>
                      <div v-else class="price-box">
                        <span>{{product.price}} ₽</span>
                      </div>
                    </div>
                  </div>
                  <!-- single-product-wrap end -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- shop-products-wrap end -->

      <!-- paginatoin-area start -->
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
      <!-- paginatoin-area end -->
    </div>
    <!-- shop-product-wrapper end -->
  </div>
</template>

<script>

  import mainApi from "../../api/main_server/endpoints/root";

  export default {
    name: "ProductList",
    data() {
      return {
        sortBy: 'title',
        sortParams: [
          { 'key': 'title', 'value': 'А-Я'},
          { 'key': '-title', 'value': 'Я-А'},
          { 'key': 'price', 'value': 'Сначала дешвле'},
          { 'key': '-price', 'value': 'Сначала дороже'},
        ],
        pagination: {
          'currentPage': 1,
          'page_size': 20,
          'count': null,
        },
        windowWidth: window.innerWidth,
      }
    },
    asyncComputed: {
      productList: async function() {
        return await mainApi.getProductList({
          'ordering': this.sortBy,
          'page_size': this.pagination.page_size,
          'page': this.pagination.currentPage,
        })
            .then(res => {
              this.pagination.count = res.data.count
              this.pagination.page_size = res.data.page_size || 20
              return res.data.results
            })
            .catch(() => {
              return []
            });
      }
    },
    computed: {
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
    methods:{
      prevPage(){
        if (this.pagination.currentPage > 1) {
          this.pagination.currentPage--;
        }
      },
      nextPage(){
        if (this.pagination.currentPage < this.pageCount) {
          this.pagination.currentPage++;
        }
      },
      setPage(number) {
        if (0 < number <= this.pageCount){
          this.pagination.currentPage = number
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
  .product-image{
    width: 100%;
    padding-top: 100%; /* 1:1 Aspect Ratio */
    position: relative;
  }
  .product-image > a, .product-image > a img{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .product-image > a img{
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    margin: auto;
    display: block;
  }

  .product-content{
    overflow: hidden;
  }
  .product-content > h3{
    max-width: 100%;
    white-space: nowrap;
  }
</style>