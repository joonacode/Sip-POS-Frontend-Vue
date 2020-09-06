import Vue from 'vue'
import VueToast from 'vue-toast-notification'
import VueLazyload from 'vue-lazyload'
import VueCurrencyFilter from 'vue-currency-filter'
import VueSweetalert2 from 'vue-sweetalert2'
import VueCryptojs from 'vue-cryptojs'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
import VueHtmlToPaper from 'vue-html-to-paper'
import '@/globalComponents.js'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-toast-notification/dist/theme-default.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-search-select/dist/VueSearchSelect.css'

const options = {
  styles: [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
  ]
}

Vue.use(BootstrapVue)
Vue.use(VueCurrencyFilter, {
  symbol: 'Rp.'
})
Vue.use(VueCryptojs)
Vue.use(VueSweetalert2)
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
Vue.use(VueHtmlToPaper, options)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
