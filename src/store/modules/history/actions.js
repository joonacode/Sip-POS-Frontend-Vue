import History from '@/apis/History'

export const getHistories = ({
  commit
}) => {
  History.all().then(response => {
    commit('SET_HISTORIES', response.data.results)
  })
}

export const postHistory = ({
  commit
}, data) => {
  History.post(data).then(response => {
    commit('ADD_HISTORY', response.data.results)
  }).catch(err => {
    commit('ADD_HISTORY', err.response.data)
  })
}

// export const postCategory = ({
//   commit,
//   dispatch
// }, data) => {
//   Category.post(data).then(response => {
//     commit('ADD_CATEGORY', response.data)
//     dispatch('changeStatusHideModal', true, {
//       root: true
//     })
//   }).catch(err => {
//     commit('ADD_CATEGORY', err.response.data)
//   })
// }

// export const patchCategory = ({
//   commit,
//   dispatch
// }, data) => {
//   Category.patch(data, data.id).then(response => {
//     commit('UPDATE_CATEGORY', response.data)
//     dispatch('changeStatusHideModal', true, {
//       root: true
//     })
//   }).catch(err => {
//     commit('UPDATE_CATEGORY', err.response.data)
//   })
// }

// export const deleteCategory = ({
//   commit
// }, id) => {
//   Category.delete(id).then(response => {
//     commit('DELETE_CATEGORY', response.data)
//   }).catch(err => {
//     commit('DELETE_CATEGORY', err.response.data)
//   })
// }

// export const updateModal = ({
//   commit
// }, data) => {
//   commit('UPDATE_MODAL', data)
// }
