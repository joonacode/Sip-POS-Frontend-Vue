import History from '@/apis/History'

// state
const state = {
  histories: [],
  myHistories: [],
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
  allHistories: (state) => state.histories,
  allMyHistories: (state) => state.myHistories,
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

  getMyHistories({
    commit,
    dispatch
  }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    History.myHistory(id).then(response => {
      commit('SET_MY_HISTORIES', response.data.results)
      dispatch('changeIsLoading', false, {
        root: true
      })
    })
  },

  postHistory({
    commit,
    dispatch
  }, data) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      History.post(data).then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        resolve(response.data)
      }).catch(err => {
        reject(err.response.data)
      })
    })
  },

  deleteHistory({
    commit,
    dispatch
  }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      History.delete(id).then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch('getHistories')
        resolve(response.data)
      }).catch(err => {
        reject(err.response.data)
      })
    })
  },

  sendReceipt({
    commit,
    dispatch
  }, data) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      History.sendReceipt(data).then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        resolve(response.data)
      }).catch(err => {
        reject(err.response.data)
      })
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
        ...history,
        date: new Date(history.date).toLocaleDateString('id-ID', dateFormat),
        dateJs: new Date(history.date),
        year: new Date(history.date).getFullYear(),
        month: new Date(history.date).getMonth() + 1
      }
    })

    state.histories = newHistories
    state.historiesBc = newHistories
    const checkTodakIncome = newHistories.filter(history => history.date === todayGlobal)
    const checkYesterdayIncome = newHistories.filter(history => history.date === getYesterday)
    const checkYearIncome = newHistories.filter(history => history.year === new Date().getFullYear())
    if (checkTodakIncome.length < 1) {
      state.incomeToday = 0
    } else {
      state.incomeToday = newHistories.filter(history => history.date === todayGlobal).map(val => Number(val.amount)).reduce((a, b) => a + b)
    }
    if (checkYesterdayIncome.length < 1) {
      state.incomeYesterday = 0
    } else {
      state.incomeYesterday = newHistories.filter(history => history.date === getYesterday).map(val => Number(val.amount)).reduce((a, b) => a + b)
    }
    if (checkYearIncome.length < 1) {
      state.thisYearIncome = 0
    } else {
      state.thisYearIncome = newHistories.filter(history => history.year === new Date().getFullYear()).map(val => Number(val.amount)).reduce((a, b) => a + b)
    }

    state.ordersToday = newHistories.filter(history => history.date === todayGlobal).length
    state.ordersYesterday = newHistories.filter(history => history.date === getYesterday).length
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

  SET_MY_HISTORIES: (state, histories) => {
    const newHistories = histories.map(history => {
      return {
        ...history,
        date: new Date(history.date).toLocaleDateString('id-ID', dateFormat),
        dateJs: new Date(history.date),
        year: new Date(history.date).getFullYear(),
        month: new Date(history.date).getMonth() + 1
      }
    })

    state.myHistories = newHistories
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
