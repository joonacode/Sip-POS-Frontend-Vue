<template>
  <div>
    <select class="form-control form-shadow" :class="cusClass">
      <slot></slot>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    cusClass: {
      type: String
    }
  }
}
</script>

<style scoped>
.form-shadow {
  border: 0;
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
