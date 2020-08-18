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
                      <h3 class="card-title mb-0">Category</h3>
                      <div>
                        <b-button @click="refreshCategory" class="mr-2" variant="primary">
                          <b-icon icon="arrow-clockwise" />
                        </b-button>
                        <b-button
                          @click="addModal"
                          v-b-modal.modal-category
                          variant="primary"
                        >Add Category</b-button>
                        <router-link :to="{name: 'Product'}" class="btn ml-2 btn-primary">Back</router-link>
                      </div>
                    </div>
                    <div class="card-body">
                      <TableCategory :categories="allCategories" />
                    </div>
                  </b-card>
                </b-col>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <ModalCategory />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import TableCategory from '@/components/TableCategory'
import ModalCategory from '@/components/ModalCategory'
import Sidebar from '@/components/Sidebar'
// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Category',
  components: {
    Sidebar,
    TableCategory,
    ModalCategory
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
