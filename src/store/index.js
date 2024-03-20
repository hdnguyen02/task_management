import {defineStore} from 'pinia'
export default defineStore('main', {
    state: () => { 
        return { 
            credential: null, // chứa thông tin đăng nhập người dungf
        }
    },
    getters: {
        getCredential(state) { 
            return state.credential
        }, 
    }, 
    actions: {
        setCredential(user) { 
            if (user == null) { 
                this.credential = null
            } 
            else {
                this.credential = { 
                    email: user.email, 
                    uid: user.uid,
                    displayName: user.displayName
                }
            }
        }
    },
  })