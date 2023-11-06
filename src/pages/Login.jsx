


export default function Login() {
  return (
   <div className='formContainer'>
    <div className="formWrapper">
        <span className='logo'>Kieler Chat App</span>
        <span className="title">Sign up Page</span>
        <form action="">
          
          <input required type="text" placeholder='Your E-Mail' />
          <input required type="text" placeholder='Your Password'/>
         
          <button>Login</button>
        </form>
        <p>
        If you don not have a membership <a href="">Sign up</a>
        </p>
        
    </div>
   </div>
  )
}
