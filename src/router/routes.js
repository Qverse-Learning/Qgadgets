const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        name: "homepage",
      },
      {
        path: "/category/:id",
        component: () => import("pages/IndexPage.vue"),
        name: "category",
      },
      {
        path: "/brands/:id",
        component: () => import("pages/IndexPage.vue"),
        name: "brands",
        props: (route) => ({
          id: route.params.slug || "dell", // Default fallback value
        }),
      },
      {
        path: "/detail/:id",
        component: () => import("pages/ProductDetail.vue"),
        name: "product.detail",
      },
      {
        path: "/logout",
        component: () => import("pages/IndexPage.vue"),
        name: "logout",
      },
      {
        path: "/verify",
        component: () => import("pages/VerifyPage.vue"),
        name: "verify",
      },
      {
        path: "/product/search",
        component: () => import("pages/SearchPage.vue"),
        name: "search",
      },
      {
        path: "/order-summary",
        component: () => import("pages/OrderSummary.vue"),
        name: "orderSummary",
      },
    ],
  },
  {
    path: "/user/dashboard",
    component: () => import("layouts/DashBoard.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/dashboard/DashboardPage.vue"),
        name: "dashboard",
      },
      {
        path: "/user/orders",
        component: () => import("pages/dashboard/MyOrders.vue"),
        name: "orders",
      },
      {
        path: "/user/referrals",
        component: () => import("pages/dashboard/MyReferrals.vue"),
        name: "referrals",
      },
      {
        path: "/user/locations",
        component: () => import("pages/dashboard/MyLocations.vue"),
        name: "locations",
      },
      {
        path: "/user/settings",
        component: () => import("pages/dashboard/AccountDetails.vue"),
        name: "settings",
      },
      {
        path: "/success",
        component: () => import("pages/FundingSuccess.vue"),
        name: "success",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/terms-and-conditions",
    component: () => import("pages/TermsPage.vue"),
    name: "terms",
  },
  {
    path: "/about-us",
    component: () => import("pages/AboutPage.vue"),
    name: "about",
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
