<template>
  <g-card :isHeader="false">
    <template #customHeader>
      <div class="px-4 pt-4">
        <div class="d-flex align-items-center justify-content-between">
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
      </div>
    </template>
    <template #cardBody>
      <ChartItem
        v-if="!getLoading && filterBy === 'month'"
        :chartData="chartData"
        :labels="labels"
      />
      <div v-if="filterBy === 'day'">
        <ChartItem v-if="!getLoading" :chartData="chartDataDay" :labels="labelsDay" />
      </div>
    </template>
  </g-card>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartItem from '@/components/molecules/ChartItem'
export default {
  components: {
    ChartItem
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
      let thisMonth = new Date().getMonth()
      if (thisMonth <= 3) thisMonth = 3
      const valueCart = []
      for (let i = 0; i <= thisMonth; i++) {
        valueCart.push(this.getMonthChart[i].value)
      }
      return valueCart
    },
    labels() {
      let thisMonth = new Date().getMonth()
      if (thisMonth <= 3) thisMonth = 3
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
