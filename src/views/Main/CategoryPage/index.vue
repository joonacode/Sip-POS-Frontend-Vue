<template>
  <MainContainer>
    <div class="main-left mb-5">
      <div class="row">
        <b-col md="12">
          <g-card @add-modal="addModal" @refresh-body="refreshCategory" title="Category">
            <template #cardBody>
              <TableCategory :categories="allCategories" />
            </template>
          </g-card>
        </b-col>
      </div>
    </div>
    <ModalCategory />
  </MainContainer>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import MainContainer from '@/components/organisms/MainContainer'
import TableCategory from './TableCategory'
import ModalCategory from './ModalCategory'

// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Category',
  components: {
    TableCategory,
    ModalCategory,
    MainContainer
  },
  methods: {
    ...mapActions(['changeStatusHideModal', 'changeStatusModal']),
    ...mapActions('category', ['getCategories']),
    hideModal() {
      this.$refs['modal-product'].hide()
    },
    refreshCategory() {
      this.getCategories()
    },
    addModal() {
      this.changeStatusHideModal(false)
      this.changeStatusModal('add')
      this.category.name = ''
      this.category.id = ''
    }
  },
  mounted() {
    this.getCategories()
  },
  computed: {
    ...mapState('category', ['category']),
    ...mapGetters('category', ['allCategories'])
  }
}
</script>
<style scoped>
.pr-7 {
  padding-right: 6rem !important;
}
</style>
