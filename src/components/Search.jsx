import { useState, useContext } from "react"
import { db } from "../firebase/config"
import { collection,query,where,getDocs,getDoc,doc,updateDoc,serverTimestamp, setDoc } from "firebase/firestore"
import {AuthContext} from '../contexts/AuthContext'





export default function Search() {

  const [searchUser, setSearchUser]= useState("")
  const [user , setUser] = useState(null)
  const [error,setError] = useState(false)

  const {loginUser} =useContext(AuthContext)

  const handleSearch = async ()=> {
    const q = query(collection(db,"users"),where("userName","==",searchUser))


    try {
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach(doc => {
        setUser(doc.data())
      })
    } catch (error) {
      setError(true)
    }




  }

  const handleKey = (e)=>{
    e.code === "Enter" && handleSearch()
  }



const handleSelect = async ()=>{
    const combinedId = loginUser.uid>user.uid ? loginUser.uid +user.uid : user.uid + loginUser.uid;


    try {
      
      const res = await getDoc(doc(db,"chats", combinedId))

      if(!res.exists())

        await setDoc(doc(db,"chats",combinedId),{messages:[]})

        await updateDoc(doc(db,"userChats", loginUser.uid),{
          [combinedId + ".userInformation"]:{
            uid:user.uid,
            userName:user.userName,
            photoURL:user.photoURL
          },
          [combinedId + ".date"]:serverTimestamp()
        });

        await updateDoc(doc(db,"userChats", user.uid),{
          [combinedId + ".userInformation"]:{
            uid:loginUser.uid,
            userName:loginUser.displayName,
            photoURL:loginUser.photoURL
          },
          [combinedId + ".date"]:serverTimestamp()
        });

    } catch (error) {
      
    }

    setUser(null)
    setSearchUser("")
}


  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Member Search"  onKeyDown={handleKey} onChange={(e)=> setSearchUser(e.target.value)} value={searchUser}/>
      </div>
      {error && <span>User not found</span>}
     {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL}
           alt={user.userName} />
           <div className="userChatInfo">
            <span>{user.userName}</span>
           </div>
      </div>}
    </div>
  )
}
