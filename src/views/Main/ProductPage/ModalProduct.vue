<template>
  <b-modal
    id="modal-primary"
    ref="modal-primary"
    hide-footer
    :title="statusModal === 'add' ? 'Add item' : 'Update item'"
  >
    <form @submit.prevent="statusModal === 'add' ? addProduct() : updateProduct()">
      <input type="hidden" v-model="product.id" />
      <g-form-group label="Name" refInp="name" :isRow="true" v-model="product.name" />
      <input type="hidden" v-model="product.image" />
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Image</label>
        <div class="col-sm-10">
          <b-form-group class="mb-0" label-for="file-default">
            <input
              type="file"
              class="form-control form-shadow"
              id="image"
              ref="image"
              @change="handleFileUpload()"
            />
          </b-form-group>
        </div>
      </div>
      <div v-if="statusModal !== 'add'" class="form-group row">
        <label class="col-sm-2 col-form-label">Old Image</label>
        <div class="col-sm-10">
          <img :src="product.image" width="200" class="img-fluid img-thumbnail" alt="image" />
        </div>
      </div>
      <g-form-group
        label="Price"
        type="number"
        refInp="price"
        :isRow="true"
        v-model="product.price"
      />
      <g-form-group-select
        label="Category"
        refInp="category"
        :isRow="true"
        v-model="product.category"
      >
        <option value disabled selected>Category</option>
        <option
          v-for="category in allCategories"
          :selected="product.category === category.id"
          :key="category.id"
          :value="category.id"
        >{{category.name}}</option>
      </g-form-group-select>
      <div class="modal-footer border-top-0">
        <g-button @cus-click="hideModal" cusClass="btn-one px-4 rounded-xs">Cancel</g-button>
        <g-button
          type="submit"
          :isLoading="getLoading"
          cusClass="btn-two px-4 rounded-xs"
        >{{statusModal === 'add' ? 'Add' : 'Update'}}</g-button>
      </div>
    </form>
    {{statusHideModal ? hideModal() : ''}}
  </b-modal>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'ModalProduct',
  mixins: [mixins],
  props: ['limit'],
  data() {
    return {
      fileImage: ''
    }
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
          this.toastSuccess('Data successfully added')
        })
        .catch(({ error }) => {
          this.toastError(
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
          this.toastSuccess('Data successfully updated')
        })
        .catch(({ error }) => {
          this.toastError(
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

<style scoped>
.form-shadow {
  border: 0;
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
