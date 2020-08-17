<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <button
        class="btn btn-success-custom rounded-0 min-btn"
        @click="minQtyCartComp(product)"
        type="button"
      >-</button>
    </div>
    <input
      type="number"
      min="1"
      v-model="totalQty"
      :placeholder="qty"
      @keyup.enter="changeTotalQtyComp(product)"
      class="form-control total-ord custom-chart-input"
      aria-label="Example text with button addon"
      aria-describedby="button-addon1"
    />
    <button
      @click="plusQtyCartComp(product)"
      class="btn ml-min btn-success-custom rounded-0 add-btn"
      type="button"
    >+</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CartInput',
  props: ['qty', 'product'],
  data() {
    return {
      totalQty: ''
    }
  },
  methods: {
    ...mapActions('cart', ['minQtyCart', 'plusQtyCart', 'changeTotalQty']),
    minQtyCartComp(product) {
      this.minQtyCart(product)
      this.totalQty = ''
    },
    plusQtyCartComp(product) {
      this.plusQtyCart(product)
      this.totalQty = ''
    },
    changeTotalQtyComp(product) {
      if (this.totalQty < 1) {
        this.totalQty = ''
      }
      this.changeTotalQty({ product, qty: this.totalQty })
    }
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
