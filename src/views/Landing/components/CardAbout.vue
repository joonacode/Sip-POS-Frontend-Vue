<template>
  <div class="col-md-6 mb-4">
    <div class="card border-0 shadow-sm">
      <div class="card-body p-4">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="my-3 font-weight-bold">{{title}}</h4>
          <span class="border rounded-circle p-2">
            <img :src="icon" alt />
          </span>
        </div>
        <slot name="description"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'icon']
}
</script>

<style scoped>
</style>
