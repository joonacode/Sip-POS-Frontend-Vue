<template>
  <div>
    <b-table
      :busy.sync="getLoading"
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
      :items="categories"
      responsive
      hover
    >
      <template
        v-slot:cell(no)="data"
      >{{currentPage === 1 ? (data.index + 1) : (perPage * (currentPage - 1) + 1) + data.index}}</template>
      <template v-slot:cell(option)="data">
        <b-button
          v-b-modal.modal-primary
          @click="updateModalData(data.item)"
          variant="success"
          class="mr-2 my-1"
          size="sm"
        >Update</b-button>
        <g-button
          @cus-click="deleteCategoryItem(data.item.id)"
          type="button"
          variant="danger"
          cusClass="my-1"
          size="sm"
        >Delete</g-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows === 0 ? categories.length : totalRows"
      :per-page="perPage"
      first-number
      last-number
    ></b-pagination>
  </div>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['categories'],
  mixins: [mixins],
  data() {
    return {
      fields: ['no', 'name', 'option'],
      currentPage: 1,
      perPage: 10,
      totalRows: this.categories.length
    }
  },
  methods: {
    ...mapActions(['changeStatusModal']),
    ...mapActions('category', [
      'updateModal',
      'deleteCategory',
      'getCategories'
    ]),
    updateModalData(item) {
      this.changeStatusModal('update')
      this.updateModal(item)
    },
    deleteCategoryItem(id) {
      this.confirmDelete('category', () => {
        this.deleteCategory(id)
          .then((response) => {
            this.toastSuccess('Category successfully deleted')
          })
          .catch(({ error }) => {
            this.toastError(
              error.sqlMessage ? error.sqlMessage : error.join(', ')
            )
          })
      })
    }
  },
  computed: mapGetters(['getLoading'])
}
</script>

<style scoped>
</style>
