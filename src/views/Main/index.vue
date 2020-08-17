<template>
  <div>
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from '../../components/TheMainNavbar'
import Footer from '../../components/TheMainFooter'
export default {
  name: 'Main',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped>
.pr-15 {
  padding-right: 15px;
}
</style>
