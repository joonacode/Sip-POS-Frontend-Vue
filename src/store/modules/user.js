import User from '@/apis/User'

// state
const state = {
  users: [],
  modalDataUser: {
    id: '',
    name: '',
    email: '',
    oldEmail: '',
    gender: '',
    image: '',
    oldImage: '',
    roleId: '',
    status: ''
  },
  user: {},
  name: ''
}

// getters
const getters = {
  getDetailUser: (state) => state.user,
  allUsers: (state) => state.users,
  getRoleId: (state) => state.user.roleId
}

// actions
const actions = {

  getUsers({
    commit,
    dispatch
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      User.all().then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        resolve(response.data.results)
        commit('SET_USERS', response.data.results)
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response.data)
      })
    })
  },

  updateProfile({
    commit,
    dispatch
  }, {
    data,
    id
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      User.updateProfile(data, id).then(response => {
        resolve(response.data.results)
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch('detailUser', id)
        commit('UPDATE_PROFILE', response.data.results)
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response)
      })
    })
  },

  updateUser({
    dispatch
  }, {
    data,
    id
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      User.update(data, id).then(response => {
        resolve(response.data.results)
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch('getUsers')
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response.data)
      })
    })
  },

  addUser({
    commit,
    dispatch
  }, data) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      User.insert(data).then(response => {
        resolve(response.data.results)
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch('getUsers')
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response.data)
      })
    })
  },

  changePassword({
    dispatch
  }, {
    data,
    id
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      User.changePassword(data, id).then(response => {
        resolve(response.data)
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch('detailUser', id)
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response.data)
      })
    })
  },

  deleteUser({
    dispatch
  }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      User.deleteUser(id).then(response => {
        resolve(response.data)
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch('getUsers')
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response.data)
      })
    })
  },

  detailUser({
    commit
  }, id) {
    return new Promise((resolve, reject) => {
      User.detail(id).then(response => {
        resolve(response.data)
        commit('GET_DETAIL_USER', response.data)
      }).catch(err => {
        reject(err.response)
      })
    })
  }

}

// mutations
const mutations = {

  UPDATE_PROFILE: (state, data) => {
    const dataUpdate = data[0]
    delete dataUpdate.createdAt
    delete dataUpdate.deletedAt
    localStorage.setItem('user', JSON.stringify(dataUpdate))
  },

  GET_DETAIL_USER: (state, payload) => {
    state.user = {
      ...payload.results,
      nameBc: payload.results.name
    }
  },

  SET_USERS: (state, payload) => {
    state.users = payload
  },

  UPDATE_MODAL_DATA_USER: (state, payload) => {
    if (payload === 'default') {
      state.modalDataUser = {
        id: '',
        name: '',
        email: '',
        oldEmail: '',
        gender: '',
        image: '',
        roleId: '',
        status: ''
      }
    } else {
      state.modalDataUser = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        gender: payload.gender,
        image: payload.image,
        oldEmail: payload.email,
        roleId: payload.roleId,
        status: payload.status
      }
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
