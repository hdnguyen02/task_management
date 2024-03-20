import { createWebHistory, createRouter } from 'vue-router'
import SignIn from '../view/SignIn.vue'
import Home from '../view/Home.vue'

const routes = [
  { 
    path: '/sign-in', 
    name:'SignIn',
    component: SignIn
  },
  { 
    path: '/', 
    name: 'Home', 
    component: Home
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router