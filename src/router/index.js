import { createWebHistory, createRouter } from 'vue-router'
import SignIn from '../view/SignIn.vue'
import Home from '../view/Home.vue'
import Boards from "../view/Boards.vue"
import Tasks from "../view/Tasks.vue"
import { auth } from '../firebase'



const routes = [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
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
    path: '/boards/:index',
    name: 'Tasks',
    component: Tasks,
    meta: {
      requiresAuth: true // yêu cầu xác thực
    }
  }

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