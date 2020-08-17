import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Main/Home/Home.vue'
import History from '../views/Main/History/History.vue'
import Product from '../views/Main/Product/Product.vue'
import Category from '../views/Main/Category/Category.vue'
import Main from '../views/Main/index.vue'
import Landing from '../views/Landing/index.vue'

Vue.use(VueRouter)

const routes = [ //
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/demo',
    name: 'Main',
    component: Main,
    redirect: {
      name: 'Home'
    },
    children: [ //
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'history',
        name: 'History',
        component: History
      },
      {
        path: 'product',
        name: 'Product',
        component: Product
      },
      {
        path: 'category',
        name: 'Category',
        component: Category
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
