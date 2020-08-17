<template>
  <div class="main-left mb-5">
    <div class="row">
      <SearchNavbar />
      <b-col md="12">
        <OrderProduct />
      </b-col>
      <div v-for="product in allProducts" :key="product.id" class="col-lg-4 col-sm-6 mb-3">
        <CardProduct :detailProduct="product" :checkActive="checkActive" />
      </div>
      <div
        v-if="allProducts.length < 1"
        class="d-flex flex-column d-flex justify-content-center height-not-found w-100"
      >
        <div class="text-center my-5">
          <h1 class="text-danger font-weight-bold">Data Not Found</h1>
        </div>
      </div>
      <b-col v-if="product.totalProduct !== 0" md="12 mt-4">
        <Pagination
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
import SearchNavbar from './SearchNavbar'
import Pagination from './Pagination'
import OrderProduct from './OrderProduct'
import CardProduct from './CardProduct'
export default {
  name: 'ListProduct',
  components: {
    CardProduct,
    Pagination,
    OrderProduct,
    SearchNavbar
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
    },
    addModal() {
      this.changeStatusHideModal(false)
      this.changeStatusModal('add')
      this.product.product.name = ''
      this.product.product.price = ''
      this.product.product.category = ''
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
