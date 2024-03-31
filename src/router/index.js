import { createWebHistory, createRouter } from 'vue-router'

import Home from '../view/Home.vue'
import Boards from "../view/Boards.vue"
import Tasks from "../view/Tasks.vue"
import PageNotFound from '../view/PageNotFound.vue'
import { auth } from '../firebase'

const routes = [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('../view/SignIn.vue'), 
  },
  {
    path: '/sign-up', 
    name: 'SignUp', 
    component: () => import('../view/SignUp.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/boards',
    name: 'Boards',
    component: Boards,
    meta: {
      requiresAuth: true // yêu cầu xác thực
    },
  },
  {
    path: '/contact', 
    name: 'Contact',
    component: import('../view/Contact.vue')
  },
  {
    path: '/setting',
    name: 'Setting', 
    component: () => import('../view/Setting.vue'),
    meta: {
      requiresAuth: true 
    }
  }, 
  {
    path: '/boards/:idBoard',
    name: 'Tasks',
    component: Tasks,
    meta: {
      requiresAuth: true 
    }
  }, 
  {
    path: '/reset-password', 
    name: 'ResetPassword',
    component: () => import('../view/ResetPassword.vue')

  },
  {
    path: '/:catchAll(.*)', 
    name: 'PageNotFound', 
    component: () => import('../view/PageNotFound.vue')
  }, 
 

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const user = auth.currentUser
  if (requiresAuth && !user) next('/')
  else next()
})

export default router