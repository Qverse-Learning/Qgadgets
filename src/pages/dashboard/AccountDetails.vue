<template>
  <q-page>
    <div class="container dashpage">
      <div>
        <div class="dashboard_head_text q-mt-lg">Account Details</div>
      </div>

      <div
        v-if="loading"
        style="height: 80vh"
        class="row align-items justify-center"
      >
        <q-skeleton height="200px" width="100%" class="" />
      </div>

      <div v-else class="grid">
        <div class="location">
          <div class="top">Profile</div>

          <div class="profile_details">
            <div class="detail">
              <label for="">Name</label>
              <div class="text">
                {{ details.first_name }} {{ details.last_name }}
              </div>
            </div>
            <div class="detail">
              <label for="">Email Address</label>
              <div class="text">{{ details.email }}</div>
            </div>
            <div class="detail">
              <label for="">PHONE NUMBER</label>
              <div class="text">{{ details.phone_number }}</div>
            </div>
          </div>
        </div>
        <div class="location">
          <div class="top">Security</div>

          <div class="profile_details q-mt-lg">
            <div
              @click="prompt = true"
              style="gap: 1rem"
              class="detail cursor-pointer row no-wrap"
            >
              <div class="icon"><i class="fa-solid fa-lock"></i></div>
              <div class="text">Change Password</div>
            </div>
            <div
              @click="confirm = true"
              style="gap: 1rem"
              class="detail cursor-pointer row no-wrap"
            >
              <div class="icon"><i class="fa-solid fa-delete-left"></i></div>
              <div class="text">Delete Account</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">New Password</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            label="Current Password"
            v-model="dataPassword.current_password"
            autofocus
            @keyup.enter="prompt = false"
          />

          <small
            class="text-red text-weight-bold"
            v-if="errors.current_password"
          >
            {{ errors.current_password }}
          </small>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            label="New Password"
            v-model="dataPassword.new_password"
            autofocus
            @keyup.enter="prompt = false"
          />

          <small class="text-red text-weight-bold" v-if="errors.new_password">
            {{ errors.new_password }}
          </small>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            label="New Password Confirmation"
            v-model="dataPassword.new_password_confirmation"
            autofocus
            @keyup.enter="prompt = false"
          />

          <small
            class="text-red text-weight-bold"
            v-if="errors.new_password_confirmation"
          >
            {{ errors.new_password_confirmation }}
          </small>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            @click="changePassword"
            :loading="loadBtn"
            label="Change Password"
            class="bg-secondary text-white"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="fa-solid fa-user"
            color="primary"
            text-color="white"
          />
          <span class="q-ml-sm"
            >Are you sure you want to delete your account?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            @click="deleteAcc"
            class="bg-primary text-white"
            label="Ok"
            color="secondary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      details: [],
      loading: true,
      dataPassword: {},
      loadBtn: false,
      errors: {},
      prompt: false,
      confirm: false,
    };
  },

  created() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      this.loading = true;
      this.$authAxios
        .get("customer/dashboard/customer-details")
        .then(({ data }) => {
          this.loading = false;
          this.details = data.customer;
          console.log(data);
        })
        .catch(({ response }) => {
          if (response.status === 401) {
            this.$q.notify({
              message: `Session expired, Please login again`,
              color: "red",
              position: "bottom",
              timeout: 10500,
              actions: [{ icon: "close", color: "white" }],
            });

            this.$router.replace({
              name: "logout",
            });
          }
          this.$q.notify({
            message: `Error`,
            color: "red",
            position: "bottom",
          });
        });
    },
    changePassword() {
      this.loadBtn = true;
      this.$authAxios
        .post("customer/dashboard/customer-change-password", this.dataPassword)
        .then(({ data }) => {
          this.loadBtn = false;
          this.$q.notify({
            message: `Passoword Successfully changed`,
            color: "green",
            position: "bottom",
            timeout: 10500,
            actions: [{ icon: "close", color: "white" }],
          });
          this.prompt = false;
          // console.log(data);
        })
        .catch(({ response }) => {
          this.loadBtn = false;
          // console.log(response);
          this.errors = response.data.error;
          this.$q.notify({
            message: `Error`,
            color: "red",
            position: "bottom",
            timeout: 10500,
            actions: [{ icon: "close", color: "white" }],
          });
        });
    },
    deleteAcc() {
      this.loadBtn = true;
      this.$authAxios
        .delete("customer/dashboard/customer-delete-account")
        .then((data) => {
          this.loadBtn = false;
          this.$q.notify({
            message: `Account deleted`,
            color: "green",
            position: "bottom",
            timeout: 10500,
            actions: [{ icon: "close", color: "white" }],
          });
          this.$router.replace("/");
          // console.log(data);
        })
        .catch(({ response }) => {
          this.loadBtn = false;

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
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.location {
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid #00ff71;
  border-radius: 18px;
  position: relative;
  margin: 2rem 0;
  min-height: 287px;
}
.top {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 29px;
  color: #000000;
  margin-bottom: 1rem;
}

.detail {
  margin: 1rem 0;
}

.detail .icon {
  color: #e88d04;
}
.detail .icon i {
  font-size: 1.5rem;
}
.detail label {
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #e88d04;
  text-transform: capitalize;
}
.detail .text {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}

@media (max-width: 500px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  .detail .text {
    width: 95%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header {
    margin-bottom: 0rem;
  }

  .detail .text {
    font-size: 14px;
  }
}
</style>
