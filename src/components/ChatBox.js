import React , {useState} from 'react'
import io from 'socket.io-client'
import './ChatBox.css'
import { NavBar } from './Home';
import {Inbox} from './messages/Inbox'

function ChatBox() {
    const [message,setMessage] = useState('')
    const [sender,setSender] = useState('')
    const [Receiver,setRecv] = useState('')
    let user_id_1 = 'khiz'
    let user_id_2 = 'khizar'
    function messagePass(){
        const socket = io('https://bookish-treasures-backend.onrender.com/')
        socket.emit('userOnline',user_id_1)
        socket.emit('userOnline',user_id_2)
        socket.on('newMess',(mess,send,recv)=>{
          setMessage(mess)
          setSender(send)
          setRecv(recv)
        })
    }
    return (
    <div>
      {/* <NavBar/>
      <div className='chat-main'>
        <div className='chatbox-main'>
          <h4 className='chatheader'>Customer Support Bookish Treasures</h4>
          <div className='messageshold'>
            <h1>Sender: {sender}</h1>
            <h1>Receiver: {Receiver}</h1>
            <h1>Message:{message}</h1>
          </div>
          <div className='message-send-div'>
            <input placeholder='Type your message here' className='message-type'></input>
            <button className='send-btn' onClick={messagePass}><img src='./images/send-btn.png' className='send-btn-img'/></button>
          </div>
        </div>
      </div> */}
      <Inbox />
    </div>
  )
}

export default ChatBox
