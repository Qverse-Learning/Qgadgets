<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top section">
        <div class="footer-brand">
          <router-link
            :to="{
              name: 'homepage',
            }"
            class="logo"
            ><img
              style="max-width: 200px; max-height: 150px"
              src="/logo.png"
              alt=""
          /></router-link>

          <ul>
            <li class="footer-list-item">
              <i class="fa-solid fa-location-dot"></i>

              <address class="address">
                56, Coal City Garden Estate, Enugu, Enugu State.
              </address>
            </li>

            <li class="footer-list-item">
              <i class="fa-solid fa-phone"></i>

              <a href="tel:+2347044914032" class="footer-link">07044914032</a>
            </li>

            <!-- <li>
              <ul class="social-list">
                <li>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=100090188731613&mibextid=ZbWKwL"
                    class="social-link"
                  >
                    <i class="fa-brands fa-facebook"></i>
                  </a>
                </li>

                <li>
                  <a
                    target="_blank"
                    href="https://x.com/QmartHub?t=N9klz1-MHPDCnTzCt56wOw&s=09"
                    class="social-link"
                  >
                    <i class="fa-brands fa-x-twitter"></i>
                  </a>
                </li>

                <li>
                  <a
                    target="_blank"
                    href="https://instagram.com/theqmart_hub?igshid=MzRlODBiNWFlZA=="
                    class="social-link"
                  >
                    <i class="fa-brands fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </li> -->
          </ul>
        </div>

        <ul class="footer-list">
          <li>
            <p class="footer-list-title">Help & Information</p>
          </li>
          <!-- <li>
            <a href="#" class="footer-link">FAQ Page</a>
          </li> -->

          <li>
            <router-link
              :to="{
                name: 'terms',
              }"
              class="footer-link"
              >Terms & Conditions</router-link
            >
          </li>
        </ul>

        <ul class="footer-list">
          <li>
            <p class="footer-list-title">About Us</p>
          </li>

          <li>
            <router-link
              :to="{
                name: 'about',
              }"
              class="footer-link"
              >About Us</router-link
            >
          </li>

          <li>
            <a
              href="mailto:info@qtekhub.com"
              target="_blank"
              class="footer-link"
              >Contact Us</a
            >
          </li>
        </ul>

        <!-- <div class="footer-list">
          <p class="footer-list-title">Newsletter</p>

          <form action="" class="footer-form">
            <input
              type="email"
              name="email_address"
              placeholder="Your email address"
              required
              class="email-field"
            />

            <button type="submit" class="footer-form-btn">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </form>

          <div class="wrapper">
            <a
              href="https://qmarthub.com/terms"
              target="_blank"
              class="footer-link"
              >Term & Condition</a
            >
            <a
              href="https://qmarthub.com/terms"
              target="_blank"
              class="footer-link"
              >Policy</a
            >
          </div>
        </div>-->
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          &copy; {{ new Date().getFullYear() }} All Rights Reserved by
          <span class="copyright-link">Qtekhub</span>.
        </p>
      </div>
    </div>
  </footer>
  <q-btn
    flat
    no-caps
    @click="gotop"
    class="back-top-btn"
    aria-label="back to top"
    data-back-top-btn
  >
    <i class="fa-solid fa-arrow-up"></i>
  </q-btn>
</template>

<script setup>
const gotop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style lang="scss" scoped></style>
