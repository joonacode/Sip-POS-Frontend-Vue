<template>
  <b-button
    :variant="variant"
    @click="$emit('cus-click')"
    :class="customClass"
    :size="size"
    :disabled="isLoading"
  >
    <div v-if="isLoading">
      <b-spinner small></b-spinner>
      <span class="sr-only">Loading...</span>
    </div>
    <slot v-if="!isLoading"></slot>
  </b-button>
</template>

<script>
export default {
  name: 'MainButton',
  props: ['isLoading', 'variant', 'customClass', 'size']
}
</script>

<style scoped>
</style>
