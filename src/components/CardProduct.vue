<template>
  <b-card no-body class="product">
    <a
      @dblclick.prevent="removeProductFromCart(detailProduct.id)"
      @click.prevent="addToCart({product: detailProduct, qty: 1})"
      class="action-img"
    >
      <div
        v-lazy-container="{ selector: 'img' }"
        class="product-image"
        :class="[checkActive.some(v => v === detailProduct.id) ? 'active' : '']"
      >
        <img
          :data-src="detailProduct.image"
          :data-loading="require(`@/assets/images/charlie-loader.gif`)"
          alt
          srcset
        />
        <CheckIcon />
      </div>
    </a>
    <div class="card-body product-detail">
      <span class="product-title">{{detailProduct.name}}</span>
      <span class="product-price d-block">{{detailProduct.price | currency}}</span>
    </div>
  </b-card>
</template>

<script>
import CheckIcon from './CheckIcon'
import { mapActions } from 'vuex'
export default {
  name: 'CardProduct',
  components: {
    CheckIcon
  },
  props: ['detailProduct', 'checkActive'],
  methods: mapActions('cart', ['addToCart', 'removeProductFromCart'])
}
</script>

<style scoped>
.product-image.active .check-icon {
  display: block;
}

.product-detail {
  padding: 5px 0 !important;
}

.product-title {
  color: #333;
  display: inline-block;
  margin-bottom: 2px;
}

.product-title:hover {
  color: #000;
}

.product-price {
  color: #333;
  font-weight: bold;
}
.product {
  border: 0 !important;
  background-color: transparent !important;
}

.product .action-img:hover {
  opacity: 0.8;
}

.action-img {
  transition: 0.2s;
  cursor: pointer;
}

.product-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image img {
  border-radius: 10px 10px 0 0;

  height: 200px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.product-image.active::after {
  content: '';
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px 10px 0 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
