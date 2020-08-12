<template>
  <div class="card product">
    <a href="list.html" class="action-img">
      <div class="product-image">
        <img :src="detailProduct.image" alt="" srcset="">
        <div class="check-icon"></div>
      </div>
    </a>
    <div class="card-body product-detail">
      <a href="#" class="product-title">
        {{detailProduct.name}}
      </a>
      <span class="product-price  d-block">Rp. {{detailProduct.price}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProduct',
  props: ['detailProduct']

}

</script>

<style lang="scss" scoped>

</style>
