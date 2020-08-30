<template>
  <div class="col-md-12 my-4">
    <div class="card shadow-lg rounded-sm">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <h5 class="font-weight-bold">Revenue</h5>
          <select
            name
            class="badge badge-secondary rounded-sm outline-focus-none"
            v-model="filterBy"
          >
            <option value="month">Month</option>
            <option value="day">Day</option>
          </select>
        </div>
        <HistoryChartItem
          v-if="!getLoading && filterBy === 'month'"
          :chartData="chartData"
          :labels="labels"
        />
        <div v-if="filterBy === 'day'">
          <HistoryChartItem v-if="!getLoading" :chartData="chartDataDay" :labels="labelsDay" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HistoryChartItem from './HistoryChartItem'
export default {
  components: {
    HistoryChartItem
  },
  data() {
    return {
      filterBy: 'month'
    }
  },
  computed: {
    ...mapGetters('history', ['getMonthChart', 'getDayChart']),
    ...mapGetters(['getLoading']),
    chartData() {
      const thisMonth = new Date().getMonth()
      const valueCart = []
      for (let i = 0; i <= thisMonth; i++) {
        valueCart.push(this.getMonthChart[i].value)
      }
      return valueCart
    },
    labels() {
      const thisMonth = new Date().getMonth()
      const labels = []
      for (let i = 0; i <= thisMonth; i++) {
        labels.push(this.getMonthChart[i].name)
      }
      return labels
    },

    labelsDay() {
      return this.getDayChart.map((dayChart) => dayChart.name)
    },

    chartDataDay() {
      return this.getDayChart.map((dayChart) => dayChart.value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
