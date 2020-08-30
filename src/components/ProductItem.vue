<template>
  <b-card no-body class="product">
    <a
      @dblclick.prevent="REMOVE_PRODUCT_FROM_CART(detailProduct.id)"
      @click.prevent="ADD_TO_CART({product: detailProduct, qty: 1})"
      class="action-img"
    >
      <div
        class="product-image"
        :class="[checkActive.some(v => v === detailProduct.id) ? 'active' : '']"
      >
        <img :src="detailProduct.image" :alt="detailProduct.name" />
        <ProductCheckIcon />
      </div>
    </a>
    <div class="card-body product-detail">
      <span class="product-title">{{detailProduct.name}}</span>
      <span class="product-price d-block">{{detailProduct.price | currency}}</span>
    </div>
  </b-card>
</template>

<script>
import ProductCheckIcon from './ProductCheckIcon'
import { mapMutations } from 'vuex'
export default {
  name: 'CardProduct',
  components: {
    ProductCheckIcon
  },
  props: ['detailProduct', 'checkActive'],
  methods: mapMutations('cart', ['ADD_TO_CART', 'REMOVE_PRODUCT_FROM_CART'])
}
</script>

<style scoped>
</style>
