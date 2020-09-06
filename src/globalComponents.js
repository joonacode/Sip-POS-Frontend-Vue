import Vue from 'vue'

// atoms
Vue.component('g-button',
  () => import('./components/atoms/button.vue')
)
Vue.component('g-input',
  () => import('./components/atoms/input.vue')
)
Vue.component('g-card',
  () => import('./components/atoms/card.vue')
)

// Molecules
Vue.component('g-form-group',
  () => import('./components/molecules/FormGroup.vue')
)

Vue.component('g-form-group-select',
  () => import('./components/molecules/FormGroupSelect.vue')
)
