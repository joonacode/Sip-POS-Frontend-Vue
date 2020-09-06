<template>
  <div id="modal-checkout-1">
    <div class="modal-header border-bottom-0 pb-0">
      <h5 class="modal-title font-weight-bold" id="addMenuLabel">Checkout</h5>
      <span class="font-weight-bold">Receipt no: #{{getInvoice}}</span>
    </div>
    <div class="modal-body pt-2">
      <small class="mb-5 d-inline-block">Cashier: {{getDetailUser.name}}</small>
      <div class="print-list">
        <div
          class="d-flex justify-content-between text-center font-weight-bold"
          :style="{margin:'0 0 20px 0', fontSize:'15px'}"
          v-for="cart in cartCheckout.products"
          :key="cart.product.id"
        >
          <span>{{cart.product.name}} {{cart.qty}}x</span>
          <span>{{cart.product.price | currency}}</span>
        </div>
        <div
          class="float-right font-weight-bold font-15"
        >Total: {{cartCheckout.totalPrice | currency}}</div>
        <div class="clearfix"></div>
        <small
          class="mb-0 mt-3 d-inline-block"
          v-if="emailMember !== 'no member'"
        >Member: {{emailMember}}</small>
        <p class="font-weight-bold font-15">Payment: Cash</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['getInvoice', 'emailMember', 'cartCheckout', 'getDetailUser']
}
</script>

<style scoped>
</style>
