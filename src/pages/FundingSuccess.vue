<template>
  <div class="hold">
    <q-spinner v-if="loading" color="primary" size="3em" />

    <div v-if="!loading" class="text-h3">Wallet funding successful</div>
    <q-btn
      :to="{ name: 'dashboard' }"
      color="primary"
      no-caps
      no-wrap
      class="q-mt-lg"
      >Go to dashboard</q-btn
    >
  </div>
</template>

<script>
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
let store = useMyAuthStore();
export default {
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.confirmFunding();
  },
  methods: {
    confirmFunding() {
      let ref = this.$router.currentRoute.value.query.reference;
      authAxios
        .get(`customer/dashboard/wallet-callback?reference=${ref}`)
        .then((response) => {
          console.log(response);
          this.$q.notify({
            message: response.data.message,
            color: "green",
            position: "top",
            actions: [{ icon: "close", color: "white" }],
          });
          this.getUser();
        })
        .catch((error) => {
          // Handle the error
          console.log(error);
          this.$q.notify({
            message: "Error",
            color: "red",
            position: "bottom",
            actions: [{ icon: "close", color: "white" }],
          });
        });
    },
    getUser() {
      authAxios
        .get(`customers/profile-customer`)
        .then((response) => {
          this.loading = false;
          store.userdetails = { ...response.data };
          console.log(response);
        })
        .catch((error) => {
          // Handle the error
          console.log(error);
          this.$q.notify({
            message: "Error",
            color: "red",
            position: "bottom",
            actions: [{ icon: "close", color: "white" }],
          });
        });
    },
  },
};
</script>

<style scoped>
.hold {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
}
</style>
