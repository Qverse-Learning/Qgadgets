<template>
  <main>
    <article class="container article">
      <h2 class="h2 article-title">
        Hi {{ store.userdetails.first_name }} {{ store.userdetails.last_name }}
      </h2>

      <p class="article-subtitle">Welcome to Dashboard!</p>

      <section class="home">
        <div class="card profile-card">
          <button
            class="card-menu-btn icon-box"
            aria-label="More"
            data-menu-btn
          >
            <i class="ri-dashboard-line"></i>
          </button>

          <ul class="ctx-menu">
            <!-- <li class="ctx-item"></li> -->

            <!-- <li class="ctx-item"></li> -->

            <li class="divider"></li>

            <!-- <li class="ctx-item">
              <button class="ctx-menu-btn red icon-box">
                <span class="material-symbols-rounded icon" aria-hidden="true"
                  >delete</span
                >

                <span class="ctx-menu-text">Deactivate</span>
              </button>
            </li> -->
          </ul>

          <div class="profile-card-wrapper">
            <figure class="card-avatar">
              <img
                src="/user.svg"
                :alt="store.userdetails.first_name"
                width="32"
                height="32"
              />
            </figure>

            <div>
              <p class="card-title">
                {{ store.userdetails.first_name }}
                {{ store.userdetails.last_name }}
              </p>

              <p class="card-subtitle">{{ store.userdetails.address }}</p>
            </div>
          </div>

          <ul class="contact-list">
            <li>
              <a
                :href="`mailto:${store.userdetails.email}`"
                class="contact-link icon-box"
              >
                <i class="ri-mail-line"></i>

                <p class="text">{{ store.userdetails.email }}</p>
              </a>
            </li>

            <li>
              <a
                :href="`tel:${store.userdetails.phone_number}`"
                class="contact-link icon-box"
              >
                <i class="ri-phone-line"></i>

                <p class="text">{{ store.userdetails.phone_number }}</p>
              </a>
            </li>
          </ul>

          <div class="divider card-divider"></div>

          <ul
            style="gap: 2rem"
            class="contact-list justify-between items-center"
          >
            <li class="li">
              <div class="contact-link icon-box">
                <i class="ri-refund-2-line"></i>

                <p class="text">Referral code</p>
              </div>
              <q-btn @click="copy" class="copy" flat no-caps no-wrap>
                <i class="ri-file-copy-line"></i>
              </q-btn>
            </li>
            <div>
              <div class="contact-link icon-box">
                <i class="ri-wallet-line"></i>

                <p class="text">
                  Wallet Value NGN{{
                    store.userdetails.wallet.toLocaleString()
                  }}
                </p>
              </div>
              <q-btn color="primary" @click="fundWallet" no-caps no-wrap>
                Fund wallet<i class="q-ml-sm ri-wallet-line"></i>
              </q-btn>
            </div>
          </ul>
        </div>

        <div class="card-wrapper">
          <div class="card task-card">
            <div class="card-icon icon-box green">
              <i class="ri-shopping-bag-line"></i>
            </div>

            <div>
              <data
                class="card-data"
                :value="orders.delivered ? orders.delivered : 0"
                >{{ orders.delivered ? orders.delivered : 0 }}</data
              >

              <p class="card-text">Delivered Orders</p>
            </div>
          </div>

          <div class="card task-card">
            <div class="card-icon icon-box blue">
              <i class="ri-shopping-bag-line"></i>
            </div>

            <div>
              <data
                class="card-data"
                :value="orders.pending ? orders.pending : 0"
                >{{ orders.pending ? orders.pending : 0 }}</data
              >

              <p class="card-text">Pending Orders</p>
            </div>
          </div>
        </div>

        <div class="card revenue-card">
          <button
            class="card-menu-btn icon-box"
            aria-label="More"
            data-menu-btn
          >
            <i class="ri-more-line"></i>
          </button>

          <!-- <ul class="ctx-menu">
            <li class="ctx-item"></li>

            <li class="ctx-item"></li>
          </ul> -->

          <p class="card-title">Referrals</p>

          <data class="card-price" :value="store.userdetails.point"
            >₦{{ store.userdetails.point }}</data
          >

          <p class="card-text">Referral points</p>

          <div class="divider card-divider"></div>

          <ul class="revenue-list">
            <li class="revenue-item icon-box">
              <i class="ri-arrow-up-line"></i>

              <div>
                <data class="revenue-item-data" value="15">0</data>

                <p class="revenue-item-text">Total referrals</p>
              </div>
            </li>

            <!-- <li class="revenue-item icon-box">
              <i class="ri-arrow-down-line"></i>

              <div>
                <data class="revenue-item-data" value="10">10%</data>

                <p class="revenue-item-text">Prev Month</p>
              </div>
            </li> -->
          </ul>
        </div>
      </section>

      <!--
        - #PROJECTS
      -->

      <section class="projects">
        <div class="section-title-wrapper">
          <h2 class="section-title">Recent Orders</h2>

          <q-btn
            no-caps
            no-wrap
            flat
            :to="{ name: 'orders' }"
            class="btn btn-link icon-box"
          >
            <span>View All</span>

            <i class="q-ml-xs ri-arrow-right-line"></i>
          </q-btn>
        </div>
        <div class="load" v-if="loading">
          <q-skeleton width="90%" height="300px" />
        </div>

        <div v-else>
          <div
            v-if="
              !loading && orders.message === 'No Order has been placed by You'
            "
            class="empty q-mt-xl"
          >
            <img src="/empty.svg" alt="" />
            <!-- {{ order }} -->
            <div class="empty_text">You have not made any orders yet</div>

            <div class="q-pa-md q-gutter-sm">
              <q-btn
                style="text-transform: capitalize"
                color="secondary"
                :to="{ name: 'homepage' }"
                text-color="white"
                label="Make Order"
              />
              <!-- <q-btn
                style="text-transform: capitalize"
                color="primary"
                :to="{ name: 'foodshome' }"
                label="Order Food"
              /> -->
            </div>
          </div>
          <ul v-else class="project-list">
            <li v-for="(product, index) in orders.orders" :key="index">
              <ProductCompVue :data="product" />
            </li>
          </ul>
        </div>
      </section>
    </article>
  </main>

  <!--
    - #FOOTER
  -->

  <footer class="footer">
    <div class="container">
      <ul class="footer-list">
        <li class="footer-item">
          <a
            href="https://qmarthub.com/about"
            target="_blank"
            class="footer-link"
            >About</a
          >
        </li>

        <li class="footer-item">
          <a
            href="https://qmarthub.com/terms"
            target="_blank"
            class="footer-link"
            >Terms</a
          >
        </li>

        <li class="footer-item">
          <a
            href="https://wa.me/+2347044914032"
            target="_blank"
            class="footer-link"
            >Support</a
          >
        </li>
      </ul>

      <p class="copyright">
        &copy; {{ new Date().getFullYear() }}
        <a href="#" class="copyright-link">Qmarthub</a>. All Rights Reserved
      </p>
    </div>
  </footer>
</template>

<script setup>
import { copyToClipboard, Dialog, Loading } from "quasar";

import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { onMounted, ref } from "vue";
import ProductCompVue from "src/components/ProductComp.vue";
import { Notify } from "quasar";
let store = useMyAuthStore();
let latestOrders = ref([]);
let orders = ref({});
let loading = ref(false);

// const getLatestProducts = () => {
//   loading.value = true;
//   authAxios
//     .get("products/all-products")
//     .then(({ data }) => {
//       console.log(data);
//       loading.value = false;
//       latestOrders.value = data.products;
//     })
//     .catch(({ response }) => {
//       loading.value = false;
//     });
// };
const getOrders = () => {
  loading.value = true;
  authAxios
    .get("customer/dashboard/customer-order")
    .then(({ data }) => {
      // console.log(data);
      if (data) {
        // console.log("first");
        orders.value = {
          ...data,
          message: data.message,
        };

        // console.log(orders.value);
      }
      // orders.value = data;
      loading.value = false;
    })
    .catch(({ response }) => {
      loading.value = false;
    });
};
// const get = () => {
//   loading.value = true;
//   authAxios
//     .get("customer/dashboard/customer-order")
//     .then(({ data }) => {
//       console.log(data);
//       orders.value = data;
//       loading.value = false;
//     })
//     .catch(({ response }) => {
//       loading.value = false;
//     });
// };
const fundWallet = () => {
  let text = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 15; i++)
    text += characters.charAt(Math.floor(Math.random() * characters.length));
  // console.log(text);
  Dialog.create({
    title: "Wallet",
    message: "How much would you want to fund your wallet with?",
    prompt: {
      model: "",
      type: "text", // optional
    },
    cancel: true,
    persistent: true,
  })
    .onOk((data) => {
      // console.log(">>>> OK, received", data);
      Loading.show();
      authAxios
        .post("customer/dashboard/fund-wallet", {
          amount: data,
          email: store.userdetails.email,
          reference: text,
          currency: "NGN",
        })
        .then(({ data }) => {
          Loading.hide();
          window.location.href = data.link;
        })
        .catch(({ response }) => {
          loading.value = false;
          Loading.hide();
        });
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
const copy = () => {
  copyToClipboard(
    `${window.location.hostname}?ref=${store.userdetails.refferal_id}`
  )
    .then(() => {
      // success!
      Notify.create({
        message: "Referral code copied!",
        color: "green",
        position: "top",
      });
    })
    .catch(() => {
      // fail
      Notify.create({
        message: "error copying!",
        color: "red",
        position: "top",
      });
    });
};

onMounted(() => {
  // getLatestProducts();
  getOrders();
});
</script>

<style lang="scss" scoped>
.li {
  position: relative;
  .q-btn {
    position: absolute;
    top: -65%;
    right: -35%;
  }
}

@media (max-width: 900px) {
  .dashboard .profile-card-wrapper {
    gap: 5px;
  }

  .dashboard .article.container {
    margin-top: 3rem;
  }
}
</style>
