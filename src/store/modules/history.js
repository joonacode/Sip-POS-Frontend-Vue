import History from '@/apis/History'
import message from './helper/message'

// state
const state = {
  histories: [],
  historiesBc: [],
  incomeToday: '',
  incomeYesterday: '',
  ordersToday: '',
  ordersYesterday: '',
  thisYearIncome: '',
  monthChart: [ //
    {
      id: 1,
      name: 'January',
      value: 0
    },
    {
      id: 2,
      name: 'February',
      value: 0
    },
    {
      id: 3,
      name: 'March',
      value: 0
    },
    {
      id: 4,
      name: 'April',
      value: 0
    },
    {
      id: 5,
      name: 'Mei',
      value: 0
    },
    {
      id: 6,
      name: 'June',
      value: 0
    },
    {
      id: 7,
      name: 'July',
      value: 0
    },
    {
      id: 8,
      name: 'August',
      value: 0
    },
    {
      id: 9,
      name: 'September',
      value: 0
    },
    {
      id: 10,
      name: 'October',
      value: 0
    },
    {
      id: 11,
      name: 'November',
      value: 0
    },
    {
      id: 12,
      name: 'December',
      value: 0
    }
  ],
  dayChart: []
}

// getters
const dateFormat = {
  day: 'numeric',
  month: 'long',
  weekday: 'long'
}
const dateGlobal = new Date()
const todayGlobal = dateGlobal.toLocaleDateString('id-ID', dateFormat)
const yesterdayx = new Date()
yesterdayx.setDate(yesterdayx.getDate() - 1)
const getYesterday = yesterdayx.toLocaleDateString('id-ID', dateFormat)

const getters = {
  allHistories: (state) => {
    return state.histories
  },
  getIncomeToday: (state) => state.incomeToday,
  getIncomeYesterday: (state) => state.incomeYesterday,
  getThisYearIncome: (state) => state.thisYearIncome,
  getOrdersToday: (state) => state.ordersToday,
  getOrdersYesterday: (state) => state.ordersYesterday,
  getMonthChart: (state) => state.monthChart,
  getDayChart: (state) => state.dayChart

}

// actions
const actions = {

  getHistories({
    commit,
    dispatch
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    History.all().then(response => {
      commit('SET_HISTORIES', response.data.results)
      dispatch('changeIsLoading', false, {
        root: true
      })
    })
  },

  postHistory({
    commit
  }, data) {
    History.post(data).then(response => {
      commit('ADD_HISTORY', response.data.results)
    }).catch(err => {
      commit('ADD_HISTORY', err.response.data)
    })
  },

  filterHistory({
    commit,
    dispatch
  }, filter) {
    if (filter === 'all') {
      dispatch('getHistories')
    } else if (filter === 'today') {
      commit('FILTER_HISTORY', filter)
    } else if (filter === 'yesterday') {
      commit('FILTER_HISTORY', filter)
    } else {
      dispatch('getHistories')
    }
  }
}

// mutations
const mutations = {

  SET_HISTORIES: (state, histories) => {
    const newHistories = histories.map(history => {
      return {
        history: history.amount,
        cashier: history.cashier,
        date: new Date(history.date).toLocaleDateString('id-ID', dateFormat),
        dateJs: new Date(history.date),
        year: new Date(history.date).getFullYear(),
        month: new Date(history.date).getMonth() + 1,
        id: history.id,
        invoice: history.invoice,
        orders: history.orders,
        amount: history.amount

      }
    })

    state.histories = newHistories
    state.historiesBc = newHistories
    state.incomeToday = newHistories.filter(history => history.date === todayGlobal).map(val => Number(val.amount)).reduce((a, b) => a + b)
    state.incomeYesterday = newHistories.filter(history => history.date === getYesterday).map(val => Number(val.amount)).reduce((a, b) => a + b)
    state.ordersToday = newHistories.filter(history => history.date === todayGlobal).length
    state.ordersYesterday = newHistories.filter(history => history.date === getYesterday).length
    state.thisYearIncome = newHistories.filter(history => history.year === new Date().getFullYear()).map(val => Number(val.amount)).reduce((a, b) => a + b)
    state.monthChart.map((monthItem) => {
      monthItem.value = 0
    })
    state.monthChart.map((monthItem) => {
      newHistories.map((historyItem) => {
        if (monthItem.id === historyItem.month) {
          monthItem.value += historyItem.amount
        }
      })
    })
    const chartDateDay = new Date()
    chartDateDay.setDate(chartDateDay.getDate() + 1)
    const listSevenDay = []
    for (let i = 1; i <= 7; i++) {
      chartDateDay.setDate(chartDateDay.getDate() - 1)
      const getDateFormated = chartDateDay.toLocaleDateString('id-ID', dateFormat)
      listSevenDay.push(getDateFormated)
    }
    const reverseDay = listSevenDay.reverse()
    const dayObj = reverseDay.map(val => {
      return {
        name: val,
        value: 0
      }
    })
    state.dayChart = dayObj
    state.dayChart.map((dayChart) => [
      newHistories.map((historyItem) => {
        if (dayChart.name === historyItem.date) {
          dayChart.value += historyItem.amount
        }
      })
    ])
  },

  ADD_HISTORY: (state, data) => {
    if (data.error) {
      message.toastError(data.error.sqlMessage ? data.error.sqlMessage : data.error.join(', '))
    } else {
      message.toastSuccess('Transaction success')
    }
  },

  FILTER_HISTORY: (state, payload) => {
    const d = new Date()
    if (payload === 'today') {
      const today = d.toLocaleDateString('id-ID', dateFormat)
      state.histories = state.historiesBc.filter(history => history.date === today)
    } else if (payload === 'yesterday') {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const getYesterday = yesterday.toLocaleDateString('id-ID', dateFormat)
      state.histories = state.historiesBc.filter(history => history.date === getYesterday)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
