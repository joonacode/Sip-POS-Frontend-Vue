<template>
  <div class="col-md-12 my-4">
    <div class="card shadow-lg rounded-sm">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <h5 class="font-weight-bold">Recent Order</h5>
          <select name class="badge badge-secondary rounded-sm outline-focus-none">
            <option value>Month</option>
            <option value>Week</option>
            <option value>Day</option>
            <option value>Year</option>
          </select>
        </div>
        <ChartHistory />
      </div>
    </div>
  </div>
</template>

<script>
import ChartHistory from './ChartHistory'
export default {
  components: {
    ChartHistory
  }
}
</script>

<style lang="scss" scoped>
</style>
