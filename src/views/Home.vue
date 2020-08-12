<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col lg="9" md="8" sm="12" class="px-0">
          <NavbarLeft :history="false" />
          <div class="content-left pt-4 pr-4 pb-0">
            <Sidebar />
            <ListProduct />
          </div>
        </b-col>
         <b-col lg="3" md="4" sm="12" class="px-0" id="content-right">
            <NavbarRight />
            <CartProduct />
        </b-col>
        <Footer />
      </b-row>
    </b-container>
    <Modals />
  </div>
</template>

<script>
import NavbarLeft from '../components/layout/NavbarLeft'
import NavbarRight from '../components/layout/NavbarRight'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import ListProduct from '../components/ListProduct'
import CartProduct from '../components/CartProduct'
import Modals from '../components/Modals'
// @ is an alias to /src
import '../assets/css/style.css'
export default {
  name: 'Home',
  components: {
    NavbarLeft,
    NavbarRight,
    Sidebar,
    ListProduct,
    CartProduct,
    Footer,
    Modals
  }
}
</script>
