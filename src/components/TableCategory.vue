<template>
  <b-table-simple responsive hover>
    <b-thead>
      <b-tr>
        <b-th width="10">No</b-th>
        <b-th>Name</b-th>
        <b-th width="200">Option</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="(item, i) in categories" :key="item.id">
        <b-td>{{i+1}}</b-td>
        <b-td>{{item.name}}</b-td>
        <b-td>
          <b-button
            v-b-modal.modal-category
            @click="updateModalData(item)"
            variant="success"
            class="mr-2"
            size="sm"
          >Update</b-button>
          <b-button @click="deleteCategoryItem(item.id)" variant="danger" size="sm">Delete</b-button>
        </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['categories'],
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
        this.getCategories()
      }
    }
  }
}
</script>

<style scoped>
</style>
