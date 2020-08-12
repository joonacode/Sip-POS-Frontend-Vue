<template>
  <div>
    <AddModal />
    <CartModal />
    <CheckoutModal />
  </div>
</template>

<script>
import AddModal from './modals/AddModal'
import CartModal from './modals/CartModal'
import CheckoutModal from './modals/CheckoutModal'

export default {
  name: 'Modals',
  components: {
    AddModal,
    CartModal,
    CheckoutModal
  }
}
</script>

<style lang="scss" scoped>

</style>
