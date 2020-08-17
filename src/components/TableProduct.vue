<template>
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
      <b-tr v-for="(item, i) in products.allProducts" :key="item.id">
        <b-td>{{products.currentPage === 1 ? (i + 1) : (products.perPage * (products.currentPage - 1) + 1) + i}}</b-td>
        <b-td>
          <div v-lazy-container="{ selector: 'img' }">
            <img
              :data-loading="require(`@/assets/images/charlie-loader.gif`)"
              :data-src="item.image"
              class="img-thumbnail"
              width="100"
              alt
            />
          </div>
        </b-td>
        <b-td>{{item.name}}</b-td>
        <b-td>{{item.price | currency}}</b-td>
        <b-td>{{item.categoryName}}</b-td>
        <b-td>
          <b-button
            v-b-modal.modal-1
            @click="updateModalData(item)"
            variant="success"
            class="mr-2"
            size="sm"
          >Update</b-button>
          <b-button @click="deleteItem(item.id)" variant="danger" size="sm">Delete</b-button>
        </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'TableProduct',
  props: ['products'],
  methods: {
    ...mapActions(['changeStatusModal']),
    ...mapActions('product', ['deleteProduct', 'getProducts', 'updateModal']),
    updateModalData(data) {
      this.updateModal(data)
      this.changeStatusModal('update')
      // this.$store.commit('changeTitle', true)
    },
    deleteItem(id) {
      const isConfirm = confirm('Are you sure delete this product ?')
      if (isConfirm) {
        this.deleteProduct(id)
        this.getProducts({
          limit: this.products.perPage,
          page: this.currentPage
        })
      }
    }
  },
  computed: {
    ...mapState('product', ['currentPage']),
    ...mapGetters('product', ['allProducts'])
  }
}
</script>
