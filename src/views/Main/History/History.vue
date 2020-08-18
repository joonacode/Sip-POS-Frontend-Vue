<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col md="12" class="px-0">
          <div class="content-left history pt-4 pr-4 pb-0">
            <Sidebar />
            <div class="main-left mb-2">
              <div class="row">
                <div
                  class="col-lg-4 col-sm-12 mb-3"
                  v-for="(cardData, i) in cardsData"
                  :key="i"
                  :class="i === 2 ? 'col-md-12' : 'col-md-6'"
                >
                  <CardHistory :cardData="cardData" />
                </div>
                <StatisticHistory />
                <HistoryOrder />
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import CardHistory from '@/components/CardHistory'
import HistoryOrder from '@/components/HistoryOrder'
import StatisticHistory from '@/components/StatisticHistory'
// @ is an alias to /src
import '@/assets/css/style.css'
export default {
  name: 'History',
  components: {
    Sidebar,
    CardHistory,
    HistoryOrder,
    StatisticHistory
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
