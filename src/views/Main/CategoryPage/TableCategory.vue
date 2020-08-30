<template>
  <b-table :busy.sync="getLoading" :fields="fields" :items="categories" responsive hover>
    <template v-slot:cell(no)="data">{{data.index + 1}}</template>
    <template v-slot:cell(option)="data">
      <b-button
        v-b-modal.modal-primary
        @click="updateModalData(data.item)"
        variant="success"
        class="mr-2 my-1"
        size="sm"
      >Update</b-button>
      <MainButton
        @cus-click="deleteCategoryItem(data.item.id)"
        type="button"
        variant="danger"
        customClass="my-1"
        size="sm"
      >Delete</MainButton>
    </template>
  </b-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainButton from '@/components/ui/MainButton'

export default {
  props: ['categories'],
  components: {
    MainButton
  },
  data() {
    return {
      fields: ['no', 'name', 'option']
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
      const isConfirm = confirm('Are you sure delete this category ?')
      if (isConfirm) {
        this.deleteCategory(id)
          .then((response) => {
            this.$toast.success('Category successfully deleted')
          })
          .catch(({ error }) => {
            this.$toast.error(
              error.sqlMessage ? error.sqlMessage : error.join(', ')
            )
          })
      }
    }
  },
  computed: mapGetters(['getLoading'])
}
</script>

<style scoped>
</style>
