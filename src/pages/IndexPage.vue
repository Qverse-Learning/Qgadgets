<template>
  <q-page class="">
    <main>
      <article>
        <!--
        - #HERO
      -->

        <div class="load" v-if="loading">
          <q-skeleton width="90%" height="300px" />
        </div>
        <section v-else class="section hero" id="home" aria-label="home">
          <div class="container">
            <ul class="hero-list">
              <li
                v-for="(latestProduct, index) in authStore.latestProducts"
                :key="index"
              >
                <div class="hero-card">
                  <figure class="card-banner img-holder">
                    <img
                      :src="latestProduct.product_image"
                      width="285"
                      height="396"
                      alt="Art Deco Home"
                      class="img-cover"
                    />
                  </figure>

                  <div class="card-content">
                    <h3>
                      <router-link
                        :to="{
                          name: 'product.detail',
                          params: { id: latestProduct.slug },
                        }"
                        class="card-title"
                        >{{
                          truncate(latestProduct.product_name, 20)
                        }}</router-link
                      >
                    </h3>

                    <p class="card-text">{{ latestProduct.stock_status }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!--
        - #ABOUT
      -->

        <section class="section about" id="about" aria-label="about">
          <div class="container">
            <h2 class="section-title">Qtekhub Store</h2>

            <p class="section-text">
              At Qtekhub, we redefine the world of technology by offering a
              curated selection of cutting-edge gadgets that seamlessly blend
              innovation, functionality, and style. As your trusted gadget
              partner, we take pride in providing a one-stop destination for
              tech enthusiasts, where customer satisfaction and uncompromising
              quality take center stage.
            </p>
          </div>
        </section>

        <!--
        - #PRODUCTS
      -->

        <section class="section product" id="#product" aria-label="product">
          <div class="container">
            <div class="title-wrapper">
              <h2 class="h2 section-title">Popular Products</h2>

              <ul class="filter-btn-list">
                <li class="filter-btn-item">
                  <q-btn
                    flat
                    no-caps
                    no-wrap
                    :to="{
                      name: 'category',
                      params: { id: 'all' },
                      hash: '#product',
                    }"
                    :class="
                      routeParam.params.id === 'all' ||
                      routeParam.name === 'homepage'
                        ? 'filter-btn active'
                        : 'filter-btn'
                    "
                    data-filter-btn="all"
                  >
                    All products
                  </q-btn>
                </li>
                <li
                  v-for="(category, index) in categories"
                  :key="index"
                  class="filter-btn-item"
                >
                  <q-btn
                    no-wrap
                    no-caps
                    flat
                    :to="{
                      name: 'category',
                      params: { id: category.slug },
                      hash: '#product',
                    }"
                    :class="
                      routeParam.params.id === category.slug
                        ? 'filter-btn active'
                        : 'filter-btn'
                    "
                    data-filter-btn="all"
                  >
                    {{ category.category_name }}
                  </q-btn>
                </li>
              </ul>
            </div>
            <div
              class="load"
              v-if="authStore.loadingAll || authStore.loadingCat"
            >
              <q-skeleton width="90%" height="100%" />
            </div>
            <ul v-else class="grid-list product-list" data-filter="all">
              <li
                v-for="(product, index) in authStore.allProducts"
                :key="index"
              >
                <ProductCompVue
                  :products="authStore.allProducts"
                  :data="product"
                />
              </li>
            </ul>
          </div>
        </section>

        <section class="section product" id="#brands" aria-label="product">
          <div class="container">
            <div class="title-wrapper">
              <h2 class="h2 section-title">Popular Brands</h2>

              <ul class="filter-btn-list">
                <li
                  v-for="(brand, index) in brands"
                  :key="index"
                  class="filter-btn-item"
                >
                  <q-btn
                    no-wrap
                    no-caps
                    flat
                    :to="{
                      name: 'brands',
                      params: { id: brand.slug || 'dell' },
                      hash: '#brands',
                    }"
                    :class="
                      routeParam.params.id === brand.slug
                        ? 'filter-btn active'
                        : 'filter-btn'
                    "
                    data-filter-btn="all"
                  >
                    {{ brand.brand_name }}
                  </q-btn>
                </li>
              </ul>
            </div>
            <div class="load" v-if="authStore.loadingBrands">
              <q-skeleton width="90%" height="300px" />
            </div>
            <ul v-else class="grid-list product-list" data-filter="all">
              <li
                v-for="(product, index) in authStore.brandProducts"
                :key="index"
              >
                <ProductCompVue
                  :products="authStore.brandProducts"
                  :data="product"
                />
              </li>
            </ul>
          </div>
        </section>

        <section class="section product" aria-label="product">
          <div class="container">
            <div class="title-wrapper">
              <h2 class="h2 section-title">Recommended</h2>

              <ul class="filter-btn-list"></ul>
            </div>
            <div class="load" v-if="authStore.loading">
              <q-skeleton width="90%" height="300px" />
            </div>
            <ul v-else class="grid-list product-list" data-filter="all">
              <li
                v-for="(product, index) in authStore.recommendedProducts"
                :key="index"
              >
                <ProductCompVue
                  :products="authStore.recommendedProducts"
                  :data="product"
                />
              </li>
            </ul>
          </div>
        </section>

        <section class="section about" id="about" aria-label="about">
          <div class="container">
            <div class="about-card">
              <figure
                class="card-banner img-holder"
                style="--width: 1170; --height: 450"
              >
                <img
                  src="../assets/about-banner.jpg"
                  width="1170"
                  height="450"
                  loading="lazy"
                  alt="Qmarthub promo"
                  class="img-cover"
                />
              </figure>

              <button class="play-btn" aria-label="play video">
                <i class="fa-brands fa-youtube"></i>
              </button>
            </div>
          </div>
        </section>

        <!--
        - #NEWSLETTER
      -->

        <!-- <section class="section newsletter" aria-label="newsletter">
          <div class="container">
            <div class="newsletter-card">
              <div class="card-content">
                <h2 class="h2 section-title">Our Newsletter</h2>

                <p class="section-text">
                  Subscribe our newsletter and get discount 50% off
                </p>
              </div>

              <form action="" class="card-form">
                <input
                  type="email"
                  name="email_address"
                  placeholder="Your email address"
                  required
                  class="email-field"
                />

                <button
                  type="submit"
                  class="newsletter-btn"
                  aria-label="subscribe"
                >
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </section> -->
      </article>
    </main>
    <FooterCompVue />
  </q-page>
</template>

<script setup>
import { Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import ProductCompVue from "src/components/ProductComp.vue";
import FooterCompVue from "src/components/FooterComp.vue";
import { useCartStore } from "src/stores/cart";
import { onMounted, ref, watch, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMyAuthStore } from "src/stores/auth";
const route = useRouter();
const routeParam = useRoute();
let store = useCartStore();
let authStore = useMyAuthStore();

let loading = ref(false);
let latestProducts = ref([]);
let latestProductsArr = ref([]);
let brands = ref([]);
let brandsProducts = ref([]);
let recommededProducts = ref([]);
let categories = ref([]);

watch(routeParam, (newParams, oldParams) => {
  // Handle the route parameter changes here
  if (newParams.params.id === "all") {
    if (newParams.name === oldParams.name) {
      // loading.value = true;
      authStore.getProducts();
      // loading.value = false;
    }
  } else if (newParams.hash === "#product") {
    if (newParams.name === oldParams.name) {
      // loading.value = true;

      authStore.getCategoryProducts(newParams.params.id);
      // loading.value = false;
    }
  } else if (newParams.hash === "#brands") {
    if (newParams.name === oldParams.name) {
      // loading.value = true;
      authStore.getBrandsProducts(newParams.params.id);
      // loading.value = false;
    }
  }
  // console.log("Route parameters changed:", newParams, oldParams);
});

const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};
const getBrands = () => {
  authAxios
    .get("brands/all-brands")
    .then(({ data }) => {
      // console.log(data);

      brands.value = data.brands;
    })
    .catch(({ response }) => {});
};

const getCategories = () => {
  authAxios
    .get("categories/all-categories")
    .then(({ data }) => {
      // console.log(data);
      categories.value = data.categories;
    })
    .catch(({ response }) => {});
};

onMounted(() => {
  loading.value = true;
  authStore.getWish();
  authStore.getProducts();
  authStore.getBrandsProducts("dell");
  getCategories();
  getBrands();
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.filter-btn-item {
  .q-btn {
    padding: 0;
    min-height: auto;
  }
}
</style>
