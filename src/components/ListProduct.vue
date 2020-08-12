<template>
  <div class="main-left mb-5">
    <div class="row">
      <div v-for="product in products" :key="product.id" class="col-lg-4 col-sm-6 mb-3">
        <CardProduct :detailProduct="product" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CardProduct from './CardProduct'
export default {
  name: 'ListProduct',
  components: {
    CardProduct
  },
  data () {
    return {
      products: []
    }
  },
  mounted () {
    axios.get('http://localhost:4000/api/v1/products')
      .then(response => {
        this.products = response.data.results
      })
      .catch(err => {
        console.log(err)
      })
  }
}

</script>

<style lang="scss" scoped>

</style>
