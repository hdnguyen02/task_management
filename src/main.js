import { createApp } from 'vue'
import { createPinia } from 'pinia'
import mainStore from './store/index.js'
import router from './router/index.js'
import './index.css'
import App from './App.vue'
import {auth} from "./firebase"
import {onAuthStateChanged} from "firebase/auth"

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
const useStore = mainStore()



onAuthStateChanged( auth, user => {
  if (user) {
    useStore.setIsLogin(true)
    useStore.setCredential(user)  
    
  } else {
    useStore.handleSignOut()
  }
})
  









