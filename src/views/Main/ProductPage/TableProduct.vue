<template>
  <div>
    <div class="row">
      <div class="col-md-4 ml-auto">
        <b-form-group class="w-25 w-100">
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
    </div>
    <b-table
      :busy.sync="getLoading"
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
      :items="products"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :filter="filter"
      @filtered="onFiltered"
      sort-icon-left
      responsive
      hover
    >
      <template
        v-slot:cell(id)="data"
      >{{currentPage === 1 ? (data.index + 1) : (perPage * (currentPage - 1) + 1) + data.index}}</template>
      <template v-slot:cell(image)="data">
        <img :src="data.item.image" class="img-thumbnail" width="100" alt />
      </template>
      <template v-slot:cell(price)="data">{{data.item.price | currency}}</template>
      <template v-slot:cell(option)="data">
        <b-button
          v-b-modal.modal-primary
          @click="updateModalData(data.item)"
          variant="success"
          class="mr-2 my-1"
          size="sm"
        >Update</b-button>
        <g-button
          @cus-click="deleteItem(data.item.id)"
          type="button"
          cusClass="my-1"
          variant="danger"
          size="sm"
        >Delete</g-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      first-number
      last-number
    ></b-pagination>
  </div>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TableProduct',
  mixins: [mixins],
  props: ['products'],
  data() {
    return {
      sortBy: 'id',
      sortDesc: true,
      fields: [
        { key: 'id', sortable: true, label: 'no' },
        'image',
        { key: 'name', sortable: true },
        { key: 'price', sortable: true },
        {
          key: 'categoryName',
          label: 'Category'
        },
        'option'
      ],
      currentPage: 1,
      perPage: 10,
      filter: null,
      filterOn: [],
      totalRows: this.products.length
    }
  },
  methods: {
    ...mapActions(['changeStatusModal']),
    ...mapActions('product', ['deleteProduct', 'getProducts']),
    ...mapMutations('product', ['UPDATE_MODAL']),
    updateModalData(data) {
      this.UPDATE_MODAL(data)
      this.changeStatusModal('update')
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    deleteItem(id) {
      this.confirmDelete('product', () => {
        this.deleteProduct(id)
          .then((response) => {
            this.toastSuccess('Product successfully deleted')
          })
          .catch(({ error }) => {
            this.toastError(
              error.sqlMessage ? error.sqlMessage : error.join(', ')
            )
          })
      })
    }
  },
  computed: {
    ...mapGetters(['getLoading']),
    ...mapGetters('product', ['allProducts'])
  }
}
</script>
