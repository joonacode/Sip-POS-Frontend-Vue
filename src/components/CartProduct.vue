<template>
  <div class="main-cart">
    <div class="chart-empty">
      <img :src="require(`../assets/images/food-and-restaurant.png`)" alt="emptycart" />
      <h5>Your cart is empty</h5>
      <p>Please add some items from the menu</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartProduct'
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
