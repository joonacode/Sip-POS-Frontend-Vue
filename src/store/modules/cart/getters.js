export const countTotalCart = (state) => {
  return state.carts.length
}

export const getInvoiceRandom = (state) => {
  return state.invoice
}

export const cartTotalPrice = (state) => {
  let total = 0
  state.carts.forEach(cart => {
    total += cart.product.price * cart.qty
  })
  return total
}
