<template>
  <header class="fl-header">

    <!-- Header Top Start -->
    <div class="header-top-area d-none d-lg-block">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="header-top-inner">
              <div class="row">
                <div class="col-lg-4 col-md-3">
                  <div class="social-top">
                    <ul>
                      <li><a href="#"><i class="ion-social-facebook"></i></a></li>
                      <li><a href="#"><i class="ion-social-twitter"></i></a></li>
                      <li><a href="#"><i class="ion-social-tumblr"></i></a></li>
                      <li><a href="#"><i class="ion-social-googleplus"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div class="col-lg-8 col-md-9">
                  <div class="top-info-wrap text-right">
                    <ul class="top-info">
                      <li>Ежедневно</li>
                      <li><a href="tel:+79041683641">Телефон</a></li>
                      <li><a href="mailto:acce.shop@mail.ru">acce.shop@mail.ru</a></li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Header Top End -->

    <!-- haeader bottom Start -->
    <div class="haeader-bottom-area">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-2 col-md-4 col-5">
            <div class="logo-area">
              <router-link :to="{name: 'shop'}">
                <img src="assets/images/logo/horizontal_on_white_by_logaster.png" alt="">
              </router-link>
            </div>
          </div>
          <div class="col-lg-8 d-none d-lg-block">
            <div class="main-menu-area text-right">
              <!--  Start Mainmenu Nav-->
              <nav class="main-navigation">
                <ul>
                  <li v-for="link in navLinks"
                      :key="link.title"
                      :class="isActivePath(link.path) ? 'active' : ''"
                  >
                    <a :href="link.path">{{ link.title }}</a>

                    <ul v-if="link.subMenu && link.subMenu.length" class="sub-menu">
                      <li v-for="subLink in link.subMenu" :key="subLink.title">
                        <a :href="subLink.path">{{ subLink.title }}</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>

            </div>
          </div>

          <div class="col-lg-2 col-md-8 col-7">
            <div class="right-blok-box d-flex">
              <div class="search-wrap">
                <a href="#" :class="'trigger-search' + (searchText ? ' active' : '')">
                  <i class="ion-ios-search-strong"></i>
                </a>
              </div>

              <div class="user-wrap">
<!--                <a href="wishlist.html"><i class="ion-android-favorite-outline"></i></a>-->
              </div>

              <div class="shopping-cart-wrap">
                <a href="#">
                  <i class="ion-ios-cart-outline"></i> <span v-if="cartItemList.length" id="cart-total">{{ cartItemList.length}}</span>
                </a>
                <ul class="mini-cart">

                  <li v-for="cartItem in cartItemList" :key="cartItem.product.id" class="cart-item">
                    <div class="cart-image">
                      <router-link :to="{name: 'product-detail', params: { productSlug: cartItem.product.slug }}">
                        <img v-if="cartItem.product.product_images && cartItem.product.product_images[0]"
                             :src="cartItem.product.product_images[0].image"
                             :alt="cartItem.product.title">
                        <img v-else src="assets/images/product/product-01.jpg" :alt="cartItem.product.title">
                      </router-link>
                    </div>
                    <div class="cart-title">
                      <router-link :to="{name: 'product-detail', params: { productSlug: cartItem.product.slug }}">
                        <h4>{{ cartItem.product.title }}</h4>
                      </router-link>
                      <span class="quantity">{{ cartItem.quantity }} ×</span>
                      <div class="price-box"><span class="new-price">{{ cartItem.product.final_price }} р</span></div>
                      <a class="remove_from_cart" href="#" @click="removeFromCart(cartItem.product)"><i class="ion-close"></i></a>
                    </div>
                  </li>

                  <li class="subtotal-titles">
                    <div class="subtotal-titles">
                      <h3>Подытог :</h3><span>{{ cartTotal }} р</span>
                    </div>
                  </li>
                  <li class="mini-cart-btns">
                    <div class="cart-btns">
                      <router-link :to="{name: 'cart'}">В корзину</router-link>
                      <router-link :to="{name: 'checkout'}">Оформить</router-link>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="mobile-menu-btn d-block d-lg-none">
                <div class="off-canvas-btn">
                  <i class="ion-android-menu"></i>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- haeader bottom End -->

    <!-- main-search start -->
    <div class="main-search-active">
      <div class="sidebar-search-icon">
        <button class="search-close"><span class="ion-android-close"></span></button>
      </div>
      <div class="sidebar-search-input">
        <div class="form-search">
          <input v-model="searchText"
                 @change="search()"
                 class="input-text"
                 placeholder="Введите поисковый запрос здесь ..."
                 type="search"
          >
          <button class="search-btn" type="button">
            <i class="ion-ios-search"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- main-search start -->

    <!-- off-canvas menu start -->
    <aside class="off-canvas-wrapper">
      <div class="off-canvas-overlay"></div>
      <div class="off-canvas-inner-content">
        <div class="btn-close-off-canvas">
          <i class="ion-android-close"></i>
        </div>

        <div class="off-canvas-inner">

          <!-- mobile menu start -->
          <div class="mobile-navigation">

            <!-- mobile menu navigation start -->
            <nav>
              <ul class="mobile-menu">
                <li class="menu-item-has-children"><a href="#">Home</a>
                  <ul class="dropdown">
                    <li><a href="index.html">Home version 01</a></li>
                    <li><a href="index-2.html">Home version 02</a></li>
                  </ul>
                </li>
                <li class="menu-item-has-children"><a href="#">pages</a>
                  <ul class="megamenu dropdown">
                    <li class="mega-title has-children"><a href="#">Column One</a>
                      <ul class="dropdown">
                        <li><a href="compare.html">Compare Page</a></li>
                        <li><a href="login-register.html">Login &amp; Register</a></li>
                        <li><a href="my-account.html">My Account Page</a></li>
                      </ul>
                    </li>
                    <li class="mega-title has-children"><a href="#">Column two</a>
                      <ul class="dropdown">
                        <li><a href="product-details.html">Product Details 1</a></li>
                        <li><a href="product-details-2.html">Product Details 2</a></li>
                        <li><a href="checkout.html">Checkout Page</a></li>
                      </ul>
                    </li>
                    <li class="mega-title has-children"><a href="#">Column Three</a>
                      <ul class="dropdown">
                        <li><a href="error404.html">Error 404</a></li>
                        <li><a href="cart.html">Cart Page</a></li>
                        <li><a href="wishlist.html">Wish List Page</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li class="menu-item-has-children "><a href="#">shop</a>
                  <ul class="dropdown">
                    <li><a href="shop.html">Shop Left Sidebar</a></li>
                    <li><a href="shop-right.html">Shop Right Sidebar</a></li>
                    <li><a href="shop-fullwidth.html">Shop Full Width</a></li>
                  </ul>
                </li>
                <li class="menu-item-has-children "><a href="#">Blog</a>
                  <ul class="dropdown">
                    <li><a href="blog.html">Blog Left Sidebar</a></li>
                    <li><a href="blog-right.html">Blog Right Sidebar</a></li>
                    <li><a href="blog-details.html">Blog Details Page</a></li>
                  </ul>
                </li>
                <li><a href="about-us.html">About</a></li>
                <li><a href="contact-us.html">Contact</a></li>
              </ul>
            </nav>
            <!-- mobile menu navigation end -->
          </div>
          <!-- mobile menu end -->



          <!-- offcanvas widget area start -->
          <div class="offcanvas-widget-area">
            <div class="off-canvas-contact-widget">
              <ul>
                <li>
                  Mon - Fri : 9am to 5pm
                </li>
                <li>
                  <a href="#">0123456789</a>
                </li>
                <li>
                  <a href="#">info@yourdomain.com</a>
                </li>
              </ul>
            </div>
            <div class="off-canvas-social-widget">
              <a href="#"><i class="ion-social-facebook"></i></a>
              <a href="#"><i class="ion-social-twitter"></i></a>
              <a href="#"><i class="ion-social-tumblr"></i></a>
              <a href="#"><i class="ion-social-googleplus"></i></a>
            </div>

          </div>
          <!-- offcanvas widget area end -->
        </div>
      </div>
    </aside>
    <!-- off-canvas menu end -->

  </header>

</template>

<script>
    import $ from 'jquery'
    import {computed} from "vue";
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";

    export default {
        name: "Header",
        // computed: {
        //     isLoggedIn: function () {
        //         return this.$store.getters.isLoggedIn
        //     }
        // },
        // methods: {
        //     logout: function () {
        //         this.$store.dispatch('logout')
        //             .then(() => {
        //                 this.$router.push('/login')
        //             })
        //     }
        // },
      mounted() {

        /*--
         Sidebar Search Active
        -----------------------------*/
        function sidebarSearch() {
          var searchTrigger = $('.trigger-search'),
              endTriggersearch = $('button.search-close'),
              container = $('.main-search-active');

          searchTrigger.on('click', function () {
            container.addClass('inside');
          });

          endTriggersearch.on('click', function () {
            container.removeClass('inside');
          });

        }

        sidebarSearch();
      },
      setup() {
        const store = useStore()
        const router = useRouter()

        let searchTextRef = '';
        let searchText = computed({
              get() {
                return store.getters["shop/productList/getFilters"].searchText
              },
              set(newValue) {
                searchTextRef = newValue;
              }
            }
        )

        const search = function () {
          store.dispatch("shop/productList/setFilters", {'searchText': searchTextRef})
          $('.main-search-active').removeClass('inside')
        };

        let navLinks = [
          // {title: 'Главная', path: '/'},
          {title: 'Каталог', path: '/catalog'},
          {title: 'Контакты', path: '/contacts'},
          {title: 'О нас', path: '/about'},
        ]

        function isActivePath(path) {
          return path === router.currentRoute.value.path
        }

        let cartItemList = computed(() => store.getters["shop/cart/getCartItemList"]);
        let cartTotal = computed(() => store.getters["shop/cart/getCartTotal"]);
        let removeFromCart = (product) => store.dispatch('shop/cart/removeFromCart', product)
        return {
          searchText,
          search,
          navLinks,
          isActivePath,

          cartItemList,
          cartTotal,
          removeFromCart,
        }
      }
    }

</script>

<style scoped>
  .remove_from_cart{
    top: 0;
  }
</style>