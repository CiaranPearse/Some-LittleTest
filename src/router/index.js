import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "terms" */ '../views/Login.vue')
  },
  {
    path: '/file',
    name: 'File',
    component: () => import(/* webpackChunkName: "privacy" */ '../views/File.vue'),
    meta: {
      authRequired: true
    }
  },
  { 
    path: '*',
    name: 'FourOFour',
    component: () => import(/* webpackChunkName: "404" */ '../views/FourOFour.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    const userAuth = localStorage.getItem('user');
    if (userAuth !== 'fake@example.com') {
      next({
        path: '/',
        query: { redirect: 'noAuth' }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
