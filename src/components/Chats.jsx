import {useContext,useState,useEffect} from 'react'
import {db} from '../firebase/config'
import {doc,onSnapshot} from 'firebase/firestore'
import {AuthContext} from '../contexts/AuthContext'



export default function Chats() {


  const [chats, setChats] = useState([])
  const {loginUser} = useContext(AuthContext)


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


  console.log(Object.entries(chats))


  return (
    <div className="chats">
      {Object.entries(chats)?.map(chat=>(
        <div className="userChat" key={chat[0]}>
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
