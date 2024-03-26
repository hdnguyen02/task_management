import { defineStore } from 'pinia'
import { db } from '../firebase'
import { query, where, collection, getDocs, onSnapshot } from 'firebase/firestore'
export default defineStore('main', {
    state: () => {
        return {
            isLogin: null, // chưa xác định được trạng thái đăng nhập hay chưa
            credential: null, // chứa thông tin đăng nhập người dùng
            boards: null, // thông tin về các boards. 
            isDoneFetchBoards: false
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
        },
        getIsDoneFetchBoards(state) {
            return state.isDoneFetchBoards
        }
    },

    actions: {
        setIsLogin(value) {
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
        handleSignOut() {
            this.credential = null
            this.boards = null
            this.isLogin = false
        },
        async fetchBoards() {
            if (this.boards != null) return
            console.log("fetch boards")
            this.boards = {}
            const uid = this.credential.uid
            const boardsRef = collection(db, 'boards')

            const q = query(boardsRef, where('members', "array-contains", uid))

            // lắng nghe sự kiện
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                
                        this.boards[change.doc.id] = { 
                            ...change.doc.data()
                        }
                    }
                    if (change.type === "modified") {
                        // update lại. 
                        this.boards[change.doc.id] = change.doc.data()
                    }
                    if (change.type === "removed") {
                        delete this.boards[change.doc.id]
                    }
                });
                this.isDoneFetchBoards = true
            });
        }
    },

})