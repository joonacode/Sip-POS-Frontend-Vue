<template>
  <div class="section-wrapper" id="responsive">
    <div class="container content-margin">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="card border-0 bg-transparent">
            <div class="card-body pt-4 pl-4 pr-4 pb-0">
              <div v-lazy-container="{ selector: 'img' }">
                <img
                  :data-src="require(`@/assets/images/mobile.png`)"
                  :data-loading="require(`@/assets/images/charlie-loader.gif`)"
                  class="lazyload img-fluid"
                  alt="mobile"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h2 class="sub-heading font-weight-bold mb-4">Mobile Friendly</h2>
          <p class="text-desc">Antarmukan terlihat bagus ketika diakses menggunakan ponsel</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
</style>
