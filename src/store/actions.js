export const changeStatusModal = ({
  commit
}, status) => {
  commit('CHANGE_STATUS_MODAL', status)
}

export const changeStatusHideModal = ({
  commit
}, status) => {
  commit('CHANGE_STATUS_HIDE_MODAL', status)
}
