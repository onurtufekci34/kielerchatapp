import Messages from './Messages'
import Input from './Input'

export default function Chat() {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>Nora</span>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}
