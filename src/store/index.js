import {defineStore} from 'pinia'
import {db} from '../firebase'
import { query, where,collection, getDocs   } from 'firebase/firestore'
export default defineStore('main', {
    state: () => { 
        return {
            isLogin: null, // chưa xác định được trạng thái đăng nhập hay chưa
            credential: null, // chứa thông tin đăng nhập người dùng
            boards: null, // thông tin về các boards. 
        }
    }, 
    getters: {
        getIsLogin(state) { 
            return state.isLogin
        },
        getCredential(state) { 
            return state.credential
        }, 
        getBoards(state) { 
            return state.boards
        }
    }, 
    
    actions: {
        setIsLogin(value){
            this.isLogin = value
        },
        setCredential(user) { 
            if (user === null) { 
                this.credential = null
            } 
            else {
                this.credential = { 
                    email: user.email, 
                    uid: user.uid,
                    displayName: user.displayName
                }
            }
        }, 
        async fetchBoards() { 
            if (this.boards != null) return 
            console.log("fetch boards")
            this.boards = []
            const uid = this.credential.uid
            const boardsRef = collection(db, 'boards')

            const q = query(boardsRef, where('members',"array-contains", uid)) 
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                this.boards.push(doc.data())
            }) 
        }
    },
    
  })