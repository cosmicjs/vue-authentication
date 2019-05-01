import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/forgot-password',
      name: 'forgot password',
      component: () => import(/* webpackChunkName: "about" */ '../views/ForgotPassword.vue'),
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/reset-password',
      name: 'reset password',
      component: () => import(/* webpackChunkName: "about" */ '../views/ResetPassword.vue'),
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/activate-account',
      name: 'activate account',
      component: () => import(/* webpackChunkName: "about" */ '../views/ActivateAccount.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
      // beforeEnter: ifAuthenticated
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})
