<template>
  <b-modal id="modal-cart-mobile" hide-footer hide-header title="Checkout">
    <div class="modal-header">
      <h5 class="modal-title font-weight-bold">Checkout</h5>
      <button type="button" class="close" @click="$bvModal.hide('modal-cart-mobile')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <CartEmpty v-if="carts.length < 1" />
      <div class="main-cart mobile">
        <div class="my-4">
          <CartProduct v-for="cart in carts" :cart="cart" :key="cart.product.id" />
        </div>
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
    </div>
  </b-modal>
</template>

<script>
import CartProduct from './CartProduct'
import CartEmpty from './CartEmpty'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'ModalCategory',
  components: {
    CartProduct,
    CartEmpty
  },
  methods: {
    ...mapActions('cart', ['clearCart', 'saveCartToModal']),
    ...mapActions('history', ['postHistory']),
    checkout() {
      const isOk = confirm('Want to checkout ?')
      if (isOk) {
        // console.log(this.carts)
        this.saveCartToModal({
          products: this.carts,
          price: this.cartTotalPrice
        })
        const productName = []
        this.cartCheckout.products.map((cart) => {
          return productName.push(cart.product.name)
        })
        const dataHistory = {
          invoice: Math.random(0, 100).toString().substr(13),
          cashier: 'JoonaG',
          orders: productName.join(', '),
          amount: this.cartCheckout.totalPrice
        }
        this.postHistory(dataHistory)
        this.$bvModal.show('modal-checkout')
        this.$bvModal.hide('modal-cart-mobile')
      }
    }
  },
  computed: {
    ...mapState('cart', ['cartCheckout', 'carts']),
    ...mapGetters('cart', ['cartTotalPrice'])
  }
}
</script>

<style scoped>
.main-cart.mobile {
  max-height: 500px;
  overflow: scroll;
  padding: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.main-cart.mobile::-webkit-scrollbar {
  display: none;
}
</style>
