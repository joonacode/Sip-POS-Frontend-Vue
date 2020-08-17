import Vue from 'vue'

export default {
  toastError: (param) => {
    Vue.$toast.error(`<b>Error</b> : ${param}`)
  },
  toastSuccess: (param) => {
    Vue.$toast.success(`<b>Success</b> : ${param}`)
  }

}
