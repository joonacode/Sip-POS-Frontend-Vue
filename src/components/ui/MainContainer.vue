<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col :class="[isHome ? 'col-lg-8 col-md-8' : 'col-lg-12 col-md-12']" sm="12" class="px-0">
          <div class="content-left pt-4 pr-4 pb-0">
            <Sidebar />
            <slot></slot>
          </div>
        </b-col>
        <b-col v-if="isHome" lg="4" md="4" sm="12" class="px-0" id="content-right">
          <CartList />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from '@/components/layout/MainSidebar'
import CartList from '@/components/CartList'

export default {
  name: 'MainContainer',
  props: {
    isHome: Boolean
  },
  components: {
    Sidebar,
    CartList
  }
}
</script>
