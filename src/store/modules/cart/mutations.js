import message from '../helper/message'
export const SET_CARTS = (state, carts) => {
  state.carts = carts
}

export const ADD_TO_CART = (state, {
  product,
  qty
}) => {
  const productInCart = state.carts.find(val => {
    return val.product.id === product.id
  })

  if (productInCart) {
    productInCart.qty += qty
    return
  }
  message.toastSuccess('Product added to cart')

  state.carts.push({
    product,
    qty
  })
}

export const REMOVE_PRODUCT_FROM_CART = (state, id) => {
  state.carts = state.carts.filter(cart => cart.product.id !== id)
  message.toastSuccess('Product remove from cart')
}

export const CLEAR_CART = (state) => {
  message.toastSuccess('Cart has been cleaned')
  state.carts = []
}

export const SAVE_CART_TO_MODAL = (state, {
  products,
  price
}) => {
  state.cartCheckout.products = products
  state.cartCheckout.totalPrice = price
  state.carts = []
}

export const MIN_QTY_CART = (state, product) => {
  const productInCart = state.carts.find(val => {
    return val.product.id === product.id
  })

  if (productInCart) {
    if (productInCart.qty > 1) {
      productInCart.qty--
    }
  }
}

export const PLUS_QTY_CART = (state, product) => {
  const productInCart = state.carts.find(val => {
    return val.product.id === product.id
  })

  if (productInCart) {
    productInCart.qty++
  }
}

export const CHANGE_TOTAL_QTY = (state, {
  product,
  qty
}) => {
  const productInCart = state.carts.find(val => {
    return val.product.id === product.id
  })
  if (productInCart) {
    if (Number(qty) < 1) {
      productInCart.qty = 1
    } else {
      productInCart.qty = Number(qty)
    }
  }
}
