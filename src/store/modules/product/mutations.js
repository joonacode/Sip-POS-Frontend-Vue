import message from '../helper/message'

export const SET_PRODUCTS = (state, data) => {
  if (data.error) {
    state.totalPages = 0
    state.totalProduct = 0
    state.products = []
  } else {
    state.products = data.results
    state.totalPages = data.total_pages
    state.totalProduct = data.total
    state.pagination = {
      foundInPage: data.count,
      currentPage: data.currentPage,
      perPage: data.per_page,
      total: data.total,
      totalPages: data.total_pages
    }
    state.linkPagination = data._links
  }
}

export const ADD_PRODUCT = (state, data) => {
  if (data.error) {
    message.toastError(data.error.sqlMessage ? data.error.sqlMessage : data.error.join(', '))
  } else {
    message.toastSuccess(data.message)
  }
}

export const UPDATE_PRODUCT = (state, data) => {
  if (data.error) {
    message.toastError(data.error.sqlMessage ? data.error.sqlMessage : data.error.join(', '))
  } else {
    message.toastSuccess(data.message)
  }
}

export const DELETE_PRODUCT = (state) => {
  message.toastSuccess('Data successfully deleted')
}

export const UPDATE_MODAL = (state, data) => {
  const {
    name,
    price,
    image,
    idCategory,
    id
  } = data
  state.product.name = name
  state.product.price = price
  state.product.image = image
  state.product.category = idCategory
  state.product.id = id
}

export const UPDATE_SEARCH_INPUT_TEXT = (state, data) => {
  state.searchInputText = data
}

export const SHOW_PART_SEARCH = (state, data) => {
  state.showSearch = data
}

export const CHANGE_ORDERING = (state, data) => {
  state.ordering.sort = data.sort
  state.ordering.order = data.order
}
