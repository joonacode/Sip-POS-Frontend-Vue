<template>
  <b-modal
    id="modal-category"
    ref="modal-category"
    hide-footer
    :title="statusModal === 'add' ? 'Add item' : 'Update item'"
  >
    <form @submit="addCategory">
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control form-shadow" v-model="category.name" />
          <input type="hidden" v-model="category.id" />
        </div>
      </div>
      <div class="modal-footer border-top-0">
        <button
          type="button"
          @click="hideModal"
          class="btn btn-one px-4 rounded-xs"
          data-dismiss="modal"
        >Cancel</button>
        <button
          type="submit"
          class="btn btn-two px-4 rounded-xs"
        >{{statusModal === 'add' ? 'Add' : 'Update'}}</button>
      </div>
      {{statusHideModal ? hideModal() : ''}}
    </form>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'ModalCategory',
  methods: {
    ...mapActions(['changeStatusHideModal']),
    ...mapActions('category', [
      'getCategories',
      'postCategory',
      'patchCategory'
    ]),
    addCategory(e) {
      e.preventDefault()
      if (this.statusModal === 'add') {
        this.postCategory({ name: this.category.name })
      } else {
        this.patchCategory({ name: this.category.name, id: this.category.id })
      }
      this.getCategories()
    },
    hideModal() {
      this.$refs['modal-category'].hide()
      this.changeStatusHideModal(false)
    }
  },
  mounted() {
    this.getCategories()
  },
  computed: {
    ...mapState(['statusHideModal', 'statusModal']),
    ...mapState('category', ['category']),
    ...mapGetters('category', ['allCategories'])
  }
}
</script>

<style lang="scss" scoped>
</style>
