import Add from '../img/addAvatar.png'
import { useState } from 'react'
import { auth,storage } from '../firebase/config'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'




export default function Register() {


  const [error, setError] = useState(false)
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true)

    const userName = e.target[0].value;
    const email=e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].files[0];

    try {
      const res= await createUserWithEmailAndPassword(auth,email,password)
      //console.log(res)
      const date = new Date().getTime()
      const storageRef = ref(storage,`${userName + date}`)

      await uploadBytesResumable(storageRef,avatar).then(() =>{
        getDownloadURL(storageRef).then(async (downloadURL)=>{
          console.log(downloadURL)
        })
      })

      setLoading(false)



    } catch (error) {
      setError(error.message)
      setLoading(false)
    }


  }







  return (
   <div className='formContainer'>
    <div className="formWrapper">
        <span className='logo'>Kieler Chat App</span>
        <span className="title">Register Page</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder='Your Name' />
          <input required type="text" placeholder='Your E-Mail' />
          <input required type="text" placeholder='Your Password'/>
          <input required style={{display:"none"}} type="file" id='file' />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add Avatar</span>
          </label>
          <button disabled={loading}>to be a Member</button>
          {loading && <span>please wait while process...</span>}
          {error && <p>{error}</p>}
        </form>
        {!loading && <p>
        If you have a membership <a href=""> Log in</a>
        </p>}
        
    </div>
   </div>
  )
}
