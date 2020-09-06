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
      show-empty
      :busy.sync="getLoading"
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
      :items="users"
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
        <img
          :src="data.item.image === null || data.item.image === 'null' ? require(`@/assets/images/profile.png`) : data.item.image"
          class="img-thumbnail img-fluid"
          width="100"
          alt
        />
      </template>
      <template v-slot:cell(gender)="data">{{data.item.gender === 'm' ? 'Male' : 'Female'}}</template>
      <template v-slot:cell(role)="data">{{data.item.roleName}}</template>
      <template v-slot:cell(status)="data">
        <span
          class="badge"
          :class="[data.item.status === 1 ? 'badge-primary' : 'badge-danger']"
        >{{data.item.status === 1 ? 'Active' : (data.item.status === 2 ? 'Non Active' : 'Disabled')}}</span>
      </template>
      <template v-slot:cell(option)="data">
        <b-button
          v-b-modal.modal-primary
          @click="updateModalData(data.item)"
          variant="success"
          class="mr-2 my-1"
          size="sm"
        >Update</b-button>
        <g-button
          @cus-click="actDeleteUser(data.item.id)"
          type="button"
          variant="danger"
          size="sm"
          cusClass="my-1"
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
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  props: ['categories', 'users'],
  mixins: [mixins],
  data() {
    return {
      sortBy: 'id',
      sortDesc: true,
      fields: [
        { key: 'id', sortable: true, label: 'no' },
        'image',
        { key: 'name', sortable: true },
        { key: 'email', sortable: true },
        'gender',
        'role',
        { key: 'status', sortable: true },
        'option'
      ],
      currentPage: 1,
      perPage: 10,
      filter: null,
      filterOn: [],
      totalRows: this.users.length
    }
  },
  methods: {
    ...mapMutations('user', ['UPDATE_MODAL_DATA_USER']),
    ...mapActions(['changeStatusModal']),
    ...mapActions('user', ['deleteUser']),
    ...mapActions('category', [
      'updateModal',
      'deleteCategory',
      'getCategories'
    ]),
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    updateModalData(item) {
      this.changeStatusModal('update')
      this.UPDATE_MODAL_DATA_USER(item)
    },
    actDeleteUser(id) {
      this.confirmDelete('user', () => {
        this.deleteUser(id)
          .then((response) => {
            this.toastSuccess('User successfully deleted')
          })
          .catch(({ error }) => {
            this.toastError(
              error.sqlMessage ? error.sqlMessage : error.join(', ')
            )
          })
      })
    }
  },
  computed: mapGetters(['getLoading'])
}
</script>

<style scoped>
</style>
