<template>
  <div class="row">
    <div
      v-for="product in allProducts"
      :key="product.id"
      class="col-sm-6 mb-3"
      :class="[roleId === 3 ? 'col-lg-3 col-md-4' : 'col-lg-4 col-md-4']"
    >
      <ProductItem :detailProduct="product" :checkActive="checkActive" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ProductItem from '@/components/molecules/ProductItem'
export default {
  components: {
    ProductItem
  },
  computed: {
    ...mapState('cart', ['carts']),
    ...mapGetters('product', ['allProducts']),
    ...mapState('auth', ['roleId']),
    checkActive() {
      const carts = this.carts
      return carts.map((cart) => {
        return cart.product.id
      })
    }
  }
}
</script>

<style scoped>
</style>
