<template>
  <b-modal id="modal-checkout" hide-footer hide-header title="Checkout">
    <div class="modal-header border-bottom-0 pb-0">
      <h5 class="modal-title font-weight-bold" id="addMenuLabel">Checkout</h5>
      <span class="font-weight-bold">Receipt no: #{{getInvoiceRandom}}</span>
    </div>
    <div class="modal-body pt-2">
      <small class="mb-5 d-inline-block">Cashier: Pevita Pearce</small>
      <div class="print-list">
        <div class="prod" v-for="cart in cartCheckout.products" :key="cart.product.id">
          <span>{{cart.product.name}} {{cart.qty}}x</span>
          <span>{{cart.product.price | currency}}</span>
        </div>
        <div
          class="float-right font-weight-bold font-15"
        >Total: {{cartCheckout.totalPrice | currency}}</div>
        <div class="clearfix"></div>
        <p class="font-weight-bold font-15">Payment: Cash</p>
      </div>
    </div>
    <div class="modal-footer d-block border-top-0">
      <button
        type="button"
        class="btn btn-one px-4 font-weight-bold rounded-xs btn-block"
        data-dismiss="modal"
      >Print</button>
      <p class="text-center">Or</p>
      <button
        type="button"
        class="btn font-weight-bold btn-block btn-two px-4 rounded-xs"
      >Send Email</button>
    </div>
  </b-modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'ModalCategory',
  computed: {
    ...mapState('cart', ['cartCheckout']),
    ...mapGetters('cart', ['getInvoiceRandom'])
  }
}
</script>

<style lang="scss" scoped>
</style>
