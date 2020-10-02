import Api from './Api'

const BASE_URL = 'auth'

export default {
  register(data) {
    return Api.post(`${BASE_URL}/register`, data)
  },
  login(data) {
    return Api.post(`${BASE_URL}/login`, data)
  },
  verifyAccount(token) {
    return Api.post(`${BASE_URL}/verify-account`, token)
  },
  forgotPassword(data) {
    return Api.post(`${BASE_URL}/forgot-password`, data)
  },
  verifyTokenPassword(data) {
    return Api.post(`${BASE_URL}/verify-token-password`, data)
  },
  resetPassword(data) {
    return Api.post(`${BASE_URL}/reset-password`, data)
  }
}
