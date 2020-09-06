<template>
  <MainContainer>
    <div class="main-left mb-5">
      <div class="row">
        <b-col md="12">
          <g-card @add-modal="addModal" @refresh-body="refreshProduct" title="Product">
            <template #cardBody>
              <TableProduct :products="allProductsNoPaging" />
            </template>
          </g-card>
        </b-col>
      </div>
    </div>
    <ModalProduct :limit="limit" />
  </MainContainer>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import TableProduct from './TableProduct'
import ModalProduct from './ModalProduct'
import MainContainer from '@/components/organisms/MainContainer'
// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Product',
  components: {
    TableProduct,
    ModalProduct,
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
    ...mapActions('product', ['getProductsNoPaging', 'changeModalTitle']),
    updatePage(page = null) {
      this.getProductsNoPaging()
    },
    refreshProduct() {
      this.getProductsNoPaging()
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
  created() {
    this.getProductsNoPaging()
  },
  computed: {
    ...mapState(['product']),
    ...mapGetters('product', ['allProductsNoPaging'])
  }
}
</script>
<style scoped>
.pr-7 {
  padding-right: 6rem !important;
}
</style>
