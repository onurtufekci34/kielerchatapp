import Img from '../img/img.png'
import Attach from '../img/attach.png'



export default function Input() {
  return (
    <div className='input'>
      <input type="text" placeholder='write your message' />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{display:"none"}} id='file' />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}
