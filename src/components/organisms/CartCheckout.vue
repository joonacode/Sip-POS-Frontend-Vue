<template>
  <div class="main-cart">
    <CartList v-if="carts.length > 0" />
    <CartEmpty v-if="carts.length < 1" />
    <div v-if="carts.length > 0" class="checkout py-5">
      <div class="form-group">
        <label>Member</label>
        <model-select :options="valueMemberForInput" v-model="member" placeholder="Select Member"></model-select>
      </div>
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
import { ModelSelect } from 'vue-search-select'
import mixins from '@/components/mixins/swal'
import CartEmpty from '@/components/atoms/CartEmpty'
import ModalCheckout from '@/components/molecules/ModalCheckout'
import CartList from '../molecules/CartList'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'CartCheckout',
  mixins: [mixins],
  components: {
    CartEmpty,
    ModalCheckout,
    ModelSelect,
    CartList
  },
  data() {
    return {
      member: '0, no member'
    }
  },
  methods: {
    ...mapMutations('cart', [
      'CLEAR_CART',
      'SAVE_CART_TO_MODAL',
      'GENERATE_INVOICE',
      'SET_EMAIL_MEMBER'
    ]),
    ...mapActions('history', ['postHistory']),
    ...mapActions('user', ['getMembers']),
    checkout() {
      this.confirmSwal('Checkout', 'Want to checkout ?', 'question', () => {
        this.SAVE_CART_TO_MODAL({
          products: this.carts,
          price: this.cartTotalPrice
        })
        const productName = []
        const purchaseAmount = []
        const initialPrice = []
        const priceAmount = []
        this.cartCheckout.products.map((cart) => {
          productName.push(cart.product.name)
          purchaseAmount.push(cart.qty)
          initialPrice.push(cart.product.price)
          priceAmount.push(cart.qty * cart.product.price)
        })
        this.GENERATE_INVOICE()
        const isMember = this.member.split(', ')
        const dataHistory = {
          invoice: this.invoice,
          idUser: this.getDetailUser.id,
          isMember: Number(isMember[0]),
          orders: productName.join(', '),
          amount: this.cartCheckout.totalPrice,
          purchaseAmount: purchaseAmount.join(', '),
          initialPrice: initialPrice.join(', '),
          priceAmount: priceAmount.join(', ')
        }
        this.postHistory(dataHistory)
          .then((response) => {
            this.toastSuccess('Transaction success')
            this.SET_EMAIL_MEMBER(isMember[1])
            this.member = '0, no member'
            this.$bvModal.show('modal-checkout')
          })
          .catch(({ error }) => {
            this.toastError(
              error.sqlMessage ? error.sqlMessage : error.join(', ')
            )
          })
      })
    }
  },
  mounted() {
    if (this.roleId !== 3) this.getMembers()
  },
  computed: {
    ...mapState('auth', ['roleId']),
    ...mapState('cart', ['carts', 'cartCheckout', 'invoice']),
    ...mapGetters('cart', ['cartTotalPrice', 'getInvoiceRandom']),
    ...mapGetters('user', ['getDetailUser', 'allMembers']),
    valueMemberForInput() {
      const members = this.allMembers.map((member) => {
        return {
          value: `${member.id}, ${member.email}`,
          text: `${member.name} | ${member.email}`
        }
      })
      members.unshift({ value: '0, no member', text: 'No Member' })
      return members
    }
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
