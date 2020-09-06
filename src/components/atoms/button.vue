<template>
  <b-button
    :variant="variant"
    @click="$emit('cus-click')"
    :class="cusClass"
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
  name: 'g-button',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String
    },
    cusClass: {
      type: String
    },
    size: {
      type: String
    },
    shadow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
</style>
