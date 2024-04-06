<template>
  <div>
    <main class="">
      <section class="main_area container">
        <div class="left">
          <h4>Overview</h4>
          <p>
            At Qtekhub, we redefine the world of technology by offering a
            curated selection of cutting-edge gadgets that seamlessly blend
            innovation, functionality, and style. As your trusted gadget
            partner, we take pride in providing a one-stop destination for tech
            enthusiasts, where customer satisfaction and uncompromising quality
            take center stage.
          </p>
          <p>
            Discover a diverse range of gadgets that cater to every aspect of
            your modern lifestyle. From smart devices and wearables to home
            automation solutions, our collection is meticulously curated to meet
            the evolving needs of today's tech-savvy individuals.
          </p>
          <p>
            At Qtekhub, we stand behind the quality of every product we offer.
            Our commitment to excellence ensures that each gadget undergoes
            rigorous testing, guaranteeing durability, performance, and
            reliability.
          </p>
          <p>
            Your satisfaction is our top priority. Our dedicated customer
            support team is always ready to assist you, providing expert
            guidance, addressing inquiries, and ensuring a seamless shopping
            experience.
          </p>
          <p>
            Qtekhub is not just an online platform; it's a tech haven where
            cutting-edge meets convenience. Founded with a passion for
            technology and a vision to make it accessible to all, we have
            curated a collection of the finest computer gadgets and devices to
            elevate your digital experience.
          </p>
          <p>
            Shop with confidence, knowing that your personal information is
            protected. Our secure online platform prioritizes the privacy and
            safety of our customers.
          </p>
          <p>
            At Qtekhub, quality is non-negotiable. We collaborate with reputable
            brands and manufacturers to bring you products that meet the highest
            standards. Every item on our platform undergoes rigorous quality
            checks to ensure that you receive nothing but the best.
          </p>
          <p>
            Navigating the world of technology can be overwhelming, but with
            Qtekhub, it's a breeze. Our user-friendly website is designed to
            provide you with a seamless shopping experience. Whether you're a
            tech enthusiast or a casual shopper, you'll find what you need
            effortlessly.
          </p>
        </div>

        <!-- <div class="img">
          <img
            src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/assets/images/content/company_overview.png"
            alt=""
          />
        </div> -->
      </section>

      <div class="values">
        <div class="mission">
          <i class="fa-solid fa-bullseye"></i>
          <h3>Mission</h3>
          <p>
            At Qtekhub, we are on a mission to revolutionize the way you
            experience technology. We believe that everyone deserves access to
            top-notch computer gadgets and devices that enhance their digital
            lifestyles. Our commitment to quality, innovation, and customer
            satisfaction drives everything we do.
          </p>
        </div>

        <div class="vision">
          <h3>Vision</h3>
          <div class="vision_wrap">
            <div class="vision_card">
              <i class="fa-solid fa-eye"></i>
              <p>
                To be the most trusted and reliable online shopping platform.
              </p>
            </div>
            <div class="vision_card">
              <i class="fa-solid fa-eye"></i>
              <p>
                To be a company that employees, customers & society are proud of
                and depend on.
              </p>
            </div>
            <div class="vision_card">
              <i class="fa-solid fa-eye"></i>
              <p>To be a powerful force for the Economic Growth of Africa.</p>
            </div>
          </div>
        </div>
        <div class="vision">
          <h3>Values</h3>
          <div class="vision_wrap">
            <div class="vision_card">
              <i class="fa-solid fa-users"></i>
              <h4>Innovation</h4>
              <p>
                Embracing the latest technological trends, we constantly update
                our product offerings to keep you ahead in the ever-evolving
                digital landscape.
              </p>
            </div>
            <div class="vision_card">
              <i class="fa-solid fa-users"></i>
              <h4>Integrity</h4>
              <p>
                Transparency and honesty are the foundations of our business. We
                believe in building trust with our customers through clear
                communication and ethical practices.
              </p>
            </div>
            <div class="vision_card">
              <i class="fa-solid fa-users"></i>
              <h4>Customer Satisfaction</h4>
              <p>
                Your satisfaction is our top priority. We are dedicated to
                exceeding your expectations at every step of your Qtekhub
                journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <FooterVue />
</template>

<script>
import FooterVue from "src/components/FooterComp.vue";

export default {
  components: {
    FooterVue,
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}

li {
  list-style: none;
}

h5 {
  font-size: 30px;
}
h3 {
  text-align: center;
  font-weight: 700;
}
.container {
  width: 95%;
  margin: 0 auto;
  max-width: 1440px;
}

main .top {
  padding: 3rem;
  background: white;
  color: #000;
  font-size: 1rem;
  margin: 0;
}

main .top a {
  color: #000;
  font-weight: 700;
}
main .top .shopping_cart.active {
  color: #9a0052;
  font-weight: 700;
}
main .top span {
  color: #9b9b9b;
  display: inline-block;
  opacity: 0.8;
  position: relative;
  font-size: 1.2rem;
  margin: 0 0.5rem;
}

main .top h3 {
  color: #000;
  font-size: 2.5rem;
  line-height: 3rem;
  /* margin: 0 2.25rem; */
  padding-bottom: 1rem;
}

.main_area {
  background: #f9f9f9;
  padding: 3rem;
  // display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  // gap: 2rem;
  // align-items: center;
}

.main_area img {
  height: 300px;
  object-fit: cover;
}

.main_area h4 {
  font-size: 1.875rem;
  margin-top: 0.9375rem;
  color: #1c1d1f;
}
.main_area p {
  // font-size: 0.875rem;
  margin-top: 0.9375rem;
  color: #8f8f8f;
}

.values {
  margin: 3rem;
}

.values i {
  font-size: 3rem;
  // color: #fba100;
}

.values .vision h4 {
  text-align: center;
  // font-weight: 700;
}
.values h4 {
  margin: 0.5rem 0;
}
// .values p {
//   color: #8f8f8f;
//   font-size: 0.8125rem;
// }
.vision {
  margin: 3rem 0;
}

.values .vision_wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}
.values .vision_card {
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
  flex-direction: column;
}

.mission {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  flex-direction: column;
}

@media (max-width: 500px) {
  main .top h3 {
    font-size: 1.5rem;
  }

  main .top {
    padding: 1rem 2rem 0.5rem;
    background: white;
    color: #000;
    font-size: 0.85rem;
    margin: 0;
  }

  .main_area {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    padding: 1rem;
  }
}
</style>
