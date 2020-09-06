import Api from './Api'

const END_POINT = 'setting'

export default {

  get() {
    return Api.get(END_POINT)
  },
  patch(data) {
    return Api.patch(`${END_POINT}`, data)
  }

}
