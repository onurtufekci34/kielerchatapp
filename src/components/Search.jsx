import { useState } from "react"
import { db } from "../firebase/config"
import { collection,query,where,getDocs } from "firebase/firestore"





export default function Search() {

  const [searchUser, setSearchUser]= useState("")
  const [user , setUser] = useState(null)
  const [error,setError] = useState(false)

  const handleSearch = async ()=> {
    const q = query(collection(db,"users"),where("userName","==",searchUser))


    try {
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach(doc => {
        setUser(doc.data())
      })
    } catch (error) {
      setError(error)
    }




  }

  const handleKey = (e)=>{
    e.code === "Enter" && handleSearch()
  }






  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Member Search"  onKeyDown={handleKey} onChange={(e)=> setSearchUser(e.target.value)} value={searchUser}/>
      </div>
      {error && <span>User not found</span>}
     {user && <div className="userChat">
        <img src={user.photoURL}
           alt="" />
           <div className="userChatInfo">
            <span>{user.userName}</span>
           </div>
      </div>}
    </div>
  )
}
