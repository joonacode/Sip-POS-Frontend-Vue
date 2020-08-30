<template>
  <div class="row">
    <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
      <HistoryInfoItem
        background="bg-1"
        title="Today Income"
        showUpgrade="true"
        :price="getIncomeToday | currency"
        :upgradeCheck="checkIncomeStatus"
        :percent="`${difference >= 0 ? '+'+ difference : difference}% Yesterday`"
      />
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
      <HistoryInfoItem
        background="bg-2"
        title="Orders Today"
        :price="getOrdersToday"
        :upgradeCheck="checkOrderStatus"
        showUpgrade="true"
        :percent="`${getOrdersYesterday} orders yesterday`"
      />
    </div>
    <div class="col-lg-4 col-md-12 col-sm-12 mb-3">
      <HistoryInfoItem
        background="bg-3"
        title="This Year's Income"
        :price="getThisYearIncome| currency"
        percent
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HistoryInfoItem from './HistoryInfoItem'
export default {
  name: 'HistoryInfoList',
  components: {
    HistoryInfoItem
  },
  computed: {
    ...mapGetters('history', [
      'getIncomeToday',
      'getIncomeYesterday',
      'getThisYearIncome',
      'getOrdersToday',
      'getOrdersYesterday'
    ]),
    difference() {
      return Math.floor(
        ((this.getIncomeToday - this.getIncomeYesterday) * 100) /
          this.getIncomeYesterday
      )
    },
    checkIncomeStatus() {
      return this.getIncomeToday > this.getIncomeYesterday
    },
    checkOrderStatus() {
      return this.getOrdersToday > this.getOrdersYesterday
    }
  }
}
</script>

<style scoped>
</style>
