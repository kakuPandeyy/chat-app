import React,{useEffect, useState,useContext} from 'react'

import { BsEmojiWink } from 'react-icons/bs'
import {BsSend}  from 'react-icons/bs'
import axios from 'axios'
import EmojiPicker from 'emoji-picker-react';
import MsgInputStyle from "../style/style-component/MsgInputStyle"
import { AddMsgRouter,ShowMsgRouter } from '../utils/APIRoutes'
import {ReciveMsg} from "../pages/Chat"



export default function MsgInput({socket,userThemeDark,currentUserId,welcome,contact,msgAndStore}) {
  const [msgDataStore,setmsgDataStore]= useState([])

  const {arrivalMsg,contactHidden} = useContext(ReciveMsg)



  useEffect(()=>{
   
    const getChat = async()=>{
      const msgData = await axios.post(ShowMsgRouter,{
        from: currentUserId,
        to:contact[welcome]._id
      })
     
      setmsgDataStore(msgData.data)

    }
  
   getChat()
 

  
    },[welcome])

    useEffect( ()=>{

    const reciveMsg = async ()=>{
        const reviceShow = [...msgDataStore]

  await  arrivalMsg&&

  await arrivalMsg.from===contact[welcome]._id&&
  reviceShow.push(arrivalMsg) 
  setmsgDataStore(reviceShow)


 

  
      }
     
      reciveMsg()
      
    },[arrivalMsg])

    msgAndStore(msgDataStore)
   


    const [visiableEmo,setVisiableEmo] = useState(false)
    const [msg,setMsg]= useState('')



async function sendMsg(){
  try {
    await socket.emit("sendMsg",{
      from:currentUserId,
      to:contact[welcome]._id,
      message:msg
    })
  
  } catch (error) {
    console.log(error)
  }


 
const sendingMsg  = await axios.post(AddMsgRouter,{
  from:currentUserId,
  to:contact[welcome]._id,
  message:msg
})
if (sendingMsg) {

  setMsg("")
}



const mges = [...msgDataStore]
mges.push({fromSelf:true,message:msg})

setmsgDataStore(mges)


}



 
  function handleEmojiShower(){
setVisiableEmo(!visiableEmo)
  }
function pickEmoji(emoji ,event){
var message = msg;
message += emoji.emoji;
setMsg(message)


}
  return (
 
    <MsgInputStyle  userThemeDark={userThemeDark} contactHidden={contactHidden} >
     
    <div className=' input-msg'>

      <button className='emoji-btn'  >
        <BsEmojiWink onClick={handleEmojiShower} />
      {visiableEmo &&  <EmojiPicker onEmojiClick={pickEmoji}  Theme='dark' />}  
        </button>
      
      <input type="text" placeholder=' type a message' onChange={(e)=>{ setMsg(e.target.value) }} value={msg} />
      <button className='send-btn' onClick={sendMsg} ><BsSend/></button>
      
    </div>
    </MsgInputStyle>
   
  )
}
