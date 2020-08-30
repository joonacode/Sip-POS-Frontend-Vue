<template>
  <b-modal
    id="modal-primary"
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
        <MainButton
          type="submit"
          customClass="btn-two px-4 rounded-xs"
          :isLoading="getLoading"
        >{{statusModal === 'add' ? 'Add' : 'Update'}}</MainButton>
      </div>
      {{statusHideModal ? hideModal() : ''}}
    </form>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import MainButton from '@/components/ui/MainButton'

export default {
  name: 'ModalCategory',
  components: {
    MainButton
  },
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
          .then((response) => {
            this.$toast.success('Category successfully added')
          })
          .catch(({ error }) => {
            this.$toast.error(
              error.sqlMessage ? error.sqlMessage : error.join(', ')
            )
          })
      } else {
        this.patchCategory({ name: this.category.name, id: this.category.id })
          .then((response) => {
            this.$toast.success('Category successfully updated')
          })
          .catch(({ error }) => {
            this.$toast.error(
              error.sqlMessage ? error.sqlMessage : error.join(', ')
            )
          })
      }
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
