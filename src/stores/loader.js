import { useCartStore } from "stores/cart";
import { useMyAuthStore } from "stores/auth";

export default {
  cart: useCartStore(),
  myqmartauthPc: useMyAuthStore(),
};
