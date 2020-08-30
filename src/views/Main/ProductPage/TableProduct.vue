<template>
  <b-table :busy.sync="getLoading" :fields="fields" :items="allProducts" responsive hover>
    <template
      v-slot:cell(no)="data"
    >{{products.currentPage === 1 ? (data.index + 1) : (products.perPage * (products.currentPage - 1) + 1) + data.index}}</template>
    <!-- <template v-slot:cell(no)="data">{{ data.index + 1 }}</template> -->
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
      <MainButton
        @cus-click="deleteItem(data.item.id)"
        type="button"
        customClass="my-1"
        variant="danger"
        size="sm"
      >Delete</MainButton>
    </template>
  </b-table>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import MainButton from '@/components/ui/MainButton'

export default {
  name: 'TableProduct',
  props: ['products'],
  components: {
    MainButton
  },
  data() {
    return {
      fields: [
        'no',
        'image',
        'name',
        'price',
        {
          key: 'categoryName',
          label: 'Category'
        },
        'option'
      ]
    }
  },
  methods: {
    ...mapActions(['changeStatusModal']),
    ...mapActions('product', ['deleteProduct', 'getProducts']),
    ...mapMutations('product', ['UPDATE_MODAL']),
    updateModalData(data) {
      this.UPDATE_MODAL(data)
      this.changeStatusModal('update')
      // this.$store.commit('changeTitle', true)
    },
    deleteItem(id) {
      const isConfirm = confirm('Are you sure delete this product ?')
      if (isConfirm) {
        this.deleteProduct(id)
          .then((response) => {
            this.$toast.success('Product successfully deleted')
          })
          .catch(({ error }) => {
            this.$toast.error(
              error.sqlMessage ? error.sqlMessage : error.join(', ')
            )
          })
      }
    }
  },
  computed: {
    ...mapGetters(['getLoading']),
    ...mapState('product', ['currentPage']),
    ...mapGetters('product', ['allProducts'])
  }
}
</script>
