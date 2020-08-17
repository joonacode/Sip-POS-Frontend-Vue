import Product from '@/apis/Product'
export const getProducts = ({
  commit
}, {
  limit,
  page,
  order,
  sort,
  search
}) => {
  Product.all(limit, page, order, sort, search).then(response => {
    commit('SET_PRODUCTS', response.data)
  }).catch(err => {
    commit('SET_PRODUCTS', err.response.data)
  })
}

export const postProduct = ({
  commit,
  dispatch
}, data) => {
  Product.post(data).then(response => {
    commit('ADD_PRODUCT', response.data)
    dispatch('changeStatusHideModal', true, {
      root: true
    })
  }).catch(err => {
    commit('ADD_PRODUCT', err.response.data)
  })
}

export const patchProduct = ({
  commit,
  dispatch
}, data) => {
  Product.patch(data, data.id).then(response => {
    commit('UPDATE_PRODUCT', response.data)
    dispatch('changeStatusHideModal', true, {
      root: true
    })
  }).catch(err => {
    commit('UPDATE_PRODUCT', err.response.data)
  })
}

export const deleteProduct = ({
  commit
}, id) => {
  Product.delete(id).then(response => {
    commit('DELETE_PRODUCT')
  })
}

export const updateModal = ({
  commit
}, data) => {
  commit('UPDATE_MODAL', data)
}

export const updateSearchInputText = ({
  commit
}, data) => {
  commit('UPDATE_SEARCH_INPUT_TEXT', data)
}

export const showPartSearch = ({
  commit
}, data) => {
  commit('SHOW_PART_SEARCH', data)
}

export const changeOrdering = ({
  commit
}, data) => {
  commit('CHANGE_ORDERING', data)
}
