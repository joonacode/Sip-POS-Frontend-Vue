// state
const state = {
  statusModal: null,
  statusHideModal: false,
  isLoading: false
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
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
