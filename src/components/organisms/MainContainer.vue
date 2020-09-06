<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col
          :class="[isHome && getDetailUser.roleId !== 3 ? 'col-lg-8 col-md-8' : 'col-lg-12 col-md-12']"
          sm="12"
          class="px-0"
        >
          <div class="content-left pt-4 pr-4 pb-0">
            <Sidebar />
            <slot></slot>
          </div>
        </b-col>
        <b-col
          v-if="isHome && getDetailUser.roleId !== 3"
          lg="4"
          md="4"
          sm="12"
          class="px-0"
          id="content-right"
        >
          <CartCheckout />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from '@/components/layout/MainSidebar'
import CartCheckout from '@/components/organisms/CartCheckout'

export default {
  name: 'MainContainer',
  props: {
    isHome: Boolean
  },
  components: {
    Sidebar,
    CartCheckout
  },
  computed: {
    ...mapGetters('user', ['getDetailUser'])
  }
}
</script>
