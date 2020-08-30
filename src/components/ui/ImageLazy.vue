<template>
  <div v-lazy-container="{ selector: 'img' }" class="product-image" :class="classList">
    <img
      :data-src="imageSrc"
      :data-loading="require(`@/assets/images/charlie-loader.gif`)"
      :alt="alt ? alt : 'image'"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ImageLazy',
  props: ['imageSrc', 'alt', 'classList']
}
</script>

<style scoped>
</style>
