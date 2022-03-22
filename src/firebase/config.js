import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC14twFyO4zw81rHr60iHk0G_6GWdN7Rfk",
    authDomain: "thedojosite-ff394.firebaseapp.com",
    projectId: "thedojosite-ff394",
    storageBucket: "thedojosite-ff394.appspot.com",
    messagingSenderId: "392495321237",
    appId: "1:392495321237:web:f2f3c31c45f69348f20b9c"
  };
  
//   init firebase
const app = initializeApp(firebaseConfig)

//   init firestore database
const db = getFirestore(app)

// init firebase storage
const storage = getStorage(app)

// export default db


export {db, storage}