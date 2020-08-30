/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import Auth from '@/apis/Auth'
import Api from '@/apis/Api'
import router from '@/router'

// state
const state = {
  idUser: localStorage.getItem('id') || null,
  roleId: localStorage.getItem('roleId') || null,
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null
}

// getters
const getters = {
  isLogin(state) {
    return state.token !== null
  }
}

// actions
const actions = {
  registerUser({
    commit,
    dispatch
  }, dataRegistration) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Auth.register(dataRegistration).then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        resolve(response.data.results)
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response.data)
      })
    })
  },

  loginUser({
    commit,
    dispatch
  }, dataLogin) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Auth.login(dataLogin).then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        commit('LOGIN_USER', response.data)
        resolve(response.data.results)
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response.data)
      })
    })
  },

  logoutUser({
    commit
  }) {
    commit('LOGOUT_USER')
  },

  interceptorsRequest({
    state
  }) {
    Api.interceptors.request.use(
      function (config) {
        config.headers.Authorization = `Bearer ${state.token}`
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )
  },

  interceptorsResponse({
    state,
    rootState,
    commit,
    dispatch,
    getters
  }) {
    Api.interceptors.response.use(function (response) {
      return response
    }, function (err) {
      const {
        error,
        status_code

      } = err.response.data
      if (error === 'Token invalid' && status_code === 401) {
        commit('LOGOUT_USER')
        Vue.$toast.error('Opps... Your token invalid!')
        router.push({
          name: 'Login'
        })
      } else if (error === 'Token expired' && status_code === 401) {
        const tokenUser = {
          id: state.idUser,
          roleId: Number(state.roleId),
          refreshToken: state.refreshToken
        }
        Auth.refreshToken(tokenUser).then(response => {
          const {
            token,
            refreshToken
          } = response.data.results
          localStorage.setItem('token', token)
          localStorage.setItem('refreshToken', refreshToken)
          dispatch('interceptorsRequest')
        }).catch(err => {
          console.log(err.response)
        })
      } else if (error === 'Only admins can access' && status_code === 403) {
        Vue.$toast.error('Opps... You not have permission!')
        router.push({
          name: 'Home'
        })
      }
      return Promise.reject(err)
    })
  }

}
// mutations
const mutations = {

  LOGIN_USER: (state, data) => {
    const {
      token,
      refreshToken,
      id,
      roleId
    } = data.results
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('id', id)
    localStorage.setItem('roleId', roleId)
    state.idUser = id
    state.token = token
    state.roleId = roleId
    state.refreshToken = refreshToken
  },

  LOGOUT_USER: (state) => {
    localStorage.clear()
    state.idUser = {}
    state.token = null
    state.roleId = null
    state.refreshToken = null
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
