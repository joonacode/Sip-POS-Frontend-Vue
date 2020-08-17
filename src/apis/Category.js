import Api from './Api'

const END_POINT = 'categories'

export default {

  all() {
    return Api.get(END_POINT)
  },
  post(data) {
    return Api.post(END_POINT, data)
  },
  patch(data, id) {
    return Api.patch(`${END_POINT}/${id}`, data)
  },
  delete(id) {
    return Api.delete(`${END_POINT}/${id}`)
  }

}
