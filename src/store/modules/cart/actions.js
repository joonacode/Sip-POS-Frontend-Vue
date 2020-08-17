export const getCarts = ({
  commit
}, carts) => {
  commit('SET_CARTS', carts)
}

export const addToCart = ({
  commit
}, {
  product,
  qty
}) => {
  commit('ADD_TO_CART', {
    product,
    qty
  })
}

export const removeProductFromCart = ({
  commit
}, id) => {
  commit('REMOVE_PRODUCT_FROM_CART', id)
}

export const clearCart = ({
  commit
}) => {
  commit('CLEAR_CART')
}

export const saveCartToModal = ({
  commit
}, {
  products,
  price
}) => {
  commit('SAVE_CART_TO_MODAL', {
    products,
    price
  })
}

export const minQtyCart = ({
  commit
}, product) => {
  commit('MIN_QTY_CART', product)
}

export const plusQtyCart = ({
  commit
}, product) => {
  commit('PLUS_QTY_CART', product)
}

export const changeTotalQty = ({
  commit
}, {
  product,
  qty
}) => {
  commit('CHANGE_TOTAL_QTY', {
    product,
    qty
  })
}
