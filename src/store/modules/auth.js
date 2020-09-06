/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import Auth from '@/apis/Auth'
import Api from '@/apis/Api'
import router from '@/router'

// state
const state = {
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  idUser: localStorage.getItem('idUser') || null,
  roleId: localStorage.getItem('roleId') || null
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
      Auth.register(dataRegistration)
        .then(response => {
          dispatch('changeIsLoading', false, {
            root: true
          })
          resolve(response.data.results)
        })
        .catch(err => {
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
      Auth.login(dataLogin)
        .then(response => {
          dispatch('changeIsLoading', false, {
            root: true
          })
          commit('LOGIN_USER', response.data)
          resolve(response.data.results)
        })
        .catch(err => {
          dispatch('changeIsLoading', false, {
            root: true
          })
          reject(err.response.data)
        })
    })
  },

  verifyAccount({
    commit,
    dispatch
  }, token) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Auth.verifyAccount(token)
        .then(response => {
          dispatch('changeIsLoading', false, {
            root: true
          })
          resolve(response.data)
        })
        .catch(err => {
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
    state,
    dispatch
  }) {
    Api.interceptors.request.use(
      function (config) {
        if (localStorage.getItem('data-time') && localStorage.getItem('data-hour')) {
          const idUser = Vue.CryptoJS.AES.decrypt(localStorage.getItem('data-time'), process.env.VUE_APP_SECRET_KEY).toString(Vue.CryptoJS.enc.Utf8)
          const roleId = Vue.CryptoJS.AES.decrypt(localStorage.getItem('data-hour'), process.env.VUE_APP_SECRET_KEY).toString(Vue.CryptoJS.enc.Utf8)
          if (!roleId || !idUser) {
            dispatch('logoutUser')
          }
          state.idUser = idUser
          state.roleId = Number(roleId)
        } else if (!localStorage.getItem('data-time') || !localStorage.getItem('data-hour')) {
          dispatch('logoutUser')
        }
        config.headers.Authorization = `Bearer ${state.token}`
        return config
      },
      function (error) {
        console.log(error)
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
        Auth.refreshToken(tokenUser)
          .then(response => {
            const {
              token,
              refreshToken
            } = response.data.results
            state.token = token
            state.refreshToken = refreshToken
            localStorage.setItem('token', token)
            localStorage.setItem('refreshToken', refreshToken)
            dispatch('interceptorsRequest')
          })
        dispatch('interceptorsRequest')
        Vue.$toast.error('Your session is expired refresh the browser or navigate to another page for update the session', {
            duration: 5000
          })
          .catch(err => {
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
    const encryptedId = Vue.CryptoJS.AES.encrypt(id.toString(), process.env.VUE_APP_SECRET_KEY).toString()
    const encryptedRoleId = Vue.CryptoJS.AES.encrypt(roleId.toString(), process.env.VUE_APP_SECRET_KEY).toString()

    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('data-time', encryptedId)
    localStorage.setItem('data-hour', encryptedRoleId)
    state.idUser = id
    state.token = token
    state.roleId = roleId
    state.refreshToken = refreshToken
  },

  LOGOUT_USER: state => {
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
