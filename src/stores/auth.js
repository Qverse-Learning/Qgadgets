import { defineStore } from "pinia";
import { authAxios } from "src/boot/axios";
import { Notify } from "quasar";

export const useMyAuthStore = defineStore("myqmartauthPc", {
  state: () => ({
    token: "",
    modals: false,
    loadingAll: false,
    loadingBrands: false,
    loadingCat: false,
    userdetails: {},
    userdetailsNoauth: {},
    wishList: [],
    brandProducts: [],
    categoryProducts: [],
    recommendedProducts: [],
    latestProducts: [],
    allProducts: [],
  }),
  getters: {
    registrationForm: (state) => state.userdetails,
  },
  actions: {
    setUserDetails(data) {
      const token = data.access_token ? data.access_token : "";
      const user = data;
      localStorage.setItem("token", token);
      localStorage.setItem("userdet", JSON.stringify(user));
      this.userdetails = data.user;
      this.token = token;
    },

    getWish() {
      authAxios
        .get("customer/dashboard/wishlist")
        .then(({ data }) => {
          this.wishList = data.wishlist;

          // console.log(response);
          this.getProducts();
          this.getBrandsProducts("dell");
        })
        .catch(({ response }) => {});
    },
    getBrandsProducts(brand) {
      this.loadingBrands = true;
      authAxios
        .get(`products/product-brand?brand_id=${brand}`)
        .then(({ data }) => {
          const mergedArray = data.products.map((product1) => {
            const foundProduct2 = this.wishList.find(
              (product2) => product2.product.id === product1.id
            );
            if (foundProduct2) {
              return { ...product1, liked: true };
            } else {
              return { ...product1, liked: false };
            }
          });
          this.brandProducts = mergedArray;
          this.loadingBrands = false;
        })
        .catch(({ response }) => {
          this.loadingBrands = false;
        });
    },
    getCategoryProducts(id) {
      this.loadingCat = true;
      authAxios
        .get(`categories/products-by-category?category_item=${id}`)
        .then(({ data }) => {
          const mergedArray = data.products.map((product1) => {
            const foundProduct2 = this.wishList.find(
              (product2) => product2.product.id === product1.id
            );
            if (foundProduct2) {
              return { ...product1, liked: true };
            } else {
              return { ...product1, liked: false };
            }
          });
          // console.log(mergedArray);
          this.allProducts = mergedArray;
          this.loadingCat = false;
        })
        .catch(({ response }) => {
          this.loadingCat = false;
        });
    },

    getProducts() {
      const promises = [
        authAxios.get("products/latest-products"),
        authAxios.get("products/all-products"),
        authAxios.get(`products/recommend-products`),
      ];
      this.loadingAll = true;
      // Use Promise.all to wait for all requests to complete
      Promise.all(promises)
        .then((data) => {
          // Process the data from the successful requests

          const mergedArrayLatest = data[0].data.product.map((product1) => {
            const foundProduct2 = this.wishList.find(
              (product2) => product2.product.id === product1.id
            );
            // console.log(foundProduct2);
            if (foundProduct2) {
              return { ...product1, liked: true };
            } else {
              return { ...product1, liked: false };
            }
          });
          const mergedArray = data[1].data.products.map((product1) => {
            const foundProduct2 = this.wishList.find(
              (product2) => product2.product.id === product1.id
            );
            if (foundProduct2) {
              return { ...product1, liked: true };
            } else {
              return { ...product1, liked: false };
            }
          });
          const mergedArray2 = data[2].data.product.map((product1) => {
            const foundProduct2 = this.wishList.find(
              (product2) => product2.product.id === product1.id
            );
            if (foundProduct2) {
              return { ...product1, liked: true };
            } else {
              return { ...product1, liked: false };
            }
          });
          // console.log(mergedArrayLatest);
          this.latestProducts = mergedArrayLatest;
          this.allProducts = mergedArray;

          this.recommendedProducts = mergedArray2;

          this.loadingAll = false;
        })
        .catch((error) => {
          // Handle errors, e.g., network issues or failed requests
          console.error("Error:", error);
          this.loadingAll = false;
        });
    },
    async logOut(userdetails) {
      return authAxios
        .post("customers/logout-customer")
        .then((response) => {
          // console.log(response);
          Notify.create({
            message: response.data.message,
            color: "green",
          });
          this.token = "";
          this.userdetails = null;
          userdetails = null;
          this.wishList = [];
          this.getBrandsProducts("dell");
          this.getCategoryProducts();
          this.getProducts();
        })
        .catch(({ response }) => {
          // console.log(response);
          this.token = null;
          this.userDetails = null;
          this.wishList = [];

          localStorage.setItem("token", "");
          localStorage.setItem("userdet", "");
        });
    },
  },
});
