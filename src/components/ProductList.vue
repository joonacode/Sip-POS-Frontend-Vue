<template>
  <div class="main-left mb-5">
    <div class="row">
      <SearchNavbar />
      <b-col md="12">
        <OrderProduct />
      </b-col>
      <div v-for="product in allProducts" :key="product.id" class="col-lg-4 col-sm-6 mb-3">
        <ProductItem :detailProduct="product" :checkActive="checkActive" />
      </div>
      <ProductNotFound v-if="allProducts.length < 1" />
      <b-col v-if="product.totalProduct !== 0" md="12 mt-4">
        <MainPagination
          :dataPagination="{
            perPage: product.perPage,
            currentPage: product.currentPage,
            totalProduct: product.totalProduct,
            pagination: product.pagination,
            linkPagination: product.linkPagination
          }"
          @clicked="updatePage"
        />
      </b-col>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import SearchNavbar from '@/components/SearchNavbar'
import MainPagination from '@/components/ui/MainPagination'
import OrderProduct from '@/components/ui/OrderProduct'
import ProductItem from './ProductItem'
import ProductNotFound from './ProductNotFound'

export default {
  name: 'ListProduct',
  components: {
    ProductItem,
    MainPagination,
    OrderProduct,
    SearchNavbar,
    ProductNotFound
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    ...mapActions(['changeStatusHideModal', 'changeStatusModal']),
    ...mapActions('product', ['getProducts', 'changeModalTitle']),
    updatePage(page = null) {
      this.product.currentPage = page
      this.getProducts({
        sort: this.product.ordering.sort,
        order: this.product.ordering.order,
        search: this.product.searchInputText,
        page
      })
    }
  },
  mounted() {
    this.product.currentPage = 1
    this.getProducts({ page: this.product.currentPage })
  },
  computed: {
    ...mapState(['product']),
    ...mapState('cart', ['carts']),
    ...mapGetters('product', ['allProducts']),
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
.height-not-found {
  height: 400px;
}
</style>
