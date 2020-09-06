import Api from './Api'

const END_POINT = 'histories'

export default {

  all() {
    return Api.get(END_POINT)
  },
  post(data) {
    return Api.post(END_POINT, data)
  },
  myHistory(id) {
    return Api.get(`${END_POINT}/my-history/${id}`)
  },
  sendReceipt(data) {
    return Api.post(`${END_POINT}/send-email-receipt`, data)
  },
  patch(data, id) {
    return Api.patch(`${END_POINT}/${id}`, data)
  },
  delete(id) {
    return Api.delete(`${END_POINT}/${id}`)
  },
  getOne(id) {
    return Api.get(`${END_POINT}/${id}`)
  }

}
