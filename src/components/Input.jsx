import {useState,useContext} from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from '../contexts/ChatContext';
import { db,storage } from "../firebase/config";
import { arrayUnion,Timestamp,doc,updateDoc,serverTimestamp} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";



export default function Input() {


  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const {loginUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  
  const handleSend=async ()=>{
    if(img){

      const storageRef = ref(storage,uuid());

      await uploadBytesResumable(storageRef,img).then(()=> {
        getDownloadURL(storageRef).then(async (downloadUrl)=>{
          await updateDoc(doc(db,"chats",data.chatId),{
            messages:arrayUnion({
              id:uuid(),
              text,
              senderId:loginUser.uid,
              date:Timestamp.now(),
              picture:downloadUrl
            })
          })
        })
      })

  
    }else{
      await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:loginUser.uid,
          date:Timestamp.now() 
        })
      })
    }

    await updateDoc(doc(db,"userChats",loginUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text,
      },
      [data.chatId + ".date"]:serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("")
    setImg(null)
  }



  return (
    <div className='input'>
      <input type="text" placeholder='write your message' onChange={(e) => setText(e.target.value)} value={text}/>
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{display:"none"}} id='file' onChange={(e)=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
