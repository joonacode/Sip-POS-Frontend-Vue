import Vue from 'vue'
import Vuex from 'vuex'

import product from './modules/product.js'
import category from './modules/category.js'
import cart from './modules/cart.js'
import history from './modules/history.js'
import user from './modules/user.js'
import auth from './modules/auth.js'
import globalStore from './globalStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  ...globalStore,
  modules: {
    product,
    category,
    cart,
    history,
    user,
    auth
  }
})
