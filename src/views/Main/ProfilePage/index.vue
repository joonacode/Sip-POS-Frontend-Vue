<template>
  <MainContainer>
    <div class="main-left mb-5">
      <div class="row">
        <div class="col-md-12 mb-2">
          <MyProfileCard @show-modal="showModal" />
        </div>
        <div class="col-md-12 mt-3" v-if="roleId === 3">
          <g-card title="My History Order" noButtonHeader>
            <template #cardBody>
              <TableHistory />
            </template>
          </g-card>
        </div>
        <div class="col-md-12 mt-3" v-if="roleId !== 3">
          <SiteSetting />
        </div>
      </div>
    </div>
    <ModalProfile :whatModal="whatModal" />
  </MainContainer>
</template>

<script>
import mixins from '@/components/mixins/swal'
import TableHistory from '@/components/molecules/TableHistory'
import { mapActions, mapGetters, mapState } from 'vuex'
import MainContainer from '@/components/organisms/MainContainer'
import SiteSetting from '@/components/molecules/SiteSetting'
import MyProfileCard from './MyProfileCard'
import ModalProfile from './ModalProfile'
// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Category',
  mixins: [mixins],
  components: {
    MainContainer,
    MyProfileCard,
    ModalProfile,
    TableHistory,
    SiteSetting
  },
  data() {
    return {
      whatModal: ''
    }
  },
  methods: {
    ...mapActions('user', ['detailUser']),
    showModal(val) {
      if (val === 'profile') {
        this.detailUser(this.getDetailUser.id)
      }

      this.whatModal = val
    }
  },
  computed: {
    ...mapGetters('user', ['getDetailUser']),
    ...mapGetters(['getLoading']),
    ...mapState('auth', ['roleId'])
  }
}
</script>
<style scoped>
.pr-7 {
  padding-right: 6rem !important;
}
</style>
