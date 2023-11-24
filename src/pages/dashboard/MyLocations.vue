<template>
  <q-page>
    <div
      v-if="loading"
      style="height: 90vh; flex-direction: column"
      class="row align-items justify-center"
    >
      <q-skeleton style="margin: 0 auto" height="200px" width="80%" class="" />
    </div>
    <div v-else class="container dashpage">
      <div>
        <div class="dashboard_head_text q-mt-lg">My Locations</div>
        <div class="dashboard_sub_text q-mt-sm">
          {{ location.length }} Saved Addresses
        </div>
      </div>

      <div
        v-if="loading"
        style="height: 80vh"
        class="row align-items justify-center"
      >
        <q-skeleton height="200px" width="100%" class="" />
      </div>

      <div v-else v-for="n in location" :key="n" class="location">
        <div class="top">
          <span> <i class="fa-solid fa-location-dot"></i> Enugu </span>

          <span class="date">{{ new Date(n.created_at) }} </span>
        </div>

        <div class="down">{{ n.location }}</div>
      </div>
    </div>

    <div v-if="!loading && !location.length" class="empty">
      <img src="/empty.svg" alt="" />

      <div class="empty_text">You have not added any locations yet</div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      location: [],
      loading: true,
    };
  },

  created() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      this.loading = true;
      this.$authAxios
        .get("customer/dashboard/customer-location")
        .then((data) => {
          console.log(data);
          this.loading = false;
          this.location = data.data.details ? data.data.details : [];
        })
        .catch(({ response }) => {
          this.loading = false;
          if (response.status === 401) {
            this.$q.notify({
              message: `Session expired, Please login again`,
              color: "red",
              position: "bottom",
              timeout: 10500,
              actions: [{ icon: "close", color: "white" }],
            });
            // this.$store.myqmartauth.logOut();
            this.$router.replace({
              name: "logout",
            });
          }
          this.$q.notify({
            message: `Error`,
            color: "red",
            position: "bottom",
            timeout: 10500,
            actions: [{ icon: "close", color: "white" }],
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.location {
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid hsl(146, 75%, 30%);
  border-radius: 18px;
  position: relative;
  margin: 2rem 0;
  height: 164px;
}
.top {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 29px;
  color: #000000;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 2rem;
}

.top i {
  margin-right: 0.5rem;
}

.top span:first-of-type {
  display: flex;
}

.top span.date {
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #e88d04;
}

.down {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  margin: 1.5rem 0;
}

.menu_bar_btn {
  position: absolute;
  top: 2%;
  right: 2%;
}

@media (max-width: 600px) {
  .location {
    padding: 1rem;
    height: auto;
  }
  .top {
    font-size: 16px;
    align-items: center;
  }

  .down {
    font-size: 14px;
  }
}
</style>
