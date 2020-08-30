<template>
  <b-card no-body class="shadow-sm border-0">
    <div class="card-header">
      <h5 class="mb-0 font-weight-bold">
        <slot name="header"></slot>
      </h5>
    </div>
    <div class="card-body">
      <slot name="body"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </b-card>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>
