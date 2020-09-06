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
          <CartItem v-for="cart in carts" :cart="cart" :key="cart.product.id" />
        </div>
      </div>
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
    </div>
  </b-modal>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { ModelSelect } from 'vue-search-select'
import CartItem from '@/components/molecules/CartItem'
import CartEmpty from '@/components/atoms/CartEmpty'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'ModalCategory',
  components: {
    CartItem,
    CartEmpty,
    ModelSelect
  },
  mixins: [mixins],
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
            this.$bvModal.hide('modal-cart-mobile')
          })
          .catch(({ error }) => {
            this.toastError(
              error.sqlMessage ? error.sqlMessage : error.join(', ')
            )
          })
      })
    }
  },
  computed: {
    ...mapState('cart', ['cartCheckout', 'carts', 'invoice']),
    ...mapGetters('cart', ['cartTotalPrice']),
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
