import Api from './Api'

const END_POINT = 'users'

export default {
  all(data) {
    return Api.get(`${END_POINT}`, data)
  },
  detail(id) {
    return Api.get(`${END_POINT}/${id}`)
  },
  updateProfile(data, id) {
    return Api.patch(`${END_POINT}/profile/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  insert(data) {
    return Api.post(`${END_POINT}`, data)
  },
  update(data, id) {
    return Api.patch(`${END_POINT}/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  changePassword(data, id) {
    return Api.patch(`${END_POINT}/change-password/${id}`, data)
  },
  deleteUser(id) {
    return Api.delete(`${END_POINT}/${id}`)
  }
}
