<template>
  <MainContainer>
    <div class="main-left mb-5">
      <div class="row">
        <div class="col-md-12 mb-2">
          <MyProfileCard @show-modal="showModal" />
        </div>
      </div>
    </div>
    <ModalProfile :whatModal="whatModal" />
  </MainContainer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainContainer from '@/components/ui/MainContainer'
import MyProfileCard from './MyProfileCard'
import ModalProfile from './ModalProfile'
// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Category',
  components: {
    MainContainer,
    MyProfileCard,
    ModalProfile
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
        console.log('Is Profile')
        this.detailUser(this.getDetailUser.id)
      }

      this.whatModal = val
    }
  },
  computed: mapGetters('user', ['getDetailUser'])
}
</script>
<style scoped>
.pr-7 {
  padding-right: 6rem !important;
}
</style>
