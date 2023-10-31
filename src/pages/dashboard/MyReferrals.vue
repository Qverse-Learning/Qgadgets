<template>
  <q-page>
    <div
      v-if="loading"
      style="height: 90vh; flex-direction: column"
      class="row items-center justify-center"
    >
      <q-skeleton style="margin: 0 auto" height="200px" width="80%" class="" />
    </div>
    <div v-else class="dashpage container">
      <div class="row q-pt-lg justify-between items-center">
        <div class="dashboard_head_text">My referrals</div>
        <q-btn
          style="min-height: auto; text-transform: capitalize"
          @click="copy"
          color="secondary"
        >
          Copy Referral Code
        </q-btn>
      </div>
      <div class="style q-pt-xl">
        <q-table
          :rows="rows"
          :hide-header="mode === 'grid'"
          :columns="columns"
          row-key="id"
          :grid="mode == 'grid'"
          :filter="filter"
          :loading="loading"
          @request="onRequest"
        >
          <template v-slot:body-cell-created_at="props">
            <q-td :props="props">
              <div class="added">
                {{ new Date(props.row.created_at) }}
              </div>
            </q-td>
          </template>
          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-negative q-gutter-sm">
              <span> {{ message }} </span>
            </div>
          </template>
        </q-table>
      </div>
    </div>
    <div v-if="!loading && !rows.length" class="empty">
      <img src="/empty.svg" alt="" />

      <div class="empty_text">You have not made any referrals yet</div>
    </div>
  </q-page>
</template>

<script>
import { copyToClipboard } from "quasar";
import { useMyAuthStore } from "src/stores/auth";
let store = useMyAuthStore();
const columns = [
  {
    name: "name",
    required: true,
    align: "left",
    label: "Name",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "email",
    required: true,
    label: "Email",
    align: "left",
    field: (row) => row.email,
    sortable: true,
  },
  {
    name: "phone",
    required: true,
    label: "Phone",
    align: "left",
    field: (row) => row.phone,
    sortable: true,
  },
  {
    name: "customer_referral_id",
    required: true,
    label: "Customer referral ID",
    align: "left",
    field: (row) => row.customer_referral_id,
    sortable: true,
  },
  {
    name: "created_at",
    required: true,
    label: "Date",
    align: "left",
    field: (row) => new Date(row.created_at),
    sortable: true,
  },
];

export default {
  data() {
    return {
      refers: [],
      columns,
      rows: [],
      loading: true,
      mode: "list",
      filter: "",
    };
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
  },
  methods: {
    copy() {
      copyToClipboard(
        `${window.location.hostname}?ref=${store.userdetails.refferal_id}`
      )
        .then(() => {
          // success!
          this.$q.notify({
            message: "Referral code copied!",
            color: "green",
            position: "top",
          });
        })
        .catch(() => {
          // fail
          this.$q.notify({
            message: "error copying!",
            color: "red",
            position: "top",
          });
        });
    },
    onRequest(props) {
      // this.loading = true;
      const url = `customer/dashboard/customer-refers`;
      this.curl = url;
      this.$authAxios
        .get(url)
        .then(({ data }) => {
          // console.log(data);
          this.loading = false;
          this.rows = data.refers;
        })
        .catch(({ response }) => {
          // console.log(response);
          this.loading = false;
          this.rows = [];
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
        });
    },
    getrefers() {
      this.loading = true;
      this.$authAxios
        .get("customer-refers")
        .then((data) => {
          this.loading = false;
          this.rows = data.data;
          // console.log(data);
        })
        .catch(({ response }) => {
          this.loading = false;
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
.head {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 7rem 0 4rem;
}
.head img {
  width: 91px;
  height: 91px;
}

.order_wrap {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.orders {
  background: rgba(255, 193, 99, 0.3);
  border: 1px solid #ffc163;
  border-radius: 18px;
  max-width: 492px;
  padding: 1.5rem;
}

.orders.fulfiled {
  background: #ffffff;
  border: 1px solid #00ff71;
  border-radius: 18px;
}

.orders_head .food_orders_left .top {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 0.3rem;

  color: #000000;
}
.orders_head .food_orders_left .down {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #e88d04;
}

.orders.fulfiled .orders_head .food_orders_left .down {
  color: #949494;
}
.orders_head .food_orders_right .top {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
}

.orders.fulfiled .orders_head .food_orders_right .top,
.orders.fulfiled .orders_head .food_orders_right .top i {
  color: #03662f;
  font-weight: 700;
}
.orders_head .food_orders_right .down {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #e88d04;
}

.orders.fulfiled .orders_head .food_orders_right .down {
  color: #949494;
}

.orders.fulfiled .order {
  background: #ffffff;
  border: 1px solid #00ff71;
}
.order {
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid #ffc163;
  border-radius: 10px;
  margin-top: 2rem;

  img {
    width: 105.32px;
    height: 123px;
    border-radius: 12px;
  }

  .order_details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 2;
    height: auto;
    padding: 1rem 0.7rem;

    .order_details_title {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #000000;
    }

    .order_details_vendor {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      margin-top: 0.2rem;
      img {
        width: 24px;
        height: 14px;
      }
    }

    .order_det_down {
      span:first-of-type {
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
      }
      span:last-of-type {
        font-family: "Inter";
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        color: #000000;
      }
    }
  }
}
.orders.fulfiled .order {
  background: #ffffff;
  border: 1px solid #00ff71;
}
.delivery_area span:first-of-type {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
}
.delivery_area span:last-of-type {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
}

.delivery_area {
  margin-top: 1.5rem;
  padding: 1rem;
  border-top: 1px solid rgba(255, 193, 99, 0.42);
  border-bottom: 1px solid rgba(255, 193, 99, 0.42);
}

.orders.fulfiled .delivery_area {
  border-top: 1px solid rgba(0, 255, 113, 0.38);
  border-bottom: 1px solid rgba(0, 255, 113, 0.38);
}
.total {
  margin: 2rem 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.total span:first-of-type {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;
  color: #000000;
}
.total span:last-of-type {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
}

.enquiries {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  margin-top: 5rem;
}

.notif {
  position: sticky;
  width: 100%;
  top: 10%;
  height: 100%;
  left: 40%;
}
</style>
