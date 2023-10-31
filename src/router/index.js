import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    // scrollBehavior: () => ({ left: 0, top: 0 }),
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        // If there's a saved position, return to that position
        return savedPosition;
      } else if (to.hash) {
        // If the route has a hash (e.g., #section), scroll to that hash
        setTimeout(() => {
          const element = document.querySelector(to.hash);
          if (element) {
            return { el: element, behavior: "smooth" };
          }
        }, 100);
        // return { el: to.hash, behavior: "smooth" };
      } else {
        // By default, maintain the current scroll position
        return { left: 0, top: 0 };
      }
    },
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
