<template>
  <button title="Logout" @click="logout" :class="classBtn">
    <slot></slot>
  </button>
</template>

<script>
import mixins from '@/components/mixins'
export default {
  name: 'ButtonLogout',
  mixins: [mixins],
  props: ['classBtn']
}
</script>

<style scoped>
</style>
