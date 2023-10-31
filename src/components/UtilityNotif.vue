<template>
  <div v-if="show">
    <div style="gap: 1rem" class="head row items-center no-wrap">
      <img src="/bike.svg" alt="" />
      <div class="details">
        <div class="why_title">You have an order in progress</div>
        <div class="why_desc">A delivery agent will contact you shortly</div>
      </div>

      <q-btn @click="show = false" flat class="menu_bar_btn" color="primary">
        <img src="/close.svg" alt="" />
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.head {
  background: #e3fff0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2),
    inset 0px -1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  width: fit-content;
  padding: 1rem 7rem 1rem 0.5rem;
  position: relative;
  height: 105px;
}
.why_title {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  margin-bottom: 0;
}
.why_desc {
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  color: #e88d04;
}

img {
  width: 59px;
  height: 59px;
}

.menu_bar_btn {
  position: absolute;
  right: 2%;
  top: 2%;
}

.q-btn img {
  width: 13px;
  height: 12px;
}

@media (max-width: 500px) {
  .why_title {
    font-size: 14px;
  }
  .why_desc {
    font-size: 12px;
  }
}
</style>
