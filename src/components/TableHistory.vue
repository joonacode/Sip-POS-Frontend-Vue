<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">INVOICES</th>
          <th scope="col">CASHIER</th>
          <th scope="col">DATE</th>
          <th scope="col">ORDERS</th>
          <th scope="col">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="history in allHistories" :key="history.id">
          <td>#{{history.invoice}}</td>
          <td>{{history.cashier}}</td>
          <td>{{history.date}}</td>
          <td>{{history.orders}}</td>
          <td>{{history.amount | currency}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'TableHistory',
  methods: mapActions('history', ['getHistories']),
  mounted() {
    this.getHistories()
  },
  computed: {
    ...mapState('history', ['histories']),
    ...mapGetters('history', ['allHistories'])
  }
}
</script>

<style scoped>
</style>
