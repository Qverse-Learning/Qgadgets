<template>
  <div class="product-card">
    <div
      class="card-banner img-holder has-before"
      style="--width: 300; --height: 300"
    >
      <img
        :src="data.product_image"
        width="300"
        height="300"
        loading="lazy"
        alt="Animi Dolor Pariatur"
        class="img-cover"
      />

      <ul
        v-if="router.currentRoute.value.name !== 'dashboard'"
        class="card-action-list"
      >
        <li>
          <button
            @click="store.addTocart(data)"
            class="card-action-btn"
            aria-label="add to cart"
            title="add to cart"
          >
            <i class="fa-solid fa-plus"></i>
          </button>
        </li>

        <!-- <li>
          <button
            @click="store.addTocart(data)"
            class="card-action-btn"
            aria-label="add to cart"
            title="add to cart"
          >
            <i class="fa-solid fa-bag-shopping"></i>
          </button>
        </li> -->
        <!-- data.like === false ? addtoWishList() : removeFromWishlist() -->
        <li>
          <button
            @click="
              data.liked === false ? addtoWishList() : removeFromWishlist()
            "
            class="card-action-btn"
            aria-label="add to whishlist"
            title="add to whishlist"
          >
            <i v-if="data.liked" class="fa-solid text-warning fa-heart"></i>
            <i v-else class="fa-regular fa-heart"></i>
          </button>
        </li>
      </ul>

      <!-- <ul class="badge-list">
        <li>
          <div class="badge orange">Sale</div>
        </li>

        <li>
          <div class="badge cyan">-10%</div>
        </li>
      </ul> -->
    </div>

    <div class="card-content">
      <h3 class="h3">
        <router-link
          v-if="router.currentRoute.value.name !== 'dashboard'"
          :to="{
            name: 'product.detail',
            params: { id: data.slug ? data.slug : data.id },
          }"
          class="card-title"
          >{{ data.product_name }}</router-link
        >
        <div v-else class="card-title">{{ data.product_name }}</div>
      </h3>

      <div class="card-price">
        <del class="del">₦{{ parseInt(data.price) + 100 }}</del>

        <data class="price" :value="data.price"
          >₦{{ parseInt(data.price).toLocaleString() }}</data
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { useCartStore } from "src/stores/cart";
import { toRefs } from "vue";
import { useRouter } from "vue-router";
// console.log(router.currentRoute.value.name === 'dashboard')
let router = useRouter();
let store = useCartStore();
let authStore = useMyAuthStore();

let props = defineProps({
  data: Object,
  products: Array,
});

const { data, products } = toRefs(props);

const addtoWishList = () => {
  // console.log(data)
  data.value.liked = !data.value.liked;
  authAxios
    .post(`customer/dashboard/wishlist/add`, {
      product_id: data.value.id,
    })
    .then((response) => {
      // console.log(response);
      const updatedItemIndex = products.value.findIndex(
        (i) => i.id === data.value.id
      );
      if (updatedItemIndex !== -1) {
        products.value[updatedItemIndex].liked = data.value.liked;
      }
      Notify.create({
        message: "Product added to favourites",
        color: "green",
      });
      authStore.getWish();
      // authStore.getProducts();
      // authStore.getBrandsProducts("dell");
    })
    .catch(({ response }) => {
      data.value.liked = !data.value.liked;

      // console.log(response);
      Notify.create({
        message: response.data.message,
        color: "red",
      });
    });
};

const removeFromWishlist = () => {
  data.value.liked = !data.value.liked;
  authAxios
    .delete(`customer/dashboard/wishlist/remove?product_id=${data.value.id}`)
    .then((response) => {
      const updatedItemIndex = products.value.findIndex(
        (i) => i.id === data.value.id
      );
      if (updatedItemIndex !== -1) {
        products.value[updatedItemIndex].liked = data.value.liked;
      }
      Notify.create({
        message: "Product removed to favourites",
        color: "green",
      });

      authStore.getWish();
      // authStore.getProducts();
      // authStore.getBrandsProducts("dell");
    })
    .catch(({ response }) => {
      // data.value.liked = !data.value.liked;
      // Notify.create({
      //   message: response.data.message,
      //   color: "red",
      // });
    });
};
</script>

<style lang="scss" scoped></style>
