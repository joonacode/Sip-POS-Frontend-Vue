<template>
  <div class="chart-product mb-4">
    <div class="position-relative">
      <div class="img-list-chart">
        <img :src="cart.product.image" alt />
      </div>
      <button
        @click="removeProductFromCart(cart.product.id)"
        class="btn btn-sm text-white delete-chart"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-trash-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
          />
        </svg>
      </button>
    </div>
    <div class="name-input">
      <span class="chart-title-product">{{cart.product.name}}</span>
      {{cart.product.price | currency}} | {{cart.product.price * cart.qty | currency}}
      <CartInput :qty="cart.qty" :product="cart.product" />
    </div>
  </div>
</template>

<script>
import CartInput from './CartInput'
import { mapActions } from 'vuex'
export default {
  components: {
    CartInput
  },
  props: ['cart'],
  methods: mapActions('cart', ['removeProductFromCart'])
}
</script>

<style scoped>
</style>
