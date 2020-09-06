import Product from '@/apis/Product'

// State
const state = () => ({
  products: [],
  productsNoPaging: [],
  product: {
    name: '',
    image: '',
    price: '',
    category: '',
    id: ''
  },
  currentPage: 1,
  totalProduct: 0,
  pagination: {},
  linkPagination: {},
  totalPages: 0,
  showSearch: false,
  searchInputText: '',
  ordering: {
    order: 'id',
    sort: 'desc'
  }
})

// Getters
const getters = {
  allProducts: (state) => {
    return state.products
  },
  allProductsNoPaging: (state) => {
    return state.productsNoPaging
  }
}

// Actions
const actions = {
  getProducts({
    commit,
    dispatch
  }, {
    limit,
    page,
    order,
    sort,
    search
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    Product.all(limit, page, order, sort, search)
      .then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        commit('SET_PRODUCTS', response.data)
      })
      .catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        commit('SET_PRODUCTS', err.response.data)
      })
  },

  getProductsNoPaging({
    commit,
    dispatch
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    Product.allNoPaging()
      .then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        commit('SET_PRODUCTS_NO_PAGING', response.data)
      })
      .catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        commit('SET_PRODUCTS_NO_PAGING', err.response.data)
      })
  },

  postProduct({
    commit,
    dispatch
  }, data) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Product.post(data)
        .then(response => {
          dispatch('changeStatusHideModal', true, {
            root: true
          })
          dispatch('changeIsLoading', false, {
            root: true
          })
          dispatch('getProductsNoPaging')

          resolve(response.data)
        })
        .catch(err => {
          dispatch('changeIsLoading', false, {
            root: true
          })
          reject(err.response.data)
        })
    })
  },

  patchProduct({
    commit,
    dispatch
  }, {
    data,
    id
  }) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Product.patch(data, id)
        .then(response => {
          dispatch('changeIsLoading', false, {
            root: true
          })
          dispatch('changeStatusHideModal', true, {
            root: true
          })
          dispatch('getProductsNoPaging')
          resolve(response.data)
        })
        .catch(err => {
          dispatch('changeIsLoading', false, {
            root: true
          })
          reject(err.response.data)
        })
    })
  },

  deleteProduct({
    commit,
    dispatch
  }, id) {
    dispatch('changeIsLoading', true, {
      root: true
    })
    return new Promise((resolve, reject) => {
      Product.delete(id).then(response => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        dispatch('getProductsNoPaging')
        resolve(response.data)
      }).catch(err => {
        dispatch('changeIsLoading', false, {
          root: true
        })
        reject(err.response.data)
      })
    })
  }
}

// Mutations
const mutations = {

  SET_PRODUCTS: (state, data) => {
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
  },

  SET_PRODUCTS_NO_PAGING: (state, data) => {
    if (data.error) {
      state.productsNoPaging = []
    } else {
      state.productsNoPaging = data.results
    }
  },

  UPDATE_MODAL: (state, data) => {
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
  },

  UPDATE_SEARCH_INPUT_TEXT: (state, data) => {
    state.searchInputText = data
  },

  SHOW_PART_SEARCH: (state, data) => {
    state.showSearch = data
  },

  CHANGE_ORDERING: (state, data) => {
    state.ordering.sort = data.sort
    state.ordering.order = data.order
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
