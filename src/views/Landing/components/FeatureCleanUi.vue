<template>
  <div class="section-wrapper" id="features">
    <div class="container content-margin">
      <div class="row align-items-center">
        <div class="col-md-6 pr-5">
          <h2 class="sub-heading font-weight-bold mb-4">Clean and Fresh UI</h2>
          <p class="text-desc">Antarmuka yang bersih dan mudah dipahami oleh user</p>
        </div>
        <div class="col-md-6">
          <div class="card bg-img-fluid shadow-md">
            <div class="card-body pt-4 pl-4 pr-4 pb-0">
              <div v-lazy-container="{ selector: 'img' }">
                <img
                  :data-src="require(`@/assets/images/list.png`)"
                  :data-loading="require(`@/assets/images/charlie-loader.gif`)"
                  class="lazyload img-fluid"
                  alt="list"
                />
              </div>
            </div>
          </div>
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
