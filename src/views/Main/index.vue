<template>
  <div>
    <Navbar @clicksearch="getDataSearch" />
      <router-view :searchInput="dataSearch" />
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
  },
  data () {
    return {
      dataSearch: ''
    }
  },
  methods: {
    getDataSearch (val) {
      this.dataSearch = val
    }
  }
}
</script>

<style scoped>
  .pr-15 {
    padding-right: 15px;
  }
</style>
