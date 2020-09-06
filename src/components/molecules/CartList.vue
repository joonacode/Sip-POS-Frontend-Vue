<template>
  <div class="list-chart">
    <CartItem v-for="cart in carts" :cart="cart" :key="cart.product.id" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CartItem from '@/components/molecules/CartItem'
export default {
  name: 'CartList',
  components: {
    CartItem
  },
  computed: mapState('cart', ['carts'])
}
</script>

<style scoped>
</style>
