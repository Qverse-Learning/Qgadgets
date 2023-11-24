<template>
  <div v-if="spin" class="spin">
    <q-spinner color="primary" size="3em" :thickness="10" />
  </div>
  <q-page v-else>
    <div class="orderPage container">
      <div class="notif">
        <UtilityNotif />
      </div>

      <div class="head">
        <img src="/bike.svg" alt="" />
        <div class="why_title">Your Order has been recieved</div>
        <div class="why_desc">Our delivery agent will contact you shortly</div>
      </div>
      <div class="order_wrap">
        <div class="orders">
          <div class="left">
            <div class="orders_head row justify-between items-center">
              <div class="food_orders_left">
                <div class="top">Ordered Now</div>
                <div v-if="productOrders.length" class="down">
                  {{
                    new Date(productOrders[0].created_at).toLocaleString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )
                  }}
                </div>
              </div>
              <div class="food_orders_right">
                <div class="top"><i class="fa-solid fa-gear"></i>Status</div>
                <div class="down">IN PROGRESS</div>
              </div>
            </div>

            <div
              v-for="(productOrder, index) in productOrderss"
              :key="index"
              class="order"
            >
              <img :src="productOrder.product_image" alt="" />
              <div class="order_details">
                <div class="order_det_top">
                  <div class="order_details_title">
                    {{ productOrder.product_name }}
                  </div>
                </div>

                <div class="order_det_down row items-center justify-between">
                  <span>₦{{ productOrder.price.toLocaleString() }}</span>
                  <span>x{{ productOrder.qty }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="right"></div>
        </div>
      </div>

      <div class="price_area">
        <div class="left_">
          <div class="sec">
            <div class="sec_text">Service Fee:</div>
            <div class="amount_title">
              ₦{{ details.delivery.toLocaleString() }}
            </div>
          </div>
          <div class="sec">
            <div class="sec_text">Sum Total Amount:</div>

            <div class="amount_title">
              ₦{{
                (productTotal + parseInt(details.delivery)).toLocaleString()
              }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="enquiries row items-center no-wrap justify-center text-center"
      >
        For more inquiries >
        <strong class="row q-ml-sm items-center no-wrap">
          <i class="fa-solid fa-phone"></i>
          <a
            href="tel:+2347044914032"
            target="_blank"
            class="contact-link text-black"
            >07044914032</a
          >
        </strong>
      </div>
    </div>

    <FooterComp />
  </q-page>
</template>

<script>
import UtilityNotif from "src/components/UtilityNotif.vue";
import FooterComp from "src/components/FooterComp.vue";
import { authAxios } from "src/boot/axios";
import { Dialog } from "quasar";
export default {
  components: {
    UtilityNotif,
    FooterComp,
  },

  data() {
    return {
      loading: false,
      showReceipt: false,
      det: false,
      spin: true,
      details: {},
      toppingsArr: [],
      total: 0,
      orders: [],
      productOrders: [],
      productTotal: [],
    };
  },

  created() {
    this.getInvoice();
  },

  methods: {
    getInvoice() {
      let reference = this.$route.query.reference;
      authAxios
        .get(`checkout/verify-orders?reference=${reference}`)
        .then(({ data }) => {
          // console.log(data);
          this.details = data;
          this.productOrderss = data.orders;
          this.productTotal = this.productOrderss.reduce((sum, i) => {
            return sum + parseInt(i.price) * parseInt(i.qty);
          }, 0);

          this.spin = false;
        })
        .catch(({ response }) => {
          // console.log(response);
          if (
            response.data.message === "This order does not exist for this user"
          ) {
            Dialog.create({
              title: "Alert",
              message: `You made this order when you were logged out you will need to logout to view this summary again. Logout and refresh page.`,
              persistent: true,
            })
              .onOk(() => {})
              .onCancel(() => {
                // console.log('I am triggered on both OK and Cancel')
              })
              .onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
              });
          } else if (
            response.data.message === "No order was found using the reference"
          ) {
            Dialog.create({
              title: "Alert",
              message: `You made this order when you were logged in you will need to login to view this summary again. Login and refresh page.`,
              persistent: true,
            })
              .onOk(() => {})
              .onCancel(() => {
                // console.log('I am triggered on both OK and Cancel')
              })
              .onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
              });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.spin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.orderPage {
  margin: 12% auto;
}
.head {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem 0 4rem;
}
.head img {
  width: 91px;
  height: 91px;
}

.order_wrap {
  // display: grid;
  // gap: 1rem;
  // grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  max-width: 700px;
  margin: 0 auto;
  height: fit-content;
}

main {
  padding-top: 3rem;
}

.orders {
  background: rgba(255, 193, 99, 0.3);
  border: 1px solid #ffc163;
  border-radius: 18px;
  max-width: 492px;
  padding: 1.5rem;
  height: fit-content;
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
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #000000;
    }

    .order_details_vendor {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
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
        font-size: 14px;
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
  font-size: 12px;
  line-height: 17px;
  color: #000000;
}
.delivery_area span:last-of-type {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
}

.delivery_area {
  margin-top: 1.5rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-size: 30px;
  line-height: 48px;
  color: #000000;
}
.total span:last-of-type {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 29px;
  color: #000000;
}

.enquiries {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  margin: 5rem 0 2rem;
}

.notif {
  position: sticky;
  width: 100%;
  top: 10%;
  height: 100%;
  left: 40%;
  z-index: 10;
}

.price_area {
  background: rgba(0, 255, 113, 0.12);
  border: 1px solid #00ff71;
  border-radius: 30px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  flex-wrap: wrap;
  justify-content: center;
  margin: 3rem auto 1rem;
}
.price_area .left_ {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5rem;
}
.sec_text {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #000000;
}
.amount_title {
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 44px;
  color: #000000;
  white-space: nowrap;
}

.sum_det > .row {
  padding: 1.5rem 0;
}
.sum_det > .row:first-of-type {
  border-bottom: 1px solid #d1d1cd;
}

@media (max-width: 764px) {
  .price_area .left_ {
    gap: 2rem;
  }
  .price_area {
    justify-content: center;
  }
}
@media (max-width: 500px) {
  .enquiries {
    margin: 3rem 0;
  }

  .order .order_details .order_details_title {
    font-size: 16px;
  }
}
</style>
