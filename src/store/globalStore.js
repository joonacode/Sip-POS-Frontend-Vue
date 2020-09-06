import Setting from '@/apis/Setting'

// state
const state = {
  statusModal: null,
  statusHideModal: false,
  isLoading: false,
  filterTable: '',
  setting: {}
}

// getters
const getters = {
  getLoading: (state) => state.isLoading
}

// actions
const actions = {
  changeStatusModal({
    commit
  }, status) {
    commit('CHANGE_STATUS_MODAL', status)
  },

  changeStatusHideModal({
    commit
  }, status) {
    commit('CHANGE_STATUS_HIDE_MODAL', status)
  },

  changeIsLoading({
    commit
  }, status) {
    commit('CHANGE_IS_LOADING', status)
  },

  getSetting({
    commit,
    dispatch
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    Setting.get().then(response => {
      dispatch('changeIsLoading', false, {
        root: true
      })
      commit('SET_SETTING', response.data.results)
    }).catch(err => {
      dispatch('changeIsLoading', false, {
        root: true
      })
      commit('SET_SETTING', err.response.data)
    })
  },

  patchSetting({
    commit,
    dispatch
  }, data) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Setting.patch(data).then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch(('getSetting'))
        resolve(response.data)
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response.data)
      })
    })
  }

}

// mutations
const mutations = {
  CHANGE_STATUS_MODAL: (state, status) => {
    state.statusModal = status
  },

  CHANGE_STATUS_HIDE_MODAL: (state, status) => {
    state.statusHideModal = status
  },

  CHANGE_IS_LOADING: (state, status) => {
    state.isLoading = status
  },

  CHANGE_FILTER_TABLE: (state, value) => {
    state.filterTable = value
  },

  SET_SETTING: (state, data) => {
    if (data.error) {
      console.log(data.error)
    } else {
      state.setting = data
    }
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
