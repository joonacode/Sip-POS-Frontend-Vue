<template>
  <div>
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from '@/components/layout/MainNavbar'
import Footer from '@/components/layout/MainFooter'
export default {
  name: 'Main',
  components: {
    Navbar,
    Footer
  },
  methods: {
    ...mapActions('auth', ['interceptorsRequest', 'interceptorsResponse']),
    ...mapActions('user', ['detailUser'])
  },
  created() {
    this.interceptorsRequest()
    this.interceptorsResponse()
    const id = localStorage.getItem('id') || null
    this.detailUser(id)
  }
}
</script>

<style scoped>
.pr-15 {
  padding-right: 15px;
}
</style>
