
import { getAuth, signOut } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app"




const firebaseConfig = {
    apiKey: "AIzaSyAZxmSzIXXvQiC3odv7dwVjMV7zViO6RKQ",
    authDomain: "to-do-list-6df6b.firebaseapp.com",
    projectId: "to-do-list-6df6b",
    storageBucket: "to-do-list-6df6b.appspot.com",
    messagingSenderId: "530857484392",
    appId: "1:530857484392:web:3f1dff74e4edfddfd75bdd"
  }

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)



  export { 
    auth, db
  }

  