<template>
  <div class="container" id="why">
    <h2 class="sub-heading font-weight-bold mb-5 text-center">Kenapa Sip POS Cocok Untuk Usaha Anda</h2>
    <div class="row">
      <CardAbout title="Berbasis Website" :icon="require(`@/assets/images/landing/laptop.svg`)">
        <template #description>
          <p class="mb-0 mt-2">Dapat diakses diperangkat apa saja dan dimana saja</p>
        </template>
      </CardAbout>
      <CardAbout title="Gratis" :icon="require(`@/assets/images/landing/money.svg`)">
        <template #description>
          <p class="mb-0 mt-2">Terdapat versi gratis dengan semua fitur yang sama</p>
        </template>
      </CardAbout>
      <CardAbout title="Responsive" :icon="require(`@/assets/images/landing/phone.svg`)">
        <template #description>
          <p class="mb-0 mt-2">Tampilan optimal ketika aplikasi dipakai di perangkat berbeda</p>
        </template>
      </CardAbout>
      <CardAbout title="No Reload" :icon="require(`@/assets/images/landing/reload.svg`)">
        <template #description>
          <p class="mb-0 mt-2">Tidak perlu mereload halaman ketika melakukan transaksi</p>
        </template>
      </CardAbout>
    </div>
  </div>
</template>

<script>
import CardAbout from './CardAbout'
export default {
  components: {
    CardAbout
  }
}
</script>

<style scoped>
</style>
