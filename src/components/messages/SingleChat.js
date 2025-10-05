import { useEffect, useState } from 'react';
import styles from './SingleChat.module.css';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import io from 'socket.io-client'
import { NavBar } from '../Home';
export const SingleChatLogo = () => {
  return (
      <div
        className={styles.chatWindow}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
        </div>
      </div>
  );
};

export const SingleChat = () => {
    let user = useSelector(state=>state.user)
    const [mess,setMess] = useState([
    ])
    const socket = io("https://bookish-treasures-backend.onrender.com/")
    socket.on('newMess',(newMessage,send,recv)=>{
        setMess(prevItems => [...prevItems,{sender:'admin',message:newMessage}])
    })
    const [SenderMessage,setSenderMessage] = useState('')
    console.log(user)
    async function getMessages(){
      const response = await fetch("https://bookish-treasures-backend.onrender.com/get/message/history",{
              method:'POST',
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({user})
          });

      const data = await response.json()
      if(data.length != 0){
        setMess([{sender:data[0].sender, message:data[0].message}])
        for(let i=1;i<data.length;i++){
          setMess(prevItems=>[...prevItems,{sender:data[i].sender,message: data[i].message}])
        }
      }
    }
    useEffect(()=>{
            socket.emit('userOnline',user)
            getMessages()
    },[])

    function newSenderMessage(){
        if(SenderMessage!=''){
            setMess(prevItems => [...prevItems,{sender:user,message:SenderMessage}])
            socket.emit('userSendMessage',SenderMessage,user,'admin')
            setSenderMessage('')
        }
    }
  return (
    <div>
        <NavBar/>
      <div className={styles.chatWindow}>
        <div className={styles.chatDiv}>
          <div className={styles.chatHeader}>
            <div className={styles.chatAvatar}>
              <h4>
                CS
              </h4>
            </div>
            <div>
              <h4 className={styles.headingg}>Customer Suport Bookish Treasures</h4>
            </div>
          </div>
          <div className={styles.messages}>
            {/* // Messages will be displayed here */}
            {mess.map((message)=>{
                return(
                    <>
                        <div
                        className={message.sender === 'admin'
                            ? styles.message
                            : styles.userMessage
                        }
                        >
                        <div className={styles.messageAvatar}>
                            <h4>{message.sender==='admin' ? 'CS' : user[0].toUpperCase().concat(user[user.length-1].toUpperCase())}</h4>
                        </div>
                        <div
                            className={ message.sender === 'admin'
                                ? styles.messageContent
                                : styles.userMessageContent
                            }
                        >
                            <p>{message.message}</p>
                        </div>
                        </div>
                    </>
                );
            })}
          </div>
          <div ></div>
          <div className={styles.newMessage}>
            <input
                value={SenderMessage}
              type="text"
              placeholder="Type a message"
              className={styles.input}
              onChange={(e)=>{setSenderMessage(e.target.value)}}
            />
            <button className={styles.sendButton} onClick={newSenderMessage}>
              <SendIcon sx={{ size: 22 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};