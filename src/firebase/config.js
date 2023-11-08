import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyB3oyykPrd61Ea6rZWuq8POx-FqKYKsge0",
  authDomain: "react-chatapp-30766.firebaseapp.com",
  projectId: "react-chatapp-30766",
  storageBucket: "react-chatapp-30766.appspot.com",
  messagingSenderId: "891314053253",
  appId: "1:891314053253:web:3a3c8ae5e6a070670089ec"
};

  const app = initializeApp(firebaseConfig)


  export const auth = getAuth(app)
  export const storage =getStorage(app)
  export const db = getFirestore(app)