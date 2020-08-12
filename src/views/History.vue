<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col md="12" class="px-0">
          <NavbarLeft :history="true" />
          <div class="content-left pt-4 pr-4 pb-0">
            <Sidebar />
            <div class="main-left mb-2">
              <div class="row">
                <div class="col-lg-4 col-sm-12 mb-3" v-for="(cardData, i) in cardsData" :key="i" :class="i === 2 ? 'col-md-12' : 'col-md-6'">
                  <CardHistory :cardData="cardData" />
                </div>
                <div class="col-md-12">
                  <img class="img-fluid" :src="require(`../assets/images/Chart.png`)" alt="chart" />
                </div>
                <HistoryOrder />
              </div>
            </div>
          </div>
        </b-col>
        <Footer />
      </b-row>
    </b-container>
    <Modals />
  </div>
</template>

<script>
import NavbarLeft from '../components/layout/NavbarLeft'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import Modals from '../components/Modals'
import CardHistory from '../components/CardHistory'
import HistoryOrder from '../components/HistoryOrder'
// @ is an alias to /src
import '../assets/css/style.css'
export default {
  name: 'History',
  data () {
    return {
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
          price: '3.270',
          percent: '+5% Last Week'
        },
        {
          bg: 'bg-3',
          title: 'This Year\'s Income',
          price: 'Rp. 100.000.000',
          percent: '+10% Yesterday'
        }
      ]
    }
  },
  components: {
    NavbarLeft,
    Sidebar,
    Footer,
    Modals,
    CardHistory,
    HistoryOrder
  }
}

</script>
