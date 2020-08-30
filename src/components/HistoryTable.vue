<template>
  <div>
    <b-table
      show-empty
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
      :items="allHistories"
      responsive
      hover
    >
      <template v-slot:cell(invoice)="data">#{{data.item.invoice}}</template>
      <template v-slot:cell(date)="data">{{data.item.date}}</template>
      <template v-slot:cell(amount)="data">{{data.item.amount | currency}}</template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="allHistories.length"
      :per-page="perPage"
      first-number
      last-number
    ></b-pagination>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'TableHistory',
  data() {
    return {
      fields: ['invoice', 'cashier', 'date', 'orders', 'amount'],
      currentPage: 1,
      perPage: 10
    }
  },
  methods: {
    ...mapActions('history', ['getHistories']),
    formatDate(param) {
      const options = {
        day: 'numeric',
        month: 'long',
        weekday: 'long'
      }
      const hariIni = param.toLocaleDateString('id-ID', options)
      return hariIni
    }
  },
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
