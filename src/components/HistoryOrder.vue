<template>
  <b-col md="12" class="mb-5 mt-3">
    <b-card class="shadow-lg rounded-sm">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h5 class="font-weight-bold">Recent Order</h5>
        <select name class="badge badge-secondary rounded-sm outline-focus-none">
          <option value>Today</option>
          <option value>Yesterday</option>
        </select>
      </div>
      <TableHistory />
    </b-card>
  </b-col>
</template>

<script>
import TableHistory from './TableHistory'
export default {
  name: 'HistoryOrder',
  components: {
    TableHistory
  }
}
</script>

<style scoped>
</style>
