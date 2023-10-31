import { boot } from "quasar/wrappers";
import axios from "axios";
import { Notify } from "quasar";
import loadStore from "stores/loader";

const authAxios = axios.create({
  baseURL: "https://sales-app.workmanfix.com/api/v1/",
});

function hasQueryParams(route) {
  // console.log(route);
  if (route.query.ref) {
    return !!Object.keys(route.query).length;
  } else {
    return;
  }
}
export default boot(({ app, store, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$authAxios = authAxios;
  app.config.globalProperties.$store = loadStore;

  let auth = store.state.value.myqmartauthPc;
  console.log(auth);
  authAxios.interceptors.response.use(function (response) {
    if (response.data && response.data.token) {
      token = response.data.token;
    }

    return response;
  });
  authAxios.interceptors.response.use(
    function (response) {
      return response;
    },
    (e) => {
      console.log(e);
      let status_code = !e.response || e.response.status;
      console.log(status_code);
      if (e.message === "Network Error") {
        Notify.create({
          message: e.message + " check your internet connection",
          color: "red",
        });
      } else if (
        status_code === 401 &&
        e.response.config.url !== "customer/dashboard/wishlist"
      ) {
        if (e.response.config.url === "customer/dashboard/wishlist/add") {
          auth.modals = true;
          Notify.create({
            message: "You need to login to add favorites",
            color: "red",
          });
        } else {
          auth.modals = true;
          Notify.create({
            message: "You need to login to view page",
            color: "red",
          });
        }

        router.replace({
          name: "homepage",
        });
        Promise.reject(e);
      } else if (e.message === "timeout exceeded") {
        Notify.create({
          message: e.message + " check your internet connection",
          color: "red",
        });
      } else {
        return Promise.reject(e);
      }
      return Promise.reject(e);
    }
  );

  authAxios.interceptors.request.use(function (config) {
    if (auth.token) {
      config.headers.Authorization = "Bearer " + auth.token;
    }
    return config;
  });
  router.beforeEach((to, from, next) => {
    const store = app.config.globalProperties.$store;

    if (store.myqmartauthPc.token) {
      authAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${store.myqmartauthPc.token}`;
    }
    if (to.name === "logout" && store.myqmartauthPc.userdetails) {
      store.myqmartauthPc.logOut(store.myqmartauthPc.userdetails).then(() => {
        store.myqmartauthPc.token = "";
        store.myqmartauthPc.userdetails = "";
        return router.replace({ name: "homepage" });
      });
    }

    if (!hasQueryParams(to) && hasQueryParams(from)) {
      router.replace({
        name: to.name,
        params: to.params.id ? { id: to.params.id } : {},
        query: from.query,
        hash: to.hash,
      });
    } else {
      next();
    }
  });
});

export { axios, authAxios };
