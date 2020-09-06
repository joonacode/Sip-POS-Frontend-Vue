<template>
  <div>
    <div class="row">
      <div class="col-md-4 ml-auto">
        <b-form-group class="w-25 w-100">
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
    </div>
    <b-table
      show-empty
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
      :items="allHistoriesAndDetails"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :filter="filter"
      @filtered="onFiltered"
      sort-icon-left
      responsive
      hover
    >
      <template
        v-slot:cell(id)="data"
      >{{currentPage === 1 ? (data.index + 1) : (perPage * (currentPage - 1) + 1) + data.index}}</template>
      <template v-slot:cell(invoice)="data">#{{data.item.invoice}}</template>
      <template v-slot:cell(date)="data">{{data.item.date}}</template>
      <template
        v-slot:cell(orders)="data"
      >{{data.item.orders.substring(0, 30) + (data.item.orders.length >= 30 ? '...' : '')}}</template>
      <template v-slot:cell(amount)="data">{{data.item.amount | currency}}</template>
      <template v-slot:cell(option)="row">
        <b-button size="sm" class="ml-1" variant="primary" @click="row.toggleDetails">Details</b-button>
        <g-button
          v-if="roleId === 1"
          @cus-click="deleteHistoryItem(row.item.id)"
          type="button"
          variant="danger"
          cusClass="my-1 ml-1"
          size="sm"
        >Delete</g-button>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <p>Is Member: {{row.item.isMember ? 'Yes' : 'No'}}</p>
          <p v-if="row.item.isMember">Id Member: {{row.item.isMember}}</p>
          <p>Detail Orders:</p>
          <table>
            <thead>
              <th>#</th>
              <th>Name</th>
              <th>Initial Price</th>
              <th>Qty</th>
              <th>Total Price</th>
            </thead>
            <tbody>
              <tr v-for="(detailOrder, i) in row.item.detailOrders" :key="i">
                <td>{{i + 1}}</td>
                <td>{{detailOrder.name}}</td>
                <td>{{detailOrder.initialPrice | currency}}</td>
                <td>{{detailOrder.purchaseAmount}}</td>
                <td>{{detailOrder.priceAmount | currency}}</td>
              </tr>
              <tr>
                <td colspan="4">Total Payment</td>
                <td>{{row.item.amount | currency }}</td>
              </tr>
            </tbody>
          </table>
        </b-card>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      first-number
      last-number
    ></b-pagination>
  </div>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'TableHistory',
  mixins: [mixins],
  data() {
    return {
      sortBy: 'id',
      sortDesc: true,
      fields: [
        { key: 'id', sortable: true, label: 'no' },
        { key: 'invoice', sortable: true },
        'cashier',
        'date',
        'orders',
        { key: 'amount', sortable: true },
        'option'
      ],
      currentPage: 1,
      perPage: 10,
      filter: null,
      filterOn: [],
      totalRows: 0
    }
  },
  methods: {
    ...mapActions('history', [
      'getHistories',
      'getMyHistories',
      'deleteHistory'
    ]),
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    deleteHistoryItem(id) {
      this.confirmDelete('category', () => {
        this.deleteHistory(id)
          .then((response) => {
            this.toastSuccess('History successfully deleted')
          })
          .catch(({ error }) => {
            this.toastError(
              error.sqlMessage ? error.sqlMessage : error.join(', ')
            )
          })
      })
    }
  },
  mounted() {
    if (this.roleId === 3) {
      this.getMyHistories(this.idUser)
    } else {
      this.getHistories()
    }
    this.totalRows = this.allHistoriesAndDetails.length
  },
  computed: {
    ...mapState('history', ['histories']),
    ...mapGetters('history', ['allHistories', 'allMyHistories']),
    ...mapState('auth', ['roleId', 'idUser']),
    allHistoriesAndDetails() {
      if (this.roleId === 3) {
        return this.allMyHistories.map((history) => {
          const arrOrders = history.orders.split(', ')
          const arrpurchaseAmount = history.purchaseAmount.split(', ')
          const arrInitialPrice = history.initialPrice.split(', ')
          const arrPriceAmount = history.priceAmount.split(', ')
          const newObjOrders = []
          arrOrders.map((order, i) => {
            newObjOrders.push({
              name: order,
              purchaseAmount: arrpurchaseAmount[i],
              initialPrice: arrInitialPrice[i],
              priceAmount: arrPriceAmount[i]
            })
          })
          return {
            ...history,
            detailOrders: newObjOrders,
            _showDetails: false
          }
        })
      } else {
        return this.allHistories.map((history) => {
          const arrOrders = history.orders.split(', ')
          const arrpurchaseAmount = history.purchaseAmount.split(', ')
          const arrInitialPrice = history.initialPrice.split(', ')
          const arrPriceAmount = history.priceAmount.split(', ')
          const newObjOrders = []
          arrOrders.map((order, i) => {
            newObjOrders.push({
              name: order,
              purchaseAmount: arrpurchaseAmount[i],
              initialPrice: arrInitialPrice[i],
              priceAmount: arrPriceAmount[i]
            })
          })
          return {
            ...history,
            detailOrders: newObjOrders,
            _showDetails: false
          }
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
