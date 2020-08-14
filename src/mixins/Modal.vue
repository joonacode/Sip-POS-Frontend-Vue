<template>
  <b-modal id="modal-1" :title="dataUpdate.name ? 'Update Data' : 'Add Data'" hide-footer>
    <div v-if="error">
        <b-alert show dismissible variant="danger">
          {{error.join(', ')}}
        </b-alert>
    </div>
    <div v-if="successCode">
        <b-alert show dismissible variant="success">
          {{successCode}}
        </b-alert>
    </div>
      <form></form>
       <div class="modal-footer border-top-0">
          <button type="button" class="btn btn-one px-4 rounded-xs" data-dismiss="modal">
            Cancel
          </button>
          <button type="button" @click="addNewData" class="btn btn-two px-4 rounded-xs">
            Add
          </button>
        </div>
    </b-modal>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Form',
  props: ['dataUpdate'],
  data () {
    return {
      name: '',
      image: 'https://sipposjc.netlify.app/assets/images/product/wiener.png',
      price: '',
      category: '',
      error: '',
      successCode: '',
      categories: [],
      productById: this.dataUpdate
    }
  },
  methods: {
    addNewData () {
      axios.post('http://localhost:4000/api/v1/products', {
        name: this.name,
        price: this.price,
        image: this.image,
        idCategory: this.category
      }).then(response => {
        this.successCode = response.data.message
        this.name = ''
        this.price = ''
        this.category = ''
        this.error = ''
      }).catch(err => {
        this.successCode = ''
        this.error = err.response.data.error
      })
    }
  },
  mounted () {
    axios.get('http://localhost:4000/api/v1/categories')
      .then(result => {
        this.categories = result.data.results
      }).catch(err => console.log(err.response))
  }
}
</script>

<style scoped>

</style>
