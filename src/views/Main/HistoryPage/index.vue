<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col md="12" class="px-0">
          <div class="content-left history pt-4 pr-4 pb-0">
            <Sidebar />
            <div class="main-left mb-2">
              <ListInfoHistory />
              <div class="row">
                <div class="col-md-12 my-4">
                  <ChartCard />
                </div>
                <div class="col-md-12 mb-5 mt-3">
                  <OrderCard />
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ListInfoHistory from '@/components/molecules/ListInfoHistory'
import Sidebar from '@/components/layout/MainSidebar'
import OrderCard from '@/components/organisms/OrderCard'
import ChartCard from '@/components/organisms/ChartCard'
// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'History',
  components: {
    Sidebar,
    OrderCard,
    ChartCard,
    ListInfoHistory
  },
  data() {
    return {
      datadata: 90,
      cardsData: [
        {
          bg: 'bg-1',
          title: 'Wiener Schnitzle',
          price: 'Rp. 1.000.000',
          percent: '+2% Yesterday'
        },
        {
          bg: 'bg-2',
          title: 'Orders',
          price: '3.200',
          percent: '+5% Last Week'
        },
        {
          bg: 'bg-3',
          title: "This Year's Income",
          price: 'Rp. 100.000.000',
          percent: '+10% Yesterday'
        }
      ]
    }
  }
}
</script>
