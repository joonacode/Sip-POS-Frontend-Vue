<template>
  <b-modal
    id="modal-primary"
    ref="modal-category"
    hide-footer
    :title="statusModal === 'add' ? 'Add item' : 'Update item'"
  >
    <form @submit.prevent="statusModal === 'add' ? addCategory() : updateCategory()">
      <input type="hidden" v-model="category.id" />
      <g-form-group label="Name" refInp="name" :isRow="true" v-model="category.name" />
      <div class="modal-footer border-top-0">
        <g-button @cus-click="hideModal" cusClass="btn-one px-4 rounded-xs">Cancel</g-button>
        <g-button
          type="submit"
          :isLoading="getLoading"
          cusClass="btn-two px-4 rounded-xs"
        >{{statusModal === 'add' ? 'Add' : 'Update'}}</g-button>
      </div>
      {{statusHideModal ? hideModal() : ''}}
    </form>
  </b-modal>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'ModalCategory',
  mixins: [mixins],
  methods: {
    ...mapActions(['changeStatusHideModal']),
    ...mapActions('category', [
      'getCategories',
      'postCategory',
      'patchCategory'
    ]),
    addCategory() {
      this.postCategory({ name: this.category.name })
        .then((response) => {
          this.toastSuccess('Category successfully added')
        })
        .catch(({ error }) => {
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
        })
    },
    updateCategory() {
      this.patchCategory({ name: this.category.name, id: this.category.id })
        .then((response) => {
          this.toastSuccess('Category successfully updated')
        })
        .catch(({ error }) => {
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
        })
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
    ...mapGetters('category', ['allCategories']),
    ...mapGetters(['getLoading'])
  }
}
</script>

<style lang="scss" scoped>
</style>
