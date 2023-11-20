import {useContext,useState,useEffect} from 'react'
import {db} from '../firebase/config'
import {doc,onSnapshot} from 'firebase/firestore'
import {AuthContext} from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'


export default function Chats() {


  const [chats, setChats] = useState([])
  const {loginUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)


  useEffect(()=>{
    const getChats =()=>{
      const unsub = onSnapshot(doc(db,"userChats",loginUser.uid),(doc)=>{
        setChats(doc.data())
      })


      return () => {
        unsub()
      }

    }

    loginUser.uid && getChats();
  },[loginUser.uid])


  const handleSelect = (u) =>{
    dispatch({type:"CHANGE_USER",payload:u})
  }




  //console.log(Object.entries(chats))


  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].tarih - a[1].tarih).map(chat=>(
        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInformation)}>
        <img src={chat[1].userInformation.photoURL} alt={chat[1].userInformation.userName} />
        <div className="userChatInfo">
          <span>{chat[1].userInformation.userName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
      ))}
      
    </div>
  )
}
