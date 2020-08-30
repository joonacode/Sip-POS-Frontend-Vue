<template>
  <MainContainer>
    <div class="main-left mb-5">
      <div class="row">
        <b-col md="12">
          <b-card no-body class="shadow-sm border-0">
            <HeaderCard
              @add-modal="addModal"
              @refresh-body="refreshProduct"
              :limit="limit"
              title="Product"
            />
            <div class="card-body">
              <TableProduct
                :products="{allProducts, perPage: limit,total:product.totalProduct, currentPage: product.currentPage}"
              />
              <MainPagination
                :dataPagination="{
                  perPage: limit,
                  currentPage: product.currentPage,
                  totalProduct: product.totalProduct,
                  pagination: product.pagination,
                  linkPagination: product.linkPagination
                }"
                @clicked="updatePage"
              />
            </div>
          </b-card>
        </b-col>
      </div>
    </div>
    <ModalProduct :limit="limit" />
  </MainContainer>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import MainPagination from '@/components/ui/MainPagination'
import TableProduct from './TableProduct'
import ModalProduct from './ModalProduct'
import HeaderCard from '@/components/ui/HeaderCard'
import MainContainer from '@/components/ui/MainContainer'

// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Product',
  components: {
    TableProduct,
    MainPagination,
    ModalProduct,
    HeaderCard,
    MainContainer
  },
  data() {
    return {
      items: [],
      limit: 10
    }
  },
  methods: {
    ...mapActions(['changeStatusHideModal', 'changeStatusModal']),
    ...mapActions('product', ['getProducts', 'changeModalTitle']),
    updatePage(page = null) {
      this.product.currentPage = page
      this.getProducts({ limit: this.limit, page })
    },
    refreshProduct() {
      this.getProducts({ limit: this.limit, page: 1 })
      this.product.currentPage = 1
    },
    addModal() {
      this.changeStatusHideModal(false)
      this.changeStatusModal('add')
      this.product.product.name = ''
      this.product.product.price = ''
      this.product.product.image = ''
      this.product.product.category = ''
    }
  },
  mounted() {
    this.product.currentPage = 1
    this.getProducts({ limit: this.limit })
  },
  computed: {
    ...mapState(['product']),
    ...mapGetters('product', ['allProducts'])
  }
}
</script>
<style scoped>
.pr-7 {
  padding-right: 6rem !important;
}
</style>
