<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col md="12" class="px-0">
          <div class="content-left history pt-4 pr-4 pb-0">
            <Sidebar />
            <div class="main-left mb-5">
              <div class="row">
                <b-col md="12">
                  <b-card no-body class="shadow-sm border-0">
                    <div class="card-header bg-light d-flex justify-content-between align-items-center">
                      <h3 class="card-title mb-0">Product</h3>
                      <div>
                        <b-button @click="addModal" variant="primary">Add new Data</b-button>
                        <router-link :to="{name: 'Category'}" class="btn ml-2 btn-primary">Category</router-link>
                      </div>
                    </div>
                    <div class="card-body">
                      <b-alert v-if="message" show dismissible variant="success">
                        {{message}}
                      </b-alert>
                      <b-table-simple responsive hover>
                        <b-thead>
                          <b-tr>
                            <b-th width="10">No</b-th>
                            <b-th width="120">Image</b-th>
                            <b-th>Name</b-th>
                            <b-th>Price</b-th>
                            <b-th>Category</b-th>
                            <b-th width="200">Option</b-th>
                          </b-tr>
                        </b-thead>
                        <b-tbody>
                          <b-tr v-for="(item, i) in items" :key="item.id">
                            <b-td>{{currentPage === 1 ? (i + 1) : (perPage * (currentPage - 1) + 1) + i}}</b-td>
                            <b-td>
                              <img :src="item.image" class="img-thumbnail" width="100" alt="">
                            </b-td>
                            <b-td>{{item.name}}</b-td>
                            <b-td>{{item.price}}</b-td>
                            <b-td>{{item.category}}</b-td>
                            <b-td>
                              <b-button @click="updateModal(item)" variant="success" class="mr-2" size="sm">Update
                              </b-button>
                              <b-button @click="deleteProduct(item.id)" variant="danger" size="sm">Delete</b-button>
                            </b-td>
                          </b-tr>
                        </b-tbody>
                      </b-table-simple>
                      <Pagination :dataPagination="propsPagination" @clicked="updatePage" />
                    </div>
                  </b-card>
                </b-col>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-modal ref="modal-product" :title="!update ? 'Add Data' : 'Update Data'" hide-footer>
      <div v-if="error">
        <b-alert show dismissible variant="danger">
          {{error.join(', ')}}
        </b-alert>
      </div>
      <form>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-shadow" v-model="name">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Image</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-shadow" readonly v-model="image">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Price</label>
          <div class="col-sm-10">
            <input type="number" class="form-control form-shadow" v-model="price">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Category</label>
          <div class="col-sm-10">
            <select name="category" class="form-control form-shadow" v-model="category">
              <option value="" disabled selected>Category</option>
              <option v-for="category in categories" :selected="category === category.id" :key="category.id"
                :value="category.id">{{category.name}}</option>
            </select>
          </div>
        </div>
      </form>
      <div class="modal-footer border-top-0">
        <button type="button" @click="hideModal" class="btn btn-one px-4 rounded-xs" data-dismiss="modal">
          Cancel
        </button>
        <button type="button" @click="addNewData" class="btn btn-two px-4 rounded-xs">
          Add
        </button>
        <button v-if="update" type="button" @click="updateData(id)" class="btn btn-two px-4 rounded-xs">
          Update
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import Pagination from '@/components/Pagination'
import Sidebar from '@/components/Sidebar'
// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Product',
  components: {
    Sidebar,
    Pagination
  },
  data () {
    return {
      items: [],
      message: '',
      error: '',
      name: '',
      id: '',
      image: 'https://sipposjc.netlify.app/assets/images/product/wiener.png',
      price: '',
      category: '',
      categories: [],
      update: false,
      perPage: 10,
      currentPage: 1,
      totalProduct: 0,
      pagination: {},
      linkPagination: {}
    }
  },
  methods: {
    updatePage (page = null) {
      this.currentPage = page
      this.getAllProduct(this.currentPage)
    },
    getAllProduct (pag = null) {
      axios.get(`http://localhost:4000/api/v1/products?limit=${this.perPage}&sorting=desc&page=${pag || 1}`)
        .then(response => {
          const {
            count,
            currentPage,
            total
          } = response.data
          this.pagination = {
            foundInPage: count,
            currentPage,
            perPage: response.data.per_page,
            total,
            totalPages: response.data.total_pages
          }
          this.linkPagination = response.data._links
          const result = response.data.results
          this.totalProduct = response.data.total
          const newResult = result.map(val => {
            return {
              id: val.id,
              name: val.name,
              price: val.price,
              image: val.image,
              category: val.categoryName,
              idCategory: val.idCategory
            }
          })
          this.items = newResult
        }).catch(err => {
          console.log(err.response)
        })
    },
    deleteProduct (id) {
      axios.delete(`http://localhost:4000/api/v1/products/${id}`)
        .then(response => {
          this.message = response.data.message
          this.items = this.items.filter(val => val.id !== id)
        }).catch(err => {
          console.log(err.response)
        })
    },
    formReset () {
      this.name = ''
      this.price = ''
      this.category = ''
    },
    addNewData () {
      console.log('okok')
      axios.post('http://localhost:4000/api/v1/products', {
        name: this.name,
        price: this.price,
        image: this.image,
        idCategory: this.category
      }).then(response => {
        this.message = response.data.message
        this.formReset()
        this.error = ''
        this.getAllProduct()
        this.hideModal()
      }).catch(err => {
        this.successCode = ''
        this.error = err.response.data.error
      })
    },
    updateData (id) {
      axios.patch(`http://localhost:4000/api/v1/products/${id}`, {
        name: this.name,
        price: this.price,
        image: this.image,
        idCategory: this.category
      }).then(response => {
        this.message = response.data.message
        this.formReset()
        this.error = ''
        this.getAllProduct()
        this.hideModal()
      }).catch(err => {
        this.successCode = ''
        this.error = err.response.data.error
      })
    },
    addModal () {
      this.$refs['modal-product'].show()
      this.update = false
      this.formReset()
    },
    updateModal (data) {
      this.$refs['modal-product'].show()
      this.update = true
      this.name = data.name
      this.price = data.price
      this.category = data.idCategory
      this.id = data.id
    },
    hideModal () {
      this.$refs['modal-product'].hide()
    }
  },
  mounted () {
    this.getAllProduct()
    axios.get('http://localhost:4000/api/v1/categories')
      .then(result => {
        this.categories = result.data.results
      }).catch(err => console.log(err.response))
  },
  computed: {
    propsPagination () {
      return {
        perPage: this.perPage,
        currentPage: this.currentPage,
        totalProduct: this.totalProduct,
        pagination: this.pagination,
        linkPagination: this.linkPagination

      }
    }
  }
}

</script>
<style scoped>
  .pr-7 {
    padding-right: 6rem !important;
  }

</style>
