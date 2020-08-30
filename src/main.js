import Vue from 'vue'
import VueToast from 'vue-toast-notification'
import VueLazyload from 'vue-lazyload'
import VueCurrencyFilter from 'vue-currency-filter'

import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-toast-notification/dist/theme-default.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueCurrencyFilter, {
  symbol: 'Rp.'
})

Vue.use(VueLazyload)
Vue.use(VueToast, {
  position: 'bottom-left'
})
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.directive('focus', {
  inserted: (el) => {
    el.focus()
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
