import Vue from 'vue'
import Vuex from 'vuex'

import product from './modules/product'
import category from './modules/category'
import cart from './modules/cart'
import history from './modules/history'
import state from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    product,
    category,
    cart,
    history
  }
})
