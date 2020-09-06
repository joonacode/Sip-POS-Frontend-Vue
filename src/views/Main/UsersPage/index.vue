<template>
  <MainContainer>
    <div class="main-left mb-5">
      <div class="row">
        <b-col md="12">
          <g-card title="Users" @add-modal="addModal" @refresh-body="refreshUsers">
            <template #cardBody>
              <TableUsers :categories="allCategories" :users="allUsers" />
            </template>
          </g-card>
        </b-col>
      </div>
    </div>
    <ModalUsers />
  </MainContainer>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import MainContainer from '@/components/organisms/MainContainer'
import TableUsers from './TableUsers'
import ModalUsers from './ModalUsers'

// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Category',
  components: {
    TableUsers,
    ModalUsers,
    MainContainer
  },
  methods: {
    ...mapMutations('user', ['UPDATE_MODAL_DATA_USER']),
    ...mapActions(['changeStatusHideModal', 'changeStatusModal']),
    ...mapActions('category', ['getCategories']),
    ...mapActions('user', ['getUsers']),
    hideModal() {
      this.$refs['modal-product'].hide()
    },
    refreshUsers() {
      this.getUsers()
    },
    addModal() {
      this.changeStatusHideModal(false)
      this.changeStatusModal('add')
      this.UPDATE_MODAL_DATA_USER('default')
    }
  },
  mounted() {
    this.getCategories()
    this.getUsers()
  },
  computed: {
    ...mapState('category', ['category']),
    ...mapState('user', ['modalDataUser']),
    ...mapGetters('category', ['allCategories']),
    ...mapGetters('user', ['allUsers'])
  }
}
</script>
<style scoped>
.pr-7 {
  padding-right: 6rem !important;
}
</style>
