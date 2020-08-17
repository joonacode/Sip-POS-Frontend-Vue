import Api from './Api'

const END_POINT = 'products'

export default {

  all(limit = null, page = null, order = null, sorting = null, search = null) {
    return Api.get(`${END_POINT}?limit=${limit || 9}&order=${order || 'id'}&sorting=${sorting || 'desc'}&page=${page || 1}${search ? '&search=' + search : ''}`)
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
