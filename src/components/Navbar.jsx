import {useContext} from 'react'
import { auth } from '../firebase/config'
import {signOut} from 'firebase/auth'
import {AuthContext} from '../contexts/AuthContext'



export default function Navbar() {

  const {loginUser} = useContext(AuthContext)



  return (
    <div className="navbar">
      <span className="logo">Kieler Chat</span>
      <div className="user">
        <img
          src={loginUser.photoURL}
          alt=""
        />

        <span>{loginUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Log out</button>
      </div>
    </div>
  );
}
