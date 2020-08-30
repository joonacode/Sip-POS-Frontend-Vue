<template>
  <div>
    <b-table
      show-empty
      :busy.sync="getLoading"
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
      :items="users"
      responsive
      hover
    >
      <template v-slot:cell(no)="data">{{data.index + 1}}</template>
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
        >{{data.item.status === 1 ? 'Active' : 'Disable'}}</span>
      </template>
      <template v-slot:cell(option)="data">
        <b-button
          v-b-modal.modal-primary
          @click="updateModalData(data.item)"
          variant="success"
          class="mr-2 my-1"
          size="sm"
        >Update</b-button>
        <MainButton
          @cus-click="actDeleteUser(data.item.id)"
          type="button"
          variant="danger"
          size="sm"
          customClass="my-1"
        >Delete</MainButton>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="users.length"
      :per-page="perPage"
      first-number
      last-number
    ></b-pagination>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import MainButton from '@/components/ui/MainButton'

export default {
  props: ['categories', 'users'],
  components: {
    MainButton
  },
  data() {
    return {
      fields: [
        'no',
        'image',
        'name',
        'email',
        'gender',
        'role',
        'status',
        'option'
      ],
      currentPage: 1,
      perPage: 10
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
    updateModalData(item) {
      this.changeStatusModal('update')
      this.UPDATE_MODAL_DATA_USER(item)
    },
    actDeleteUser(id) {
      const isConfirm = confirm('Are you sure delete this user ?')
      if (isConfirm) {
        this.deleteUser(id)
          .then((response) => {
            this.$toast.success('User successfully deleted')
          })
          .catch(({ error }) => {
            this.$toast.error(
              error.sqlMessage ? error.sqlMessage : error.join(', ')
            )
          })
      }
    }
  },
  computed: mapGetters(['getLoading'])
}
</script>

<style scoped>
</style>
