import Category from '@/apis/Category'

export const getCategories = ({
  commit
}) => {
  Category.all().then(response => {
    commit('SET_CATEGORIES', response.data.results)
  })
}

export const postCategory = ({
  commit,
  dispatch
}, data) => {
  Category.post(data).then(response => {
    commit('ADD_CATEGORY', response.data)
    dispatch('changeStatusHideModal', true, {
      root: true
    })
  }).catch(err => {
    commit('ADD_CATEGORY', err.response.data)
  })
}

export const patchCategory = ({
  commit,
  dispatch
}, data) => {
  Category.patch(data, data.id).then(response => {
    commit('UPDATE_CATEGORY', response.data)
    dispatch('changeStatusHideModal', true, {
      root: true
    })
  }).catch(err => {
    commit('UPDATE_CATEGORY', err.response.data)
  })
}

export const deleteCategory = ({
  commit
}, id) => {
  Category.delete(id).then(response => {
    commit('DELETE_CATEGORY', response.data)
  }).catch(err => {
    commit('DELETE_CATEGORY', err.response.data)
  })
}

export const updateModal = ({
  commit
}, data) => {
  commit('UPDATE_MODAL', data)
}
