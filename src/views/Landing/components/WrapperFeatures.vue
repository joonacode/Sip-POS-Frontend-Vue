<template>
  <div class="section-wrapper" :id="id">
    <div class="container content-margin">
      <div class="row align-items-center" v-if="imageRight">
        <div class="col-md-6 pr-5">
          <h2 class="sub-heading font-weight-bold mb-4">
            <slot name="title"></slot>
          </h2>
          <p class="text-desc">
            <slot name="description"></slot>
          </p>
        </div>
        <div class="col-md-6">
          <div class="card bg-img-fluid shadow-md">
            <div class="card-body pt-4 pl-4 pr-4 pb-0">
              <div v-lazy-container="{ selector: 'img' }">
                <img
                  :data-src="image"
                  :data-loading="require(`@/assets/images/charlie-loader.gif`)"
                  class="lazyload img-fluid"
                  alt="list"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row align-items-center" v-else>
        <div class="col-md-6">
          <div class="card border-0" :class="[bgTransparent ? 'bg-transparent' : '']">
            <div class="card-body pt-4 pl-4 pr-4 pb-0">
              <div v-lazy-container="{ selector: 'img' }">
                <img
                  :data-src="image"
                  :data-loading="require(`@/assets/images/charlie-loader.gif`)"
                  class="lazyload img-fluid"
                  alt="mobile"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h2 class="sub-heading font-weight-bold mb-4">
            <slot name="title"></slot>
          </h2>
          <p class="text-desc">
            <slot name="description"></slot>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'imageRight', 'image', 'bgTransparent']
}
</script>

<style scoped>
</style>
