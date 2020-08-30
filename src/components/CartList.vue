<template>
  <div class="main-cart">
    <CartEmpty v-if="carts.length < 1" />
    <div v-if="carts.length > 0" class="list-chart">
      <CartItem v-for="cart in carts" :cart="cart" :key="cart.product.id" />
    </div>
    <div v-if="carts.length > 0" class="checkout py-5">
      <div class="d-flex font-weight-bold justify-content-between">
        <span>Total:</span>
        <span>{{cartTotalPrice | currency}}*</span>
      </div>
      <p class="mt-2 mb-1">*Belum termasuk ppn</p>
      <b-button
        @click="checkout"
        class="btn btn-two font-weight-bold py-2 mb-2 btn-block border-0"
      >Checkout</b-button>
      <button @click="CLEAR_CART" class="btn btn-one font-weight-bold py-2 btn-block">Cancel</button>
    </div>
    <ModalCheckout />
  </div>
</template>

<script>
import CartEmpty from './CartEmpty'
import CartItem from './CartItem'
import ModalCheckout from './ModalCheckout'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'CartList',
  components: {
    CartEmpty,
    CartItem,
    ModalCheckout
  },
  methods: {
    ...mapMutations('cart', [
      'CLEAR_CART',
      'SAVE_CART_TO_MODAL',
      'GENERATE_INVOICE'
    ]),
    ...mapActions('history', ['postHistory']),
    checkout() {
      const isOk = confirm('Want to checkout ?')
      if (isOk) {
        this.SAVE_CART_TO_MODAL({
          products: this.carts,
          price: this.cartTotalPrice
        })
        const productName = []
        this.cartCheckout.products.map((cart) => {
          return productName.push(cart.product.name)
        })
        this.GENERATE_INVOICE()
        const dataHistory = {
          invoice: this.invoice,
          idUser: this.getDetailUser.id,
          orders: productName.join(', '),
          amount: this.cartCheckout.totalPrice
        }
        this.postHistory(dataHistory)
        this.$bvModal.show('modal-checkout')
      }
    }
  },
  computed: {
    ...mapState('cart', ['carts', 'cartCheckout', 'invoice']),
    ...mapGetters('cart', ['cartTotalPrice', 'getInvoiceRandom']),
    ...mapGetters('user', ['getDetailUser'])
  }
}
</script>

<style scoped>
.cart-ic-res {
  position: absolute !important;
  top: -2px;
  right: 6px;
}

.main-cart {
  padding: 0 20px;
}
</style>
