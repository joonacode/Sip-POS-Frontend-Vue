<template>
  <b-modal id="modal-checkout" hide-footer hide-header title="Checkout">
    <CheckoutItem
      :getInvoice="getInvoice"
      :emailMember="emailMember"
      :cartCheckout="cartCheckout"
      :getDetailUser="getDetailUser"
    />
    <div class="modal-footer d-block border-top-0" v-if="!print">
      <button
        type="button"
        class="btn btn-one px-4 font-weight-bold rounded-xs btn-block"
        @click="printInvoice"
      >Print</button>
      <div v-if="emailMember !== 'no member'">
        <p class="text-center">Or</p>
        <g-button
          @cus-click="sendEmail"
          type="button"
          cusClass="btn font-weight-bold btn-block btn-two px-4 rounded-xs"
          :isLoading="getLoading"
        >Send Email</g-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import CheckoutItem from '@/components/molecules/CheckoutItem'
import mixins from '@/components/mixins/swal'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ModalCategory',
  components: {
    CheckoutItem
  },
  data() {
    return {
      print: false
    }
  },
  mixins: [mixins],
  methods: {
    ...mapActions('history', ['sendReceipt']),
    printInvoice() {
      this.print = true
      setTimeout(() => {
        this.$htmlToPaper('modal-checkout', null, () => {
          this.print = false
        })
      }, 200)
    },
    sendEmail() {
      const orders = []
      const purchaseAmount = []
      const initialPrice = []
      const priceAmount = []
      this.cartCheckout.products.map((product) => {
        const { name, price } = product.product
        orders.push(name)
        purchaseAmount.push(product.qty)
        initialPrice.push(price)
        priceAmount.push(price * product.qty)
      })
      const data = {
        invoice: `${this.getInvoice}`,
        cashier: this.getDetailUser.name,
        email: this.emailMember,
        orders: orders.join(', '),
        purchaseAmount: purchaseAmount.join(', '),
        initialPrice: initialPrice.join(', '),
        priceAmount: priceAmount.join(', '),
        amount: this.cartCheckout.totalPrice
      }
      this.sendReceipt(data)
        .then((response) => {
          this.toastSuccess('purchase details sent successfully')
        })
        .catch((err) => {
          this.toastSuccess(err)
        })
    }
  },
  computed: {
    ...mapState('cart', ['cartCheckout', 'emailMember']),
    ...mapGetters('cart', ['getInvoice']),
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters(['getLoading'])
  }
}
</script>

<style lang="scss" scoped>
</style>
