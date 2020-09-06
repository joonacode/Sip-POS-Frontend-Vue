import Api from './Api'

const BASE_URL = 'auth'

export default {
  register(data) {
    return Api.post(`${BASE_URL}/register`, data)
  },
  login(data) {
    return Api.post(`${BASE_URL}/login`, data)
  },
  refreshToken(data) {
    return Api.post(`${BASE_URL}/refresh-token`, data)
  },
  verifyAccount(token) {
    return Api.post(`${BASE_URL}/verify-account`, token)
  }
}
