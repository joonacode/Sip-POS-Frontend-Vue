<template>
  <div class="main-cart">
    <CartEmpty v-if="carts.length < 1" />
    <div v-if="carts.length > 0" class="list-chart">
      <CartProduct v-for="cart in carts" :cart="cart" :key="cart.product.id" />
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
      <button @click="clearCart" class="btn btn-one font-weight-bold py-2 btn-block">Cancel</button>
    </div>
    <ModalCheckout />
  </div>
</template>

<script>
import CartEmpty from './CartEmpty'
import CartProduct from './CartProduct'
import ModalCheckout from './ModalCheckout'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'CartList',
  components: {
    CartEmpty,
    CartProduct,
    ModalCheckout
  },
  methods: {
    ...mapActions('cart', ['clearCart', 'saveCartToModal']),
    ...mapActions('history', ['postHistory']),
    checkout() {
      // console.log(this.carts)
      const isOk = confirm('Want to checkout ?')
      if (isOk) {
        this.saveCartToModal({
          products: this.carts,
          price: this.cartTotalPrice
        })
        const productName = []
        this.cartCheckout.products.map((cart) => {
          return productName.push(cart.product.name)
        })
        const dataHistory = {
          invoice: this.getInvoiceRandom,
          cashier: 'JoonaG',
          orders: productName.join(', '),
          amount: this.cartCheckout.totalPrice
        }
        this.postHistory(dataHistory)
        this.$bvModal.show('modal-checkout')
      }
    }
  },
  computed: {
    ...mapState('cart', ['carts', 'cartCheckout']),
    ...mapGetters('cart', ['cartTotalPrice', 'getInvoiceRandom'])
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
