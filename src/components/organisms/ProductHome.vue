<template>
  <div class="main-left mb-5">
    <div class="row">
      <SearchNavbar />
      <b-col md="12">
        <OrderProduct />
      </b-col>
    </div>
    <div v-if="getLoading" class="mt-5">
      <div class="d-flex justify-content-center flex-column align-items-center mb-3">
        <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
        <span class="ml-2 d-block text-center mt-3">Loading...</span>
      </div>
    </div>
    <ProductList v-if="!getLoading" />
    <div class="row" v-if="!getLoading">
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
import SearchNavbar from '@/components/molecules/SearchNavbar'
import MainPagination from '@/components/molecules/MainPagination'
import OrderProduct from '@/components/molecules/OrderProduct'
import ProductList from '@/components/molecules/ProductList'
import ProductNotFound from '@/components/atoms/ProductNotFound'

export default {
  name: 'ProductHome',
  components: {
    ProductList,
    MainPagination,
    OrderProduct,
    SearchNavbar,
    ProductNotFound
  },
  data() {
    return {
      items: [],
      isLoading: true
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
        page,
        limit: this.roleId !== 3 ? 9 : 12
      })
    }
  },
  mounted() {
    if (!this.getLoading) {
      this.getProducts({
        page: this.product.currentPage,
        limit: this.roleId !== 3 ? 9 : 12
      })
    }
  },
  computed: {
    ...mapState(['product']),
    ...mapGetters(['getLoading']),
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
.height-not-found {
  height: 400px;
}
</style>
