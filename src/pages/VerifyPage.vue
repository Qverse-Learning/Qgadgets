<template>
  <div class="hold">
    <q-spinner v-if="loading" color="primary" size="3em" />

    <div v-if="!loading" class="text-h3">Wallet funding successful</div>
  </div>
</template>

<script>
import { authAxios } from "src/boot/axios";
export default {
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.getToken();
  },
  methods: {
    getToken() {
      let token = this.$router.currentRoute.value.query.token;
      // console.log(token);
      authAxios
        .get(`customers/email-verification?token=${token}`)
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          // Handle the error
          // console.log(error);
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
