<template>
  <div class="container" id="pricing">
    <h2 class="sub-heading font-weight-bold mb-5 text-center">
      Tunggu Apa Lagi
      <br />Pilih Rencana Anda
    </h2>
    <div class="row">
      <div class="col-lg-9 col-md-11 col-sm-12 mx-auto">
        <div class="row mt-3">
          <PricingCard>
            <template #header>
              <h4 class="font-weight-bold">Sip POS Basic</h4>
              <span>Gratis</span>
            </template>
            <template #list>
              <div class="plan-item">
                <img
                  :src="require('@/assets/images/landing/check.svg')"
                  alt="check"
                />
                Termasuk semua halaman
              </div>
              <div class="plan-item">
                <img
                  :src="require('@/assets/images/landing/check.svg')"
                  alt="check"
                />
                Mempunyai tampilan responsive
              </div>
              <div class="plan-item x">
                <img
                  :src="require('@/assets/images/landing/times.svg')"
                  alt="times"
                />
                Versi terbaru
              </div>
              <div class="plan-item x">
                <img
                  :src="require('@/assets/images/landing/times.svg')"
                  alt="times"
                />
                Mendapatkan pembaruan secara gratis
              </div>
            </template>
            <template #button>
              <a
                href="https://github.com/joonacode/"
                target="_blank"
                class="btn btn-block btn-info mt-4 py-2 rounded-pill d-flex justify-content-center align-items-center"
              >
                Download
                <img
                  :src="require('@/assets/images/landing/download.svg')"
                  class="ml-2"
                  alt="download"
                />
              </a>
            </template>
          </PricingCard>
          <PricingCard :isPro="true" discount="-90%">
            <template #header>
              <h4 class="font-weight-bold">Sip POS Pro</h4>
              <span style="text-decoration: line-through">Rp. 1.000.000</span> /
              <span>Rp. 10.000</span>
            </template>
            <template #list>
              <div class="plan-item">
                <img
                  :src="require('@/assets/images/landing/check.svg')"
                  alt="check"
                />
                Termasuk semua halaman
              </div>
              <div class="plan-item">
                <img
                  :src="require('@/assets/images/landing/check.svg')"
                  alt="check"
                />
                Mempunyai tampilan responsive
              </div>
              <div class="plan-item">
                <img
                  :src="require('@/assets/images/landing/check.svg')"
                  alt="check"
                />
                Versi terbaru
              </div>
              <div class="plan-item">
                <img
                  :src="require('@/assets/images/landing/check.svg')"
                  alt="check"
                />
                Dapat pembaruan aplikasi
              </div>
            </template>
            <template #button>
              <a
                href="https://www.instagram.com/cepguna20/"
                target="_blank"
                class="btn btn-block btn-primary mt-4 py-2 rounded-pill d-flex justify-content-center align-items-center"
              >
                Buy Now
                <img
                  :src="require('@/assets/images/landing/cart.svg')"
                  class="ml-2"
                  alt="cart"
                />
              </a>
            </template>
          </PricingCard>
          <div class="col-md-12 text-center mt-4">
            <p class="text-center">Atau</p>
            <router-link
              :to="{ name: 'Login' }"
              class="btn btn-dark mt-3 shadow-sm px-5 py-2 ml-3"
            >
              Coba Demo
              <img
                :src="require('@/assets/images/landing/play.svg')"
                alt="play"
              />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PricingCard from './PricingCard'
export default {
  components: {
    PricingCard
  }
}
</script>

<style scoped>
</style>
