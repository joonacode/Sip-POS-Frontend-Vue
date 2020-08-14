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
                      <h3 class="card-title mb-0">Category</h3>
                      <div>
                      <b-button @click="addModal" variant="primary">Add new Data</b-button>
                      <router-link :to="{name: 'Product'}" class="btn ml-2 btn-primary">Back</router-link>
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
                            <b-th>Name</b-th>
                            <b-th width="200">Option</b-th>
                          </b-tr>
                        </b-thead>
                        <b-tbody>
                          <b-tr v-for="(item, i) in items" :key="item.id">
                            <b-td>{{i+1}}</b-td>
                            <b-td>{{item.name}}</b-td>
                            <b-td>
                              <b-button @click="updateModal(item)" variant="success" class="mr-2" size="sm">Update
                              </b-button>
                              <b-button @click="deleteCategory(item.id)" variant="danger" size="sm">Delete</b-button>
                            </b-td>
                          </b-tr>
                        </b-tbody>
                      </b-table-simple>
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
      <!-- <form> -->
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-shadow" v-model="name">
          </div>
        </div>
      <!-- </form> -->
      <div class="modal-footer border-top-0">
        <button type="button" @click="hideModal" class="btn btn-one px-4 rounded-xs" data-dismiss="modal">
          Cancel
        </button>
        <button v-if="!update" type="button" @click="addNewData" class="btn btn-two px-4 rounded-xs">
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
import Sidebar from '@/components/Sidebar'
// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Category',
  components: {
    Sidebar
  },
  data () {
    return {
      items: [],
      message: '',
      error: '',
      name: '',
      id: '',
      update: false
    }
  },
  methods: {
    getAllCategory (pag = null) {
      axios.get('http://localhost:4000/api/v1/categories')
        .then(response => {
          console.log(response)
          const result = response.data.results
          this.items = result
        }).catch(err => {
          console.log(err.response)
        })
    },
    deleteCategory (id) {
      axios.delete(`http://localhost:4000/api/v1/categories/${id}`)
        .then(response => {
          this.message = response.data.message
          this.items = this.items.filter(val => val.id !== id)
        }).catch(err => {
          this.successCode = ''
          this.message = err.response.data.error.sqlMessage
        })
    },
    addNewData () {
      axios.post('http://localhost:4000/api/v1/categories', {
        name: this.name
      }).then(response => {
        this.message = response.data.message
        this.error = ''
        this.getAllCategory()
        this.hideModal()
      }).catch(err => {
        this.successCode = ''
        this.error = err.response.data.error
      })
    },
    updateData (id) {
      axios.patch(`http://localhost:4000/api/v1/categories/${id}`, {
        name: this.name
      }).then(response => {
        this.message = response.data.message
        this.error = ''
        this.getAllCategory()
        this.hideModal()
      }).catch(err => {
        this.successCode = ''
        this.error = err.response.data.error
      })
    },
    addModal () {
      this.$refs['modal-product'].show()
      this.update = false
      this.name = ''
    },
    updateModal (data) {
      this.$refs['modal-product'].show()
      this.update = true
      this.name = data.name
      this.id = data.id
    },
    hideModal () {
      this.$refs['modal-product'].hide()
    }
  },
  mounted () {
    this.getAllCategory()
    axios.get('http://localhost:4000/api/v1/categories')
      .then(result => {
        this.categories = result.data.results
      }).catch(err => console.log(err.response))
  }
}

</script>
<style scoped>
  .pr-7 {
    padding-right: 6rem !important;
  }

</style>
