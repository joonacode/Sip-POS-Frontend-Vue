<template>
  <b-modal
    id="modal-1"
    ref="modal-product"
    hide-footer
    :title="statusModal === 'add' ? 'Add item' : 'Update item'"
  >
    <form @submit="addproduct">
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control form-shadow" v-model="product.name" />
          <input type="hidden" v-model="product.id" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Image</label>
        <div class="col-sm-10">
          <input type="text" class="form-control form-shadow" readonly v-model="product.image" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Price</label>
        <div class="col-sm-10">
          <input type="number" class="form-control form-shadow" v-model="product.price" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Category</label>
        <div class="col-sm-10">
          <select name="category" class="form-control form-shadow" v-model="product.category">
            <option value disabled selected>Category</option>
            <option
              v-for="category in allCategories"
              :selected="category === category.id"
              :key="category.id"
              :value="category.id"
            >{{category.name}}</option>
          </select>
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
  name: 'ModalProduct',
  props: ['limit'],
  methods: {
    ...mapActions(['changeStatusHideModal']),
    ...mapActions('product', ['postProduct', 'getProducts', 'patchProduct']),
    ...mapActions('category', ['getCategories']),
    addproduct(e) {
      e.preventDefault()
      const input = {
        name: this.product.name,
        price: this.product.price,
        image: this.product.image,
        idCategory: this.product.category
      }
      if (this.statusModal === 'add') {
        this.postProduct(input)
      } else {
        this.patchProduct({ ...input, id: this.product.id })
      }
      this.getProducts({ limit: this.limit, page: this.currentPage })
    },
    hideModal() {
      this.$refs['modal-product'].hide()
      this.changeStatusHideModal(false)
    }
  },
  mounted() {
    this.getCategories()
  },
  computed: {
    ...mapState(['statusHideModal', 'statusModal']),
    ...mapState('product', ['product', 'update', 'title', 'currentPage']),
    ...mapGetters('category', ['allCategories'])
  }
}
</script>

<style lang="scss" scoped>
</style>
