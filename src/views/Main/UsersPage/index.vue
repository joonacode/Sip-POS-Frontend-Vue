<template>
  <MainContainer>
    <div class="main-left mb-5">
      <div class="row">
        <b-col md="12">
          <b-card no-body class="shadow-sm border-0">
            <HeaderCard @add-modal="addModal" @refresh-body="refreshUsers" title="Users" />
            <div class="card-body">
              <TableUsers :categories="allCategories" :users="allUsers" />
            </div>
          </b-card>
        </b-col>
      </div>
    </div>
    <ModalUsers />
  </MainContainer>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import MainContainer from '@/components/ui/MainContainer'
import TableUsers from './TableUsers'
import ModalUsers from './ModalUsers'
import HeaderCard from '@/components/ui/HeaderCard'

// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Category',
  components: {
    TableUsers,
    ModalUsers,
    MainContainer,
    HeaderCard
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
