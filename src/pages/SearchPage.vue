<template>
  <q-page class="">
    <main>
      <article>
        <div class="load" v-if="loading">
          <q-skeleton width="90%" height="300px" />
        </div>

        <section
          v-else
          class="section product"
          id="#product"
          aria-label="product"
        >
          <div class="container">
            <div class="title-wrapper">
              <h2 class="h2 section-title">
                Search results for {{ routeParam.query.q }}
              </h2>

              <ul class="filter-btn-list">
                <li class="filter-btn-item"></li>
              </ul>
            </div>

            <ul
              v-if="latestProducts.length"
              class="grid-list product-list"
              data-filter="all"
            >
              <li v-for="(product, index) in latestProducts" :key="index">
                <ProductCompVue :data="product" />
              </li>
            </ul>
            <div v-else class="empty">
              <img src="/empty.svg" alt="" />

              <div class="empty_text">There's no product with this name</div>
            </div>
          </div>
        </section>
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
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRouter();
const routeParam = useRoute();
let loading = ref(false);
let searchTerm = ref("");
let latestProducts = ref([]);

watch(routeParam, (newParams, oldParams) => {
  // Handle the route parameter changes here
  searchTerm.value = newParams.query.q || "";
  getSearchedProducts(searchTerm.value);
});

const getSearchedProducts = (searchTerm) => {
  loading.value = true;
  authAxios
    .post(`search/search-all?query=${searchTerm}`)
    .then(({ data }) => {
      // console.log(data);
      latestProducts.value = data.products;
      loading.value = false;
    })
    .catch(({ response }) => {});
};

onMounted(() => {
  searchTerm.value = routeParam.query.q;
  getSearchedProducts(searchTerm.value || "");
});
</script>

<style lang="scss" scoped>
section.product {
  padding-top: 17%;
}
.filter-btn-item {
  .q-btn {
    padding: 0;
    min-height: auto;
  }
}
</style>
