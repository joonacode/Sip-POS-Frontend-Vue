import message from '../helper/message'
// import History from '@/apis/History'

export const SET_HISTORIES = (state, histories) => {
  state.histories = histories
}

export const ADD_HISTORY = (state, data) => {
  if (data.error) {
    message.toastError(data.error.sqlMessage ? data.error.sqlMessage : data.error.join(', '))
  } else {
    message.toastSuccess('Transaction success')
  }
}

// export const UPDATE_CATEGORY = (state, data) => {
//   if (data.error) {
//     message.toastError(data.error.sqlMessage ? data.error.sqlMessage : data.error.join(', '))
//   } else {
//     message.toastSuccess(data.message)
//   }
// }

// export const UPDATE_MODAL = (state, data) => {
//   state.category = {
//     name: data.name,
//     id: data.id
//   }
// }

// export const DELETE_CATEGORY = (state, data) => {
//   if (data.error) {
//     message.toastError(data.error.sqlMessage ? data.error.sqlMessage : data.error.join(', '))
//   } else {
//     Category.all().then(response => {
//       state.categories = response.data.results
//     })
//     message.toastSuccess(data.message)
//   }
// }
