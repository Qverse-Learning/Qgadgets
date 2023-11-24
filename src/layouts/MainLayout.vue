<template>
  <q-layout view="lHh Lpr lFf">
    <header class="header" data-header>
      <div class="container">
        <div class="input-wrapper">
          <input
            type="search"
            name="search"
            placeholder="Search Anything..."
            class="input-field"
            v-model="searchTerm"
            @input="searchFcn"
          />

          <i class="fa-solid fa-magnifying-glass"></i>
        </div>

        <router-link
          :to="{
            name: 'homepage',
          }"
          class="logo"
          >Qmarthub</router-link
        >

        <div class="header-action items-center">
          <button
            v-if="store.token === '' || store.token === null"
            @click="handleAuthModal"
            class="header-action-btn"
            aria-label="user"
          >
            <i class="fa-regular fa-user"></i>
          </button>
          <q-btn style="padding: 0" v-else flat color="primary">
            <img src="/user.svg" alt="" />
            <q-menu>
              <q-list>
                <q-item clickable @click="gotoDashBoard">
                  <q-item-section>
                    <q-item-label class="q-pa-sm">Go to Dashboard</q-item-label>
                  </q-item-section>
                </q-item>
                <hr />
                <q-item clickable :to="{ name: 'logout' }">
                  <q-item-section>
                    <q-item-label class="q-pa-sm">Logout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <button
            data-toggle-wishlist
            class="header-action-btn"
            aria-label="favorite list"
          >
            <i class="fa-regular fa-heart"></i>

            <span class="btn-badge">{{
              store.token ? store.wishList.length : "0"
            }}</span>
          </button>

          <button data-nav-toggler class="header-action-btn" aria-label="cart">
            <i class="fa-solid fa-bag-shopping"></i>

            <span class="btn-badge">{{ cartStore.cart.length }}</span>
          </button>

          <!-- <button
            class="header-action-btn"
            aria-label="open menu"
            data-nav-toggler
          >
            <i class="fa-solid fa-bars"></i>
          </button> -->
        </div>
      </div>
    </header>
    <div class="sidebar" data-navbar>
      <button class="nav-close-btn" aria-label="close menu" data-nav-toggler>
        <i class="fa-solid fa-xmark"></i>
      </button>

      <q-list v-if="cartStore.cart.length" class="container">
        <div class="row justify-between items-center">
          <div class="logo">Cart</div>
          <q-btn
            style="min-height: auto"
            class="q-pa-none"
            size="20px"
            flat
            @click="cartStore.clearCart"
          >
            <i class="fa-solid fa-trash"></i
          ></q-btn>
        </div>
        <q-item v-for="item in cartStore.cart" :key="item.id" class="cart_item">
          <q-item-section>
            <div style="gap: 1rem" class="row left_s no-wrap items-center">
              <img :src="item.product.product_image" alt="" />
              <div class="right">
                <q-item-label class="item_name">{{
                  item.product.product_name
                }}</q-item-label>

                <q-item-label class="sold_by" caption lines="2"
                  >₦{{ (item.product.price * item.quantity).toLocaleString() }}
                </q-item-label>
                <q-btn
                  @click="cartStore.removeFromCart(item.product.id)"
                  class="q-mt-xs remove"
                  flat
                >
                  Remove
                  <i class="fa-solid text-weight-bold q-ml-xs fa-xmark"></i>
                </q-btn>
              </div>
            </div>
            <q-item-label class="price" caption></q-item-label>

            <div class="row btns no-wrap items-center">
              <q-btn
                flat
                @click="cartStore.remove(item.product.id)"
                icon="fa-solid fa-minus"
              />
              <input v-model="item.quantity" type="text" class="qty-input" />
              <q-btn
                flat
                @click="cartStore.add(item.product.id)"
                icon="fa-solid fa-add"
              />
            </div>
          </q-item-section>
        </q-item>

        <div>
          <div class="row justify-between items-center">
            <small class="small text-weight-bold">Delivery Fee</small>
            <small class="text-weight-bold">
              ₦{{ cartStore.deliveryLocationFee.toLocaleString() }}
            </small>
          </div>
          <div class="row justify-between items-center">
            <div class="logo">Total</div>
            <h5 class="text-weight-bold">
              ₦{{
                (
                  cartStore.totalPrice + cartStore.deliveryLocationFee
                ).toLocaleString()
              }}
            </h5>
          </div>
        </div>

        <div class="row q-mt-xl items-center justify-center">
          <q-btn
            style="width: 90%; margin: 0 auto"
            no-wrap
            @click="checkout"
            no-caps
            class="text-weight-bold"
            color="secondary"
          >
            Checkout
          </q-btn>
        </div>
      </q-list>

      <div v-else class="no_item q-my-xl container">
        <div>
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <p class="text-center">
          You have not added anything to your cart, they would appear here when
          you add them
        </p>
      </div>

      <ul class="q-mt-xl contact-list">
        <li>
          <p class="contact-list-title">Contact Us</p>
        </li>

        <li class="contact-item">
          <address class="address">
            56, Coal City Garden Estate, Enugu, Enugu State.
          </address>
        </li>

        <li class="contact-item">
          <a href="mailto:support.center@qmarthub.co" class="contact-link"
            >support@qmarthubgadgets.com</a
          >
        </li>

        <li class="contact-item">
          <a href="tel:+2347044914032" class="contact-link">07044914032</a>
        </li>
      </ul>

      <div class="social-wrapper">
        <p class="social-list-title">Follow US On Socials</p>

        <ul class="social-list">
          <li>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100090188731613&mibextid=ZbWKwL"
              class="social-link"
            >
              <i class="fa-brands fa-facebook"></i>
            </a>
          </li>

          <li>
            <a
              target="_blank"
              href="https://x.com/QmartHub?t=N9klz1-MHPDCnTzCt56wOw&s=09"
              class="social-link"
            >
              <i class="fa-brands fa-x-twitter"></i>
            </a>
          </li>

          <li>
            <a
              target="_blank"
              href="https://instagram.com/theqmart_hub?igshid=MzRlODBiNWFlZA=="
              class="social-link"
            >
              <i class="fa-brands fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="sidebar" data-navbarWishlist>
      <button
        class="nav-close-btn"
        aria-label="close menu"
        data-toggle-wishlist
      >
        <i class="fa-solid fa-xmark"></i>
      </button>

      <q-list v-if="store.token && store.wishList.length" class="container">
        <div class="logo">
          Wishlist
          <q-spinner
            class="q-ml-sm"
            color="primary"
            v-if="loadingWishList"
            size="1em"
          />
        </div>
        <q-item v-for="item in store.wishList" :key="item.id" class="cart_item">
          <q-item-section>
            <div style="gap: 1rem" class="row left_s no-wrap items-center">
              <img :src="item.product.product_image" alt="" />
              <div class="right">
                <q-item-label class="item_name">{{
                  item.product.product_name
                }}</q-item-label>

                <q-item-label class="sold_by" caption lines="2"
                  >₦{{ item.product.price }}
                </q-item-label>

                <q-btn
                  @click="cartStore.addTocart(item.product)"
                  class="q-ma-xs q-pa-sm remove"
                  color="secondary"
                  style="padding: 0.5rem"
                >
                  Add to cart
                  <i class="fa-solid text-weight-bold q-ml-xs fa-plus"></i>
                </q-btn>
                <q-btn
                  @click="removeFromWishlist(item)"
                  class="q-ma-xs remove"
                  color="primary"
                  style="padding: 0.5rem"
                >
                  Remove
                  <i class="fa-solid text-weight-bold q-ml-xs fa-xmark"></i>
                </q-btn>
              </div>
            </div>
          </q-item-section>
        </q-item>

        <!-- <div>
          <div class="row justify-between items-center">
            <div class="logo">Total</div>
            <h5 class="text-weight-bold">
              ₦{{ cartStore.totalPrice.toLocaleString() }}
            </h5>
          </div>
        </div> -->
      </q-list>

      <div v-else class="no_item q-my-xl container">
        <div>
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <p class="text-center">
          {{
            store.token
              ? "You have not added anything to your Wishlist..."
              : "You have to login to view your Wishlist..."
          }}
        </p>

        <p v-if="!store.token" class="row q-mt-sm justify-center">
          <q-btn color="primary" no-caps @click="store.modals = !store.modals">
            Login
          </q-btn>
        </p>
      </div>
    </div>

    <div class="overlay" data-overlay data-nav-toggler></div>
    <div class="overlay" data-overlay-wishlist data-toggle-wishlist></div>
    <q-dialog class="modal" v-model="signupModal" persistent>
      <q-card class="hero_modal first">
        <form @submit.prevent="register">
          <q-card-section class="modal_card">
            <div class="top text-center">
              <div class="sub_text">Sign Up</div>
              <div class="text q-pt-sm">
                Already have an account?
                <q-btn
                  style="
                    padding: 0;
                    min-height: unset;
                    text-transform: capitalize;
                  "
                  flat
                  @click="toggleLogin"
                  color="secondary"
                >
                  Login
                </q-btn>
              </div>
            </div>

            <div class="modal_inputs">
              <div class="input">
                <label for="">
                  <i class="fa-sharp fa-solid fa-user"></i> Tell us your first
                  name
                </label>

                <input
                  required
                  v-model="signupData.first_name"
                  name="name"
                  placeholder="Type your name here"
                  type="text"
                />

                <small
                  class="text-red text-weight-bold"
                  v-if="errors.first_name"
                >
                  {{ errors.first_name[0] }}
                </small>
              </div>
              <div class="input">
                <label for="">
                  <i class="fa-sharp fa-solid fa-user"></i> Tell us your last
                  name
                </label>

                <input
                  required
                  v-model="signupData.last_name"
                  name="name"
                  placeholder="Type your name here"
                  type="text"
                />

                <small
                  class="text-red text-weight-bold"
                  v-if="errors.last_name"
                >
                  {{ errors.last_name[0] }}
                </small>
              </div>
              <div class="input">
                <label for="">
                  <i class="fa-sharp fa-solid fa-location"></i> Delivery address
                </label>

                <input
                  required
                  v-model="signupData.address"
                  placeholder="Set a delivery location"
                  type="text"
                  name="location"
                />

                <small class="text-red text-weight-bold" v-if="errors.address">
                  {{ errors.address[0] }}
                </small>
              </div>
              <div class="input">
                <label for="">
                  <i class="fa-sharp fa-solid fa-phone"></i> Phone number
                </label>

                <input
                  required
                  v-model="signupData.phone_number"
                  placeholder="Add your contact number"
                  type="text"
                  name="phone"
                />

                <small
                  class="text-red text-weight-bold"
                  v-if="errors.phone_number"
                >
                  {{ errors.phone_number[0] }}
                </small>
              </div>
              <div class="input">
                <label for="">
                  <i class="fa-regular fa-envelope"></i> Add an email
                </label>

                <input
                  required
                  name="email"
                  placeholder="Add your email address"
                  type="email"
                  v-model="signupData.email"
                />
                <small class="text-red text-weight-bold" v-if="errors.email">
                  {{ errors.email[0] }}
                </small>
              </div>
              <div class="input">
                <label for="">
                  <i class="fa-solid fa-lock"></i> Set a password
                </label>

                <input
                  required
                  name="password"
                  placeholder="Set a password"
                  type="password"
                  v-model="signupData.password"
                />
                <small class="text-red text-weight-bold" v-if="errors.password">
                  {{ errors.password[0] }}
                </small>
              </div>

              <div class="submit">
                <q-btn :loading="loadauth" type="submit" flat class="modal_btn">
                  Sign Up
                </q-btn>
              </div>
            </div>
            <q-btn @click="signupModal = false" flat class="modal_btn_close"
              ><i class="fa-sharp fa-solid fa-xmark"></i
            ></q-btn>
          </q-card-section>
        </form>
      </q-card>
    </q-dialog>
    <q-dialog class="modal" v-model="store.modals" persistent>
      <q-card class="hero_modal">
        <form @submit.prevent="login">
          <q-card-section class="modal_card">
            <div class="top text-center">
              <div class="text">Welcome Back</div>
              <div class="sub_text q-mt-sm">Sign In</div>
            </div>

            <div class="modal_inputs">
              <div class="input">
                <small
                  class="text-red q-mb-sm text-weight-bold"
                  v-if="errorsText.name"
                >
                  {{ errorsText }}
                </small>
                <label for="">
                  <i class="fa-regular fa-envelope"></i> Your email
                </label>

                <input
                  required
                  name="email"
                  placeholder="Add your email address"
                  type="email"
                  v-model="loginData.email"
                />
                <small class="text-red text-weight-bold" v-if="errors.email">
                  {{ errors.email[0] }}
                </small>
              </div>
              <div class="input">
                <label for="">
                  <i class="fa-solid fa-lock"></i> Your password
                </label>

                <input
                  required
                  name="password"
                  placeholder="Set a password"
                  type="password"
                  v-model="loginData.password"
                />

                <small class="text-red text-weight-bold" v-if="errors.password">
                  {{ errors.password[0] }}
                </small>
              </div>

              <div class="submit">
                <q-btn :loading="loadauth" type="submit" flat class="modal_btn">
                  Login
                </q-btn>
                <div class="text text-center">
                  Don't have an account?
                  <q-btn
                    style="
                      padding: 0;
                      min-height: unset;
                      text-transform: capitalize;
                    "
                    flat
                    @click="toggleRegister"
                    color="secondary"
                  >
                    Sign Up
                  </q-btn>
                </div>
              </div>
            </div>
            <q-btn @click="store.modals = false" flat class="modal_btn_close"
              ><i class="fa-sharp fa-solid fa-xmark"></i
            ></q-btn>
          </q-card-section>
        </form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="promptModal" persistent>
      <q-card class="checkoutcard" style="min-width: 350px">
        <div class="hol">
          <q-card-section>
            <div class="text-h6 delidetails">Delivery Details</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <label for="">First name</label>
            <input v-model="data.first_name" name="name" />
            <small class="text-red text-weight-bold" v-if="errors.first_name">
              {{ errors.first_name[0] }}
            </small>
          </q-card-section>
        </div>

        <div class="hol">
          <q-card-section class="q-pt-none">
            <label for="">Last name</label>
            <input name="last_name" v-model="data.last_name" />
            <small class="text-red text-weight-bold" v-if="errors.last_name">
              {{ errors.last_name[0] }}
            </small>
          </q-card-section>
        </div>
        <div class="hol">
          <q-card-section class="q-pt-none">
            <label for="">Email</label>
            <input name="email" v-model="data.email" />
            <small class="text-red text-weight-bold" v-if="errors.email">
              {{ errors.email[0] }}
            </small>
          </q-card-section>
        </div>
        <div class="hol">
          <q-card-section class="q-pt-none">
            <label for="">Contact Number</label>
            <input v-model="data.phoneNumber" name="phone" />

            <small class="text-red text-weight-bold" v-if="errors.phoneNumber">
              {{ errors.phoneNumber[0] }}
            </small>
          </q-card-section>
        </div>
        <div class="hol">
          <q-card-section class="q-pt-none">
            <label for="">Delivery Address</label>
            <input name="deliveryAddress" v-model="data.deliveryAddress" />
          </q-card-section>
        </div>
        <div class="hol">
          <q-card-section class="q-pt-none">
            <label for="">Landmark</label>
            <input name="landmark" v-model="data.landmark" />
          </q-card-section>
        </div>
        <div class="hol">
          <q-card-section class="q-pt-none">
            <label for="">Referral code</label>
            <input
              placeholder="Please enter referral code if referred"
              name="referral"
              v-model="que"
            />
          </q-card-section>
        </div>

        <div class="hol">
          <q-card-section class="q-pt-none">
            <div
              :class="
                data.payment_method === 'Paystack' ? 'radio active' : 'radio'
              "
            >
              <q-radio
                v-model="data.payment_method"
                val="Paystack"
                label="Pay with Paystack"
                color="secondary"
              />
            </div>
            <div
              :class="
                data.payment_method === 'Bank Transfer'
                  ? 'radio active'
                  : 'radio'
              "
            >
              <q-radio
                v-model="data.payment_method"
                val="Bank Transfer"
                color="secondary"
                label="Bank Transfer"
              />
            </div>
            <div
              :class="
                data.payment_method === 'Wallet' ? 'radio active' : 'radio'
              "
            >
              <q-radio
                v-model="data.payment_method"
                val="Wallet"
                color="secondary"
                :label="`Wallet`"
              />
            </div>

            <small
              class="text-red text-weight-bold"
              v-if="errors.payment_method"
            >
              {{ errors.payment_method[0] }}
            </small>
          </q-card-section>
        </div>

        <div
          class="container text-gold"
          v-if="data.payment_method === 'Wallet'"
        >
          Wallet Balance = ₦{{ store.userdetails.wallet }}
        </div>

        <div v-if="showDetails" class="account_details container">
          <div class="acct_info">
            <p>Account Name:</p>
            <p class="text-weight-bold">Verse X Global Ltd</p>
          </div>
          <div class="acct_info">
            <p>Account Number:</p>
            <p class="text-weight-bold">
              <q-btn
                flat
                push
                size="16px"
                @click="copy"
                style="min-height: auto; padding: 0"
                color="white"
                text-color="black"
                label="8242018840"
                class="text-weight-bold"
              >
                <i class="fa-solid q-ml-xs fa-copy"></i>
              </q-btn>
            </p>
          </div>
          <div class="acct_info">
            <p>Benficiary Bank:</p>
            <p class="text-weight-bold">Moniepoint</p>
          </div>
          <div class="continue q-ml-sm">
            <q-file
              color="purple-12"
              v-model="data.receipt"
              label="Upload receipt"
              accept=".jpg,.png,.svg,.jpeg"
              name="transferReceipt"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <small class="text-red text-weight-bold" v-if="errors.receipt">
              {{
                errors.receipt[0] || "Please check your receipt upload format"
              }}
            </small>
          </div>
        </div>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            @click="pay"
            class="checkout_btn"
            :loading="loadingbtn"
            :label="showDetails ? 'Place Order' : 'Place Order'"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { copyToClipboard, Loading } from "quasar";
import { Dialog, Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
let store = useMyAuthStore();
import { useCartStore } from "src/stores/cart";
let cartStore = useCartStore();
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
// console.log(router.currentRoute.value.name==='homepage')
let signupModal = ref(false);
let loginModal = ref(false);
let showDetails = ref(false);
let loadingbtn = ref(false);
let loadingWishList = ref(false);
let que = ref("");

let loginData = ref({});
let loadauth = ref(false);
let promptModal = ref(false);
let searchTerm = ref("");
let loading = ref(false);
let errors = ref({});
let wishList = ref([]);
let errorsText = ref({});
let signupData = ref({});
let data = ref({ payment_method: "Paystack" });

const toggleRegister = () => {
  loginModal.value = false;
  signupModal.value = true;
};
const toggleLogin = () => {
  loginModal.value = true;
  signupModal.value = false;
};
const handleAuthModal = () => {
  store.modals = true;
};

watch(
  () => data.value.payment_method,
  (newValue, oldValue) => {
    // console.log(`Value changed from ${oldValue} to ${newValue}`);
    // You can perform actions here when myValue changes

    if (newValue === "Bank Transfer") {
      showDetails.value = true;
    } else {
      showDetails.value = false;
    }
  }
);
const copy = () => {
  copyToClipboard("8242018840")
    .then(() => {
      // success!
      Notify.create({
        message: "Account number copied!",
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
const register = () => {
  loadauth.value = true;
  authAxios
    .post("customers/customer-registration", signupData.value)
    .then((response) => {
      // console.log(response);
      loadauth.value = false;
      loginModal.value = false;
      signupModal.value = false;
      Dialog.create({
        title: "Registration",
        message: `Your account has been created, check your email ${signupData.value.email} to verify.`,
        persistent: true,
      })
        .onOk(() => {
          signupData.value = {};
        })
        .onCancel(() => {
          // console.log('I am triggered on both OK and Cancel')

          signupData.value = {};
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    })
    .catch(({ response }) => {
      // console.log(response);
      loadauth.value = false;
      errors.value = response.data.errors;
      Notify.create({
        message: `An error occured.`,
        color: "red",
        position: "bottom",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
const login = () => {
  loadauth.value = true;
  authAxios
    .post("customers/login-customer", loginData.value)
    .then((response) => {
      // console.log(response);
      loadauth.value = false;
      store.setUserDetails(response.data);
      Notify.create({
        message: `Welcome back ${response.data.user.first_name} ${response.data.user.last_name}`,
        color: "green",
        position: "top",
      });

      store.modals = false;
      loginData.value = {};
      store.getWish();
      getDataMounted();
    })
    .catch(({ response }) => {
      // console.log(response);
      loadauth.value = false;
      errorsText.value = response.data.errors;
      Notify.create({
        message: response.data.errors,
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};

const gotoDashBoard = () => {
  router.replace({ name: "dashboard" });
};
const searchFcn = () => {
  router.push({ name: "search", query: { q: searchTerm.value } });
};

// const getWishlist = () => {
//   authAxios
//     .get("customer/dashboard/wishlist")
//     .then(({ data }) => {
//       console.log(data);
//       wishList.value = data.wishlist;
//     })
//     .catch(({ response }) => {
//       loading.value = false;
//     });
// };
const removeFromWishlist = (item) => {
  loadingWishList.value = true;
  authAxios
    .delete(`customer/dashboard/wishlist/remove?product_id=${item.product.id}`)
    .then((response) => {
      // console.log(response);
      loadingWishList.value = false;
      store.getWish();
      // getDataMounted();
    })
    .catch(({ response }) => {
      loadingWishList.value = false;
      Notify.create({
        message: "An error occured",
        color: "red",
      });
    });
};
const checkout = () => {
  if (cartStore.cart.length) {
    promptModal.value = true;
  } else {
    Notify.create({
      message: "You have not added any item to cart",
      color: "red",
      position: "top",
    });
  }
};

const pay = async () => {
  if (
    data.value.deliveryAddress === "" ||
    data.value.deliveryAddress?.length < 15
  ) {
    Notify.create({
      message:
        "Please enter a valid delivery address, your delivery address cannot be less then 10 characters",
      color: "red",
      position: "top",
      actions: [{ icon: "close", color: "white" }],
    });

    return;
  }
  let text = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 15; i++)
    text += characters.charAt(Math.floor(Math.random() * characters.length));
  // console.log(text);
  let cartArr = [];
  cartStore.cart.map((item) => {
    let orders = {
      ...item,
    };
    cartArr.push(orders);
  });

  let productcartArr = [];
  cartStore.cart.map((item) => {
    // console.log(item);
    let orders = {
      id: item.product.id,
      product_name: item.product.product_name,
      qty: item.quantity,
      price: item.product.price,
      reference: text,
      image: item.product.product_image,
    };
    productcartArr.push(orders);
  });

  let postData = {
    ...data.value,

    amount: cartStore.totalPrice + cartStore.deliveryLocationFee,
    deliveryFee: cartStore.deliveryLocationFee,
    serviceCharge: 1000,
    currency: "NGN",
    reference: text,
    referral_id: que.value,
    products: productcartArr,
    metadata: [
      {
        payingFor: `Pc buy items`,
        payment_method: data.value.payment_method,
      },
    ],
  };
  // console.log(data);

  if (data.value.payment_method === "Bank Transfer" && showDetails.value) {
    if (data.value.receipt) {
      let checkoutdata = postData;
      const formData = new FormData();
      for (var key in checkoutdata) {
        if (key === "products") {
          formData.append(key, JSON.stringify(checkoutdata[key]));
        } else if (key === "metadata") {
          formData.append(key, JSON.stringify(checkoutdata[key]));
        } else {
          formData.append(key, checkoutdata[key]);
        }
      }

      loadingbtn.value = true;

      authAxios
        .post("checkout/upload-receipt", formData)
        .then((response) => {
          // console.log(response);
          loadingbtn.value = false;

          window.location.href = response.data.url;
          cartStore.cart = [];

          promptModal.value = false;
          // console.log(response);
          Notify.create({
            message: `Your order has been successfully placed and its been processed, our customer care will reach out to you in no time.`,
            color: "green",
            position: "bottom",
            timeout: 10000030030,
            actions: [{ icon: "close", color: "white" }],
          });
        })
        .catch(({ response }) => {
          loadingbtn.value = false;
          // console.log(response);
          if (response.status === 500) {
            Notify.create({
              message:
                "This is not your fault, we have been notified and is currently fixing any issues.",
              color: "red",
            });
          } else {
            errors.value = response.data.errors;

            Notify.create({
              message: `An error occured, please recheck credentials`,
              color: "red",
              position: "bottom",
              actions: [{ icon: "close", color: "white" }],
            });
          }
        });
    } else {
      loadingbtn.value = false;
      Notify.create({
        message: `Please upload a valid receipt.`,
        color: "red",
        position: "bottom",
        actions: [{ icon: "close", color: "white" }],
      });
    }
  } else if (data.value.payment_method === "Paystack") {
    const propertiesToOmit = ["receipt"]; // Define the properties to omit

    const filteredObj1 = Object.fromEntries(
      Object.entries(postData).filter(
        ([key]) => !propertiesToOmit.includes(key)
      )
    );
    loadingbtn.value = true;

    authAxios
      .post("checkout/paystack-payment-gateway", filteredObj1)
      .then((response) => {
        // console.log(response);
        loadingbtn.value = false;
        window.location.href = response.data.link;
        cartStore.cart = [];
        promptModal.value = false;
        Notify.create({
          message: `Your order has been successfully placed and its been processed, our customer care will reach out to you in no time.`,
          color: "green",
          position: "bottom",
          timeout: 10000030030,
          actions: [{ icon: "close", color: "white" }],
        });
      })
      .catch(({ response }) => {
        loadingbtn.value = false;
        errors.value = response.data.errors;
        Notify.create({
          message: `An error occured, please recheck credentials`,
          color: "red",
          position: "bottom",
          actions: [{ icon: "close", color: "white" }],
        });
      });
  } else if (data.value.payment_method === "Wallet") {
    if (store.userdetails.wallet < postData.amount) {
      Dialog.create({
        title: "Wallet",
        message:
          "You do not have enough funds in you wallet to make this purchase, fund your wallet",
      })
        .onOk(() => {
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
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    } else {
      const propertiesToOmit = ["receipt"]; // Define the properties to omit

      const filteredObj1 = Object.fromEntries(
        Object.entries(postData).filter(
          ([key]) => !propertiesToOmit.includes(key)
        )
      );
      loadingbtn.value = true;

      authAxios
        .post("checkout/wallet-payment-gateway", filteredObj1)
        .then((response) => {
          // console.log(response);
          loadingbtn.value = false;
          window.location.href = response.data;
          cartStore.cart = [];
          promptModal.value = false;
          Notify.create({
            message: `Your order has been successfully placed and its been processed, our customer care will reach out to you in no time.`,
            color: "green",
            position: "bottom",
            timeout: 10000030030,
            actions: [{ icon: "close", color: "white" }],
          });
        })
        .catch(({ response }) => {
          loadingbtn.value = false;
          // errors.value = response.data.errors;
          Notify.create({
            message: `An error occured, please recheck credentials`,
            color: "red",
            position: "bottom",
            actions: [{ icon: "close", color: "white" }],
          });
        });
    }
  } else {
    // console.log("Hello");
  }
};

const getDataMounted = () => {
  // store.getWish();
  // store.getProducts();
  // store.getBrandsProducts("dell");

  que.value = router.currentRoute.value.query.ref || "";

  data.value.deliveryAddress = store.userdetails.address;
  data.value.phoneNumber = store.userdetails.phone_number;
  data.value.payment_method = "Paystack";
  data.value.first_name = store.userdetails.first_name;
  data.value.last_name = store.userdetails.last_name;
  data.value.email = store.userdetails.email;
};

onMounted(() => {
  if (router.currentRoute.value.query.token) {
    loginModal.value = true;
  }
  if (store.token) {
    store.getWish();
  }
  const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
      for (let i = 0; i < elem.length; i++) {
        elem[i].addEventListener(type, callback);
      }
    } else {
      elem.addEventListener(type, callback);
    }
  };

  /**
   * navbar toggle
   */

  const navbar = document.querySelector("[data-navbar]");
  const navbarWishlist = document.querySelector("[data-navbarWishlist]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const navToggleWishlist = document.querySelectorAll("[data-toggle-wishlist]");
  const overlay = document.querySelector("[data-overlay]");
  const overlayWish = document.querySelector("[data-overlay-wishlist]");
  const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
  };
  const toggleWishlist = function () {
    navbarWishlist.classList.toggle("active");
    overlayWish.classList.toggle("active");
    document.body.classList.toggle("active");
  };

  addEventOnElem(navTogglers, "click", toggleNavbar);
  addEventOnElem(navToggleWishlist, "click", toggleWishlist);

  const closeNavbar = function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    overlayWish.classList.remove("active");
    document.body.classList.remove("active");
  };

  const header = document.querySelector("[data-header]");
  const backTopBtn = document.querySelector("[data-back-top-btn]");

  const showElemOnScroll = function () {
    if (window.scrollY > 100) {
      header.classList.add("active");
      backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      if (backTopBtn) {
        backTopBtn.classList.remove("active");
      }
    }
  };

  addEventOnElem(window, "scroll", showElemOnScroll);
  // if(router.currentRoute.value.name !=='homepage')

  que.value = router.currentRoute.value.query.ref || "";
  // console.log(this.$router.currentRoute.value);
  if (store.token) {
    data.value.deliveryAddress = store.userdetails.address;
    data.value.phoneNumber = store.userdetails.phone_number;
    data.value.payment_method = "Paystack";
    data.value.first_name = store.userdetails.first_name;
    data.value.last_name = store.userdetails.last_name;
    data.value.email = store.userdetails.email;
  }
});
</script>

<style lang="scss" scoped>
.q-list.container {
  padding-inline: 0;
}
.cart_item {
  border: 1px solid hsl(27, 46%, 58%);
  border-radius: 5px;
  margin: 1rem 0;
}
.q-item {
  min-height: auto;
  padding: 10px;
  font-size: 14px;
}

input:focus {
  outline: none;
}

.hol label {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
  display: block;
  margin-bottom: 0.5rem;
}

.hol input {
  background: rgba(236, 236, 236, 0.37);
  border: 1px solid #c8c8c8;
  border-radius: 5px;
  width: 100%;
  height: 44px;
  padding: 0 1rem;
}
.delidetails {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
  margin-bottom: 1rem;
}
</style>
