<template>
  <div class="col-md-6 mb-5">
    <div class="card pricing" :class="[isPro ? 'pro shadow' : 'basic shadow-sm']">
      <div class="card-body p-5">
        <div class="discount" v-if="discount">{{discount}}</div>
        <div class="text-center">
          <slot name="header"></slot>
        </div>
        <div class="list-plans">
          <slot name="list"></slot>
        </div>
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isPro', 'discount']
}
</script>

<style scoped>
</style>
