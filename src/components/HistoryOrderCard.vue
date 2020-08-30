<template>
  <b-col md="12" class="mb-5 mt-3">
    <b-card class="shadow-lg rounded-sm">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h5 class="font-weight-bold">Recent Order</h5>
        <select
          name
          class="badge badge-secondary rounded-sm outline-focus-none"
          v-model="filterVal"
          @change="filterHistory(filterVal)"
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
        </select>
      </div>
      <HistoryTable />
    </b-card>
  </b-col>
</template>

<script>
import { mapActions } from 'vuex'
import HistoryTable from './HistoryTable'
export default {
  name: 'OrderCardHistory',
  components: {
    HistoryTable
  },
  data() {
    return {
      filterVal: 'all'
    }
  },
  methods: {
    ...mapActions('history', ['filterHistory'])
  }
}
</script>

<style scoped>
</style>
