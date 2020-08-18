<template>
  <div v-if="totalPages !== 0" class="d-flex justify-content-between align-items-center">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-append" id="button-addon4">
          <select @change="changeOrder" v-model="sort" class="form-control">
            <option disabled selected>Sort By</option>
            <option
              :value="listOrder.ordSort"
              :selected="ordering === listOrder.ordSort"
              v-for="(listOrder, i) in listOrders"
              :key="i"
            >{{listOrder.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <span>Page {{currentPage}}/{{totalPages}}</span>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      sort: ['id', 'desc'],
      listOrders: [
        {
          name: 'Newest',
          ordSort: ['id', 'desc']
        },
        {
          name: 'Oldest',
          ordSort: ['id', 'asc']
        },
        {
          name: 'Name A-Z',
          ordSort: ['name', 'asc']
        },
        {
          name: 'Name Z-A',
          ordSort: ['name', 'desc']
        },
        {
          name: 'Cheapest',
          ordSort: ['price', 'asc']
        },
        {
          name: 'Expensive',
          ordSort: ['price', 'desc']
        },
        {
          name: 'Category A-Z',
          ordSort: ['idCategory', 'asc']
        },
        {
          name: 'Category Z-A',
          ordSort: ['idCategory', 'desc']
        }
      ]
    }
  },
  methods: {
    ...mapActions('product', ['getProducts', 'changeOrdering']),
    changeOrder() {
      this.product.currentPage = 1
      const order = {
        limit: null,
        page: this.currentPage,
        order: this.sort[0],
        sort: this.sort[1],
        search: this.searchInputText
      }
      this.changeOrdering(order)
      this.getProducts(order)
    }
  },
  computed: {
    ...mapState('product', [
      'currentPage',
      'totalPages',
      'searchInputText',
      'ordering'
    ]),
    ...mapState(['product'])
  }
}
</script>

<style scoped>
</style>
