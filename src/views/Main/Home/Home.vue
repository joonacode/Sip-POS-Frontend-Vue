<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col lg="8" md="8" sm="12" class="px-0">
          <div class="content-left pt-4 pr-4 pb-0">
            <Sidebar />
            <ListProduct />
          </div>
        </b-col>
        <b-col lg="4" md="4" sm="12" class="px-0" id="content-right">
          <CartList />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import ListProduct from '@/components/ListProduct'
import CartList from '@/components/CartList'

// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'Home',
  components: {
    Sidebar,
    ListProduct,
    CartList
  }
}
</script>
