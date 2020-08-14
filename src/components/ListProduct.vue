<template>
  <div class="main-left mb-5">
    <div class="row">
      <b-col md="12">
        <div class="d-flex justify-content-between align-items-center">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-append" id="button-addon4">
              <select @change="changeOrder" v-model="order" class="form-control">
                 <option disabled selected>Sort By</option>
                 <option :value="listOrder.field" :selected="order === listOrder.name" v-for="(listOrder, i) in listOrders" :key="i">
                   {{listOrder.name}}
                 </option>
               </select>
               <select @change="changeSort" v-model="sort" class="form-control">
                 <option disabled selected>Sort</option>
                 <option value="asc" :selected="sort === 'asc'">Asc</option>
                 <option value="desc" :selected="sort === 'desc'">Desc</option>
               </select>
            </div>
          </div>
        </div>
        <div>
        <button v-if="searchInput" @click="searchProduct(searchInput)" class="btn mr-2 btn-primary btn-sm">Search: {{searchInput}}</button>
        <button v-if="searchInput" @click="reset" class="btn btn-danger btn-sm">Reset</button>

        </div>
        </div>
      </b-col>
      <div v-for="product in products" :key="product.id" class="col-lg-4 col-sm-6 mb-3">
        <CardProduct :detailProduct="product" />
      </div>
      <div v-if="products.length < 1" class="text-center my-5 w-100 d-flex justify-content-center">
          <h1 class="text-danger">Data {{searchData}} Not Found</h1>
      </div>
      <b-col md="12 mt-4">
        <Pagination :dataPagination="propsPagination" @clicked="updatePage" />
      </b-col>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination'
import axios from 'axios'
import CardProduct from './CardProduct'
export default {
  name: 'ListProduct',
  props: {
    searchInput: String
  },
  components: {
    CardProduct,
    Pagination
  },
  data () {
    return {
      products: [],
      perPage: 9,
      currentPage: 1,
      totalProduct: 0,
      pagination: {},
      linkPagination: {},
      sort: 'desc',
      order: 'id',
      searchData: '',
      listOrders: [
        {
          name: 'Date',
          field: 'id'
        },
        {
          name: 'Name',
          field: 'name'
        },
        {
          name: 'Category',
          field: 'idCategory'
        },
        {
          name: 'Price',
          field: 'price'
        }
      ]
    }
  },
  methods: {
    updatePage (page = null) {
      this.currentPage = page
      this.getAllProduct(this.currentPage)
    },
    reset () {
      this.searchData = ''
      this.getAllProduct(this.currentPage)
    },
    changeOrder () {
      this.getAllProduct(this.currentPage)
    },
    changeSort () {
      this.getAllProduct(this.currentPage)
    },
    searchProduct (val) {
      this.searchData = val
      this.getAllProduct(this.currentPage)
    },
    getAllProduct (pag = null) {
      axios.get(`http://localhost:4000/api/v1/products?limit=${this.perPage}&sorting=${this.sort}&page=${pag || 1}&order=${this.order}${this.searchData ? '&search=' + this.searchData : ''}`)
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
          this.products = result
        }).catch(err => {
          this.products = []
          console.log('Errornya disini')
          console.log(err.response)
        })
    }
  },
  mounted () {
    this.getAllProduct()
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

</style>
