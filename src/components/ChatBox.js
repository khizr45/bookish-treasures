import React from 'react'
import './ChatBox.css'
import {Inbox} from './messages/Inbox'

function ChatBox() {
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
