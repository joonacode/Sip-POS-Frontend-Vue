import Category from '@/apis/Category'

// State
const state = {
  categories: [],
  category: {
    name: '',
    id: ''
  }
}

// Getters
const getters = {
  allCategories: (state) => {
    return state.categories
  }

}

// Actions
const actions = {

  getCategories({
    commit,
    dispatch
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    Category.all().then(response => {
      dispatch('changeIsLoading', false, {
        root: true
      })
      commit('SET_CATEGORIES', response.data.results)
    }).catch(err => {
      dispatch('changeIsLoading', false, {
        root: true
      })
      commit('SET_CATEGORIES', err.response.data)
    })
  },

  postCategory({
    commit,
    dispatch
  }, data) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Category.post(data).then(response => {
        dispatch('changeStatusHideModal', true, {
          root: true
        })
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch(('getCategories'))
        resolve(response.data)
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response.data)
      })
    })
  },

  patchCategory({
    commit,
    dispatch
  }, data) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Category.patch(data, data.id).then(response => {
        dispatch('changeStatusHideModal', true, {
          root: true
        })
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch(('getCategories'))
        resolve(response.data)
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response.data)
      })
    })
  },

  deleteCategory({
    commit,
    dispatch
  }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Category.delete(id).then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch(('getCategories'))
        resolve(response.data)
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response.data)
      })
    })
  },

  updateModal({
    commit
  }, data) {
    commit('UPDATE_MODAL', data)
  }

}

// Mutations
const mutations = {

  SET_CATEGORIES: (state, categories) => {
    state.categories = categories
  },

  UPDATE_MODAL: (state, data) => {
    state.category = {
      name: data.name,
      id: data.id
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
