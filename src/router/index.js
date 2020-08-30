import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Main/HomePage'
import History from '../views/Main/HistoryPage'
import Product from '../views/Main/ProductPage'
import Category from '../views/Main/CategoryPage'
import Main from '../views/Main/index.vue'
import Landing from '../views/Landing/index.vue'
import Auth from '../views/Auth'
import Login from '../views/Auth/LoginPage'
import Register from '../views/Auth/RegistrationPage'
import Profile from '../views/Main/ProfilePage'
import Users from '../views/Main/UsersPage'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  //
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    redirect: {
      name: 'Login'
    },
    meta: {
      requiresVisit: true
    },
    children: [
      //
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  },
  {
    path: '/demo',
    name: 'Main',
    component: Main,
    redirect: {
      name: 'Home'
    },
    meta: {
      requiresAuth: true
    },
    children: [
      //
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
        component: Product,
        meta: {
          requiresAdmin: true
        }
      },
      {
        path: 'category',
        name: 'Category',
        component: Category,
        meta: {
          requiresAdmin: true
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'users',
        name: 'Users',
        component: Users,
        meta: {
          requiresAdmin: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters['auth/isLogin']) {
      next({
        path: '/auth/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisit)) {
    if (store.getters['auth/isLogin']) {
      next({
        path: '/demo'
      })
    } else {
      next()
    }
  } else {
    next()
    // make sure to always call next()!
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (localStorage.getItem('roleId') === '2') {
      next({
        path: '/demo'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
