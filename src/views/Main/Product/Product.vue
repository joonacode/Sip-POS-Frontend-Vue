<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col md="12" class="px-0">
          <div class="content-left history pt-4 pr-4 pb-0">
            <Sidebar />
            <div class="main-left mb-5">
              <div class="row">
                <b-col md="12">
                  <b-card no-body class="shadow-sm border-0">
                    <div
                      class="card-header bg-light d-flex justify-content-between align-items-center"
                    >
                      <h3 class="card-title mb-0">Product</h3>
                      <div>
                        <b-button @click="addModal" v-b-modal.modal-1 variant="primary">Add Product</b-button>
                        <router-link :to="{name: 'Category'}" class="btn ml-2 btn-primary">Category</router-link>
                      </div>
                    </div>
                    <div class="card-body">
                      <TableProduct
                        :products="{allProducts, perPage: limit, currentPage: product.currentPage}"
                      />
                      <Pagination
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
          </div>
        </b-col>
      </b-row>
    </b-container>
    <ModalProduct :limit="limit" />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import Sidebar from '@/components/Sidebar'
import Pagination from '@/components/Pagination'
import TableProduct from '@/components/TableProduct'
import ModalProduct from '@/components/ModalProduct'
// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Product',
  components: {
    Sidebar,
    TableProduct,
    Pagination,
    ModalProduct
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
