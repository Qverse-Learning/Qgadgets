<template>
  <q-page>
    <div
      v-if="loading"
      style="height: 90vh; flex-direction: column"
      class="row align-items justify-center"
    >
      <q-skeleton style="margin: 0 auto" height="200px" width="80%" class="" />
    </div>
    <div
      v-if="!loading && orders.message !== 'No Order has been placed by You'"
      class="dashpage container"
    >
      <!-- {{ orders }} -->
      <div>
        <div class="dashboard_head_text q-mt-lg">My Orders</div>
        <div class="dashboard_sub_text q-mt-sm">
          {{ orders.pending }} IN PROGRESS . {{ orders.delivered }} FULLFILLED
        </div>
        <!-- <div class="dashboard_sub_text q-mt-sm">2 Saved Addresses</div> -->
      </div>
      <div class="order_wrap q-mt-xl">
        <div
          v-for="order in orders.orders"
          :key="order.id"
          :class="order.status === 'Pending' ? 'orders' : 'orders fulfiled'"
        >
          <div class="left">
            <div class="orders_head row justify-between items-center">
              <div class="food_orders_left">
                <div class="top">Ordered Now</div>
                <div class="down">
                  {{
                    new Date(order.created_at).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })
                  }}
                </div>
                <!-- <div class="down">{{February 1, 2023 | 3:45PM}}</div> -->
              </div>
              <div class="food_orders_right">
                <div class="top"><i class="fa-solid fa-gear"></i>Status</div>
                <div v-if="order.status === 'Pending'" class="down">
                  IN PROGRESS
                </div>
                <div v-else class="down">Delivered</div>
              </div>
            </div>

            <div class="order">
              <img :src="order.product_image" alt="" />
              <div class="order_details">
                <div class="order_det_top">
                  <div class="order_details_title">
                    {{ order.product_name }}
                  </div>
                </div>

                <div class="order_det_down row items-center justify-between">
                  <span>₦{{ order.price }}</span> <span>{{ order.qty }}x</span>
                </div>
              </div>
            </div>

            <div class="delivery_area">
              <span>Delivery:</span>
              <span>₦800</span>
            </div>

            <div class="total">
              <span> Total </span>

              <span> ₦{{ parseInt(order.price) * parseInt(order.qty) }} </span>
            </div>
          </div>

          <div class="right"></div>
        </div>
      </div>
    </div>
    <!-- {{ orders }} -->

    <div
      v-if="!loading && orders.message === 'No Order has been placed by You'"
      class="empty"
    >
      <img src="/empty.svg" alt="" />
      <!-- {{ order }} -->
      <div class="empty_text">You have not made any orders yet</div>

      <div class="q-pa-md q-gutter-sm">
        <q-btn
          style="text-transform: capitalize"
          color="secondary"
          :to="{ name: 'shop' }"
          text-color="white"
          label="Order Grocery"
        />
        <q-btn
          style="text-transform: capitalize"
          color="primary"
          :to="{ name: 'foodshome' }"
          label="Order Food"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { authAxios } from "src/boot/axios";
export default {
  data() {
    return {
      orders: [],
      order: [],
      loading: true,
    };
  },

  created() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      this.loading = true;
      authAxios
        .get("customer/dashboard/customer-order")
        .then(({ data }) => {
          this.loading = false;
          console.log(data);
          this.orders = data.orders;
          if (data) {
            this.orders = {
              ...data,
              message: "orders made",
            };
          }
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
  gap: 3rem 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 29px;
  margin-bottom: 0.3rem;

  color: #000000;
}
.orders_head .food_orders_left .down {
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
    height: 90px;
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
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #000000;
    }

    .order_details_vendor {
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
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
      }
      span:last-of-type {
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
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
}
.delivery_area span:last-of-type {
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
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 48px;
  color: #000000;
}
.total span:last-of-type {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 29px;
  color: #000000;
}

.enquiries {
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
