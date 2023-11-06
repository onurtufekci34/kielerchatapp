import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyBCnEExO6F_YOcn7InKwm8rfr2RFOz93lw",
    authDomain: "modern-react-redux-59868.firebaseapp.com",
    projectId: "modern-react-redux-59868",
    storageBucket: "modern-react-redux-59868.appspot.com",
    messagingSenderId: "751393476795",
    appId: "1:751393476795:web:14a0e6f1fabc366a5e999e"
  };

  const app = initializeApp(firebaseConfig)


  export const auth = getAuth(app)
  export const storage =getStorage(app)