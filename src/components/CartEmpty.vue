<template>
  <div class="chart-empty">
    <img :src="require(`../assets/images/food-and-restaurant.png`)" alt="emptycart" />
    <h5>Your cart is empty</h5>
    <p>Please add some items from the menu</p>
  </div>
</template>

<script>
export default {
  name: 'CartEmpty'
}
</script>

<style scoped>
</style>
