<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card shadow border-0 rounded-lg">
          <div class="card-header">
            <h4 class="card-title font-weight-bold py-2 text-center mb-0">
              <slot name="header"></slot>
            </h4>
          </div>
          <div class="card-body">
            <slot name="form"></slot>
          </div>
          <div class="card-footer">
            <span class="d-block">
              <slot name="footer"></slot>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthCard'
}
</script>

<style lang="scss" scoped>
</style>
