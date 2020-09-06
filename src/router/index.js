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
import VerifyAccount from '../views/Auth/LoginPage/VerifyAccount.vue'
import Register from '../views/Auth/RegistrationPage'
import Profile from '../views/Main/ProfilePage'
import Users from '../views/Main/UsersPage'
import store from '../store'
import NotFound from '../views/404.vue'

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
      },
      {
        path: 'login/verify-account',
        name: 'VerifyAccount',
        component: VerifyAccount
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
        component: History,
        meta: {
          requiresAdminCashier: true
        }
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
  },
  {
    path: '/404',
    component: NotFound,
    name: 'PageNotFound'
  }, {
    path: '*',
    redirect: {
      name: 'PageNotFound'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
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
  }
})
router.beforeEach((to, from, next) => {
  let roleId
  if (localStorage.getItem('data-hour')) {
    roleId = Vue.CryptoJS.AES.decrypt(localStorage.getItem('data-hour'), process.env.VUE_APP_SECRET_KEY).toString(Vue.CryptoJS.enc.Utf8)
  } else {
    roleId = 0
  }
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (roleId === '2') {
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
router.beforeEach((to, from, next) => {
  let roleId
  if (localStorage.getItem('data-hour')) {
    roleId = Vue.CryptoJS.AES.decrypt(localStorage.getItem('data-hour'), process.env.VUE_APP_SECRET_KEY).toString(Vue.CryptoJS.enc.Utf8)
  } else {
    roleId = 0
  }
  if (to.matched.some(record => record.meta.requiresAdminCashier)) {
    if (roleId === '3') {
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
