import Vue from 'vue'

export default {
  toastError: (param) => {
    Vue.$toast.error(param)
  },
  toastSuccess: (param) => {
    Vue.$toast.success(param)
  }

}
