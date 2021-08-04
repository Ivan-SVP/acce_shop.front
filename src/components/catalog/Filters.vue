<template>
  <div class="col-lg-3 order-lg-1 order-2">
    <!-- shop-sidebar-wrap start -->
    <div class="shop-sidebar-wrap">

      <!-- shop-sidebar start -->
      <div class="shop-sidebar mb-30">
        <h4 class="title">FILTER BY PRICE</h4>
        <!-- filter-price-content start -->
        <div class="filter-price-content">
          <form action="#" method="post">
            <div id="price-slider" class="price-slider"></div>
            <div class="filter-price-wapper">
              <div class="filter-price-cont">
                <span>Price:</span>
                <div class="input-type">
                  <input type="text" id="min-price" readonly="" />
                </div>
                <span>—</span>
                <div class="input-type">
                  <input type="text" id="max-price" readonly="" />
                </div>
                <a class="add-to-cart-button" href="#">
                  <span>FILTER</span>
                </a>
              </div>
            </div>
          </form>
        </div>
        <!-- filter-price-content end -->
      </div>
      <!-- shop-sidebar end -->

      <!-- shop-sidebar start -->
      <div class="shop-sidebar mb-30">
        <h4 class="title">CATEGORIES</h4>
        <ul>
          <li><a href="shop.html">brothers <span>(18)</span></a></li>
          <li><a href="shop.html">hatil <span>(16)</span></a></li>
          <li><a href="shop.html">Men <span>(6)</span></a></li>
          <li><a href="shop.html">Women <span>(11)</span></a></li>
        </ul>
      </div>
      <!-- shop-sidebar end -->


      <!-- shop-sidebar start -->
      <div class="sidbar-product shop-sidebar mb-30">
        <h4 class="title">best product</h4>
        <!-- sidbar-product-inner start -->
        <div class="sidbar-product-inner">
          <div class="product-image">
            <a href="product-details.html"><img src="assets/images/product/product-01.jpg" alt=""></a>
          </div>
          <div class="product-content text-left">
            <h3><a href="product-details.html">Products Name 003</a></h3>
            <div class="price-box">
              <span class="old-price">11.00</span>
              <span class="new-price">10.00</span>
            </div>
          </div>
        </div>
        <!-- sidbar-product-inner end -->
        <!-- sidbar-product-inner start -->
        <div class="sidbar-product-inner">
          <div class="product-image">
            <a href="product-details.html"><img src="assets/images/product/product-10.jpg" alt=""></a>
          </div>
          <div class="product-content text-left">
            <h3><a href="product-details.html">Products Name 011</a></h3>
            <div class="price-box">
              <span class="old-price">18.00</span>
              <span class="new-price">14.00</span>
            </div>
          </div>
        </div>
        <!-- sidbar-product-inner end -->
        <!-- sidbar-product-inner start -->
        <div class="sidbar-product-inner">
          <div class="product-image">
            <a href="product-details.html"><img src="assets/images/product/product-04.jpg" alt=""></a>
          </div>
          <div class="product-content text-left">
            <h3><a href="product-details.html">Products Name 008</a></h3>
            <div class="price-box">

              <span class="old-price">19.00</span>
              <span class="new-price">16.00</span>
            </div>
          </div>
        </div>
        <!-- sidbar-product-inner end -->
      </div>
      <!-- shop-sidebar end -->

      <!-- shop-sidebar start -->
      <div class="shop-sidebar mb-30">
        <h4 class="title">Color</h4>
        <ul>
          <li><a href="shop.html">Red <span>(18)</span></a></li>
          <li><a href="shop.html">Green <span>(16)</span></a></li>
          <li><a href="shop.html">Blue <span>(6)</span></a></li>
          <li><a href="shop.html">Yellow <span>(11)</span></a></li>
          <li><a href="shop.html">White <span>(11)</span></a></li>
        </ul>
      </div>
      <!-- shop-sidebar end -->

      <!-- shop-sidebar start -->
      <div class="shop-sidebar mb-30">
        <h4 class="title">SIZE</h4>
        <ul>
          <li><a href="shop.html">S <span>(11)</span></a></li>
          <li><a href="shop.html">M <span>(13)</span></a></li>
          <li><a href="shop.html">L <span>(6)</span></a></li>
          <li><a href="shop.html">XLL <span>(51)</span></a></li>
          <li><a href="shop.html">XXL <span>(3)</span></a></li>
        </ul>
      </div>
      <!-- shop-sidebar end -->

      <!-- shop-sidebar start -->
      <div class="shop-sidebar">
        <h4 class="title">Hot Tags</h4>
        <div class="sidebar-tag">
          <a href="#">Red</a>
          <a href="#">Blue</a>
          <a href="#">Man</a>
          <a href="#">White</a>
          <a href="#">Yellow</a>
          <a href="#">Digital</a>
          <a href="#">Women</a>
          <a href="#">Evergreen</a>
        </div>
      </div>
      <!-- shop-sidebar end -->
    </div>
    <!-- shop-sidebar-wrap end -->
  </div>
</template>

<script>
export default {
  name: "Filters"
}
</script>

<style scoped>

</style>