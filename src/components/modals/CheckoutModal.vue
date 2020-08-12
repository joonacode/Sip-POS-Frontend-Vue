<template>
  <div class="modal fade" id="modalCheckout" tabindex="-1" role="dialog" aria-labelledby="modalCheckoutLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content p-3 rounded-xs">
        <div class="modal-header border-bottom-0 pb-0">
          <h5 class="modal-title font-weight-bold" id="addMenuLabel">
            Checkout
          </h5>
          <span class="font-weight-bold">Receipt no: #010410919</span>
        </div>

        <div class="modal-body pt-2">
          <small class="mb-5 d-inline-block">Cashier: Pevita Pearce</small>
          <div class="print-list">
            <div class="prod">
              <span>Coffe Latte 1x</span>
              <span>Rp. 15.000</span>
            </div>
            <div class="prod">
              <span>Black Forest 1x</span>
              <span>Rp. 30.000</span>
            </div>
            <div class="prod">
              <span>Salmon Truffle Teriyaki 1x</span>
              <span>Rp. 60.000</span>
            </div>
            <div class="prod">
              <span>PPN 10%</span>
              <span>Rp. 10.500</span>
            </div>
            <div class="float-right font-weight-bold font-15">
              Total: Rp. 115.500
            </div>
            <div class="clearfix"></div>
            <p class="font-weight-bold font-15">
              Payment: Cash
            </p>
          </div>
        </div>
        <div class="modal-footer d-block border-top-0">
          <button type="button" class="btn btn-one px-4 font-weight-bold rounded-xs btn-block" data-dismiss="modal">
            Print
          </button>
          <p class="text-center">Or</p>
          <button type="button" class="btn font-weight-bold btn-block btn-two px-4 rounded-xs">
            Send Email
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutModal'
}

</script>

<style lang="scss" scoped>

</style>
