<template>
  <q-layout>
    <div class="load" v-if="loading">
      <q-skeleton width="90%" height="300px" />
    </div>
    <article class="container" v-else>
      <section class="section product" aria-label="product">
        <div class="container">
          <div class="product-slides">
            <div class="slider-banner" data-slider>
              <figure class="product-banner">
                <img
                  :src="product.product_image"
                  width="600"
                  height="600"
                  loading="lazy"
                  alt="Nike Sneaker"
                  class="img-cover"
                />
              </figure>

              <figure class="product-banner">
                <img
                  src=""
                  width="600"
                  height="600"
                  loading="lazy"
                  alt="Nike Sneaker"
                  class="img-cover"
                />
              </figure>

              <figure class="product-banner">
                <img
                  src=""
                  width="600"
                  height="600"
                  loading="lazy"
                  alt="Nike Sneaker"
                  class="img-cover"
                />
              </figure>

              <figure class="product-banner">
                <img
                  src=""
                  width="600"
                  height="600"
                  loading="lazy"
                  alt="Nike Sneaker"
                  class="img-cover"
                />
              </figure>
            </div>

            <!-- <button
              class="slide-btn prev"
              aria-label="Previous image"
              data-prev
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>

            <button class="slide-btn next" aria-label="Next image" data-next>
              <i class="fa-solid fa-chevron-right"></i>
            </button> -->
          </div>

          <div class="product-content">
            <p class="product-subtitle">{{ product.product_name }}</p>

            <!-- <h1 class="h1 product-title">Fall Limited Edition Sneakers</h1> -->

            <div class="wrapper">
              <span class="price" data-total-price
                >₦{{ parseInt(product.price).toLocaleString() }}</span
              >

              <!-- <span class="badge">50%</span> -->

              <del class="del"
                >₦{{ (parseInt(product.price) + 500).toLocaleString() }}</del
              >
            </div>

            <div class="btn-group">
              <div class="counter-wrapper">
                <button
                  @click="removeFromQty"
                  class="counter-btn"
                  data-qty-minus
                >
                  <i class="fa-solid fa-minus"></i>
                </button>

                <span class="span" data-qty>{{ qty }}</span>

                <button @click="addToQty" class="counter-btn" data-qty-plus>
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>

              <div style="gap: 1rem" class="row items-center no-wrap">
                <button @click="addtoCart" class="cart-btn">
                  <i class="fa-solid fa-bag-shopping"></i>

                  <span class="span">Add to cart</span>
                </button>
                <button
                  @click="
                    product.liked === false
                      ? addtoWishList()
                      : removeFromWishlist()
                  "
                  class="card-action-btn"
                  aria-label="add to whishlist"
                  title="add to whishlist"
                >
                  <i
                    style="font-size: 2.5rem"
                    v-if="product.liked"
                    class="fa-solid text-warning fa-heart"
                  ></i>
                  <i
                    style="font-size: 2.5rem"
                    v-else
                    class="fa-regular fa-heart"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="desc_wrap q-mt-lg">
          <p v-html="product.description" class="product-text"></p>
          <h6 class="text-h3 text-weight-bold">Specifications</h6>
          <p v-html="product.content"></p>
        </div>
      </section>
    </article>
    <FooterComp />
  </q-layout>
</template>

<script setup>
import { Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { onMounted, ref, watch } from "vue";
import FooterComp from "src/components/FooterComp.vue";
let loading = ref(false);
import { useCartStore } from "src/stores/cart";
import { useRouter } from "vue-router";
import { useMyAuthStore } from "src/stores/auth";
const route = useRouter();
let store = useCartStore();
let authStore = useMyAuthStore();
const routeParams = ref(route.params);
let product = ref({});
let qty = ref(1);
let recommendedProducts = ref({});
watch(routeParams, (newParams, oldParams) => {
  // Handle the route parameter changes here
  // console.log("Route parameters changed:", newParams);
});
const addtoCart = () => {
  let productValue = {
    ...product.value,
    quantity: qty.value,
    detail: "detail",
  };
  // console.log(productValue);
  store.addTocart(productValue);
};
const addToQty = () => {
  qty.value++;
};
const removeFromQty = () => {
  qty.value--;
  if (qty.value === 0) {
    qty.value = 1;
    Notify.create({
      message: "Your product quantity must be at least 1",
    });
    return;
  }
};
const getProductDetail = () => {
  loading.value = true;
  let params = route.currentRoute.value.params.id;
  authAxios
    .get(`products/single-product?product_id=${params}`)
    .then(({ data }) => {
      // console.log(data);
      let liked = authStore.allProducts.find(
        (product) => product.id === data.products[0].id
      );
      // console.log(liked);
      if (liked) {
        product.value = { ...data.products[0], liked: true };
      } else {
        product.value = { ...data.products[0], liked: false };
      }
      loading.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
    });
};
const getRecommendedProducts = () => {
  authAxios
    .get("recommend-products")
    .then((data) => {
      // console.log(data);
      recommendedProducts.value = data.data;
    })
    .catch(({ response }) => {
      Notify.create({
        message: `Could not fetch products, please check your network settings.`,
        color: "red",
        position: "bottom",
        timeout: 10500,
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const addtoWishList = () => {
  // console.log(data)
  product.value.liked = !product.value.liked;
  authAxios
    .post(`customer/dashboard/wishlist/add`, {
      product_id: product.value.id,
    })
    .then((response) => {
      // console.log(response);
      const updatedItemIndex = authStore.allProducts.findIndex(
        (i) => i.id === product.value.id
      );
      if (updatedItemIndex !== -1) {
        authStore.allProducts[updatedItemIndex].liked = product.value.liked;
      }
      Notify.create({
        message: "Product added to favourites",
        color: "green",
      });
      authStore.getWish();
    })
    .catch(({ response }) => {
      product.value.liked = !product.value.liked;
      // console.log(response);
      Notify.create({
        message: response.data.message,
        color: "red",
      });
    });
};

const removeFromWishlist = () => {
  product.value.liked = !product.value.liked;
  authAxios
    .delete(`customer/dashboard/wishlist/remove?product_id=${product.value.id}`)
    .then((response) => {
      const updatedItemIndex = authStore.allProducts.findIndex(
        (i) => i.id === product.value.id
      );
      if (updatedItemIndex !== -1) {
        authStore.allProducts[updatedItemIndex].liked = product.value.liked;
      }
      Notify.create({
        message: "Product removed to favourites",
        color: "green",
      });

      authStore.getWish();
    })
    .catch(({ response }) => {});
};
onMounted(() => {
  getProductDetail();
});
</script>

<style lang="scss" scoped>
:root {
  /**
   * colors
   */

  --cadet-blue-crayola: hsl(220, 14%, 75%);
  --dark-electric-blue: hsl(217, 9%, 45%);
  --shamrock-green: hsl(146, 51%, 41%);
  --sea-green_10: hsla(146, 75%, 30%, 0.1);
  --eerie-black: hsl(218, 12%, 13%);
  --ghost-white: hsl(230, 60%, 98%);
  --sea-green: hsl(146, 75%, 30%);
  --honeydew: hsl(146, 74%, 94%);
  --white: hsl(0, 0%, 100%);
  --black: hsl(0, 0%, 0%);

  --ff-kumbh-sans: "Kumbh Sans", sans-serif;

  --fs-1: 2.8rem;
  --fs-2: 1.8rem;
  --fs-3: 1.5rem;
  --fs-4: 1.2rem;

  --fw-500: 500;
  --fw-700: 700;

  --shadow-1: 0 2px 3px hsla(0, 0%, 0%, 0.2);
  --shadow-2: 0 10px 30px -10px hsl(146, 75%, 30%);

  --radius-circle: 50%;
  --radius-15: 15px;
  --radius-12: 12px;
  --radius-10: 10px;
  --radius-6: 6px;

  --transition-1: 0.25s ease;
  --transition-2: 0.5s ease;
  --cubic-out: cubic-bezier(0.33, 0.85, 0.4, 0.96);
}

.product-slides {
  position: relative;
  margin-inline: -15px;
  overflow: hidden;
}

.slider-banner {
  display: flex;
  transition: var(--transition-2);
}

.product-banner {
  min-width: 100%;
  max-height: 300px;
}

.slide-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--white);
  color: var(--eerie-black);
  padding: 12px;
  border-radius: var(--radius-circle);
}
.product .container {
  margin-top: 10rem;
}

.slide-btn.prev {
  left: 15px;
}

.slide-btn.next {
  right: 15px;
}

.slide-btn.disabled {
  color: var(--dark-electric-blue);
  opacity: 0.8;
  pointer-events: none;
}

.product-content {
  padding-block: 24px 50px;
  padding-inline: 8px;
}

.product-content .product-subtitle {
  color: hsl(146, 75%, 30%);
  font-size: var(--fs-4);
  font-weight: var(--fw-700);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-content .product-title {
  color: var(--eerie-black);
  font-size: var(--fs-1);
  line-height: 1.1;
  margin-block: 12px 18px;
}

.desc_wrap {
  max-width: 1300px;
  width: 90%;
  margin: 0 auto;
  padding-top: 4rem;
  .product-text {
    font-size: 15px;
    line-height: 1.7;
    margin-bottom: 2rem;
  }
}

.product-content .product-text {
  font-size: var(--fs-3);
  line-height: 1.7;
}

.product-content .wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-block: 10px 25px;
}

.product-content .price {
  color: var(--eerie-black);
  font-size: var(--fs-1);
  font-weight: var(--fw-700);
}

.product-content .badge {
  background: var(--sea-green_10);
  color: hsl(146, 75%, 30%);
  font-weight: var(--fw-700);
  padding: 4px 10px;
  border-radius: var(--radius-6);
}

.product-content .del {
  color: var(--cadet-blue-crayola);
  font-weight: var(--fw-500);
  margin-inline-start: auto;
}

.counter-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--ghost-white);
  border-radius: var(--radius-10);
  margin-block-end: 15px;
}

.counter-btn {
  color: hsl(146, 75%, 30%);
  font-size: 18px;
  padding: 19px;
  transition: var(--transition-1);
}

.counter-btn i {
  --ionicon-stroke-width: 80px;
}

.counter-btn:is(:hover, :focus) {
  color: var(--shamrock-green);
}

.counter-wrapper .span {
  color: var(--eerie-black);
  font-weight: var(--fw-700);
}

.cart-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  background: hsl(146, 75%, 30%);
  color: var(--white);
  font-weight: var(--fw-500);
  padding: 18px;
  border-radius: var(--radius-10);
  box-shadow: var(--shadow-2);
  transition: var(--transition-1);
}

.cart-btn i {
  --ionicon-stroke-width: 50px;
}

.cart-btn:is(:hover, :focus) {
  background-color: hsl(146, 51%, 41%);
}

@media (min-width: 768px) {
  .container {
    max-width: 400px;
    margin-inline: auto;
  }

  // .product {
  //   margin-block-start: 45px;
  // }

  .product .container {
    display: grid;
    gap: 20px;
  }

  .product-slides {
    border-radius: var(--radius-15);
  }

  .product-banner {
    max-height: unset;
  }
}

@media (min-width: 992px) {
  :root {
    --fs-2: 1.4rem;
    --fs-4: 1.3rem;
  }

  .container {
    max-width: 950px;
  }

  .profile-btn .img {
    width: 50px;
  }

  .product {
    margin-block: 15px 100px;
  }

  .product .container {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 90px;
  }

  .product-slides {
    margin-inline: 0;
  }

  .product-content {
    padding: 0;
  }

  .product-title {
    --fs-1: 4.5rem;
  }

  .btn-group {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    align-items: center;
    gap: 15px;
  }

  .counter-wrapper {
    margin-block-end: 0;
  }
}
</style>
