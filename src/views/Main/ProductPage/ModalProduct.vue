<template>
  <b-modal
    id="modal-primary"
    ref="modal-primary"
    hide-footer
    :title="statusModal === 'add' ? 'Add item' : 'Update item'"
  >
    <form @submit.prevent="statusModal === 'add' ? addProduct() : updateProduct()">
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control form-shadow" v-model="product.name" v-focus />
          <input type="hidden" v-model="product.id" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Image</label>
        <div class="col-sm-10">
          <b-form-group class="form-shadow mb-0" label-for="file-default">
            <input
              type="file"
              class="form-control"
              id="image"
              ref="image"
              @change="handleFileUpload()"
            />
          </b-form-group>
          <input type="hidden" v-model="product.image" />
        </div>
      </div>
      <div v-if="statusModal !== 'add'" class="form-group row">
        <label class="col-sm-2 col-form-label">Old Image</label>
        <div class="col-sm-10">
          <img :src="product.image" width="200" class="img-fluid img-thumbnail" alt="image" />
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
        <MainButton
          type="submit"
          customClass="btn-two px-4 rounded-xs"
          :isLoading="getLoading"
        >{{statusModal === 'add' ? 'Add' : 'Update'}}</MainButton>
      </div>
    </form>
    {{statusHideModal ? hideModal() : ''}}
  </b-modal>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import MainButton from '@/components/ui/MainButton'

export default {
  name: 'ModalProduct',
  props: ['limit'],
  data() {
    return {
      fileImage: ''
    }
  },
  components: {
    MainButton
  },
  methods: {
    ...mapActions(['changeStatusHideModal']),
    ...mapActions('product', ['postProduct', 'getProducts', 'patchProduct']),
    ...mapActions('category', ['getCategories']),
    handleFileUpload() {
      this.fileImage = this.$refs.image.files[0]
    },
    addProduct() {
      // eslint-disable-next-line prefer-const
      let formData = new FormData()
      formData.append('image', this.fileImage)
      formData.append('name', this.product.name)
      formData.append('price', this.product.price)
      formData.append('idCategory', this.product.category)
      this.postProduct(formData)
        .then((response) => {
          this.$toast.success('Data successfully added')
          this.getProducts({
            limit: this.limit,
            page: this.currentPage
          })
        })
        .catch(({ error }) => {
          this.$toast.error(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
        })
    },
    updateProduct() {
      // eslint-disable-next-line prefer-const
      let formData = new FormData()
      formData.append('image', this.fileImage)
      formData.append('oldImage', this.product.image)
      formData.append('name', this.product.name)
      formData.append('price', this.product.price)
      formData.append('idCategory', this.product.category)
      this.patchProduct({ data: formData, id: this.product.id })
        .then((response) => {
          this.$toast.success('Data successfully updated')
          this.getProducts({
            limit: this.limit,
            page: this.currentPage
          })
        })
        .catch(({ error }) => {
          this.$toast.error(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
        })
    },
    hideModal() {
      this.$refs['modal-primary'].hide()
      this.changeStatusHideModal(false)
    }
  },
  mounted() {
    this.getCategories()
  },
  computed: {
    ...mapState(['statusHideModal', 'statusModal']),
    ...mapGetters(['getLoading']),
    ...mapState('product', ['product', 'update', 'title', 'currentPage']),
    ...mapGetters('category', ['allCategories'])
  }
}
</script>

<style lang="scss" scoped>
</style>
