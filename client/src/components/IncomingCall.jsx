import React, { useState } from 'react'
import styled from 'styled-components'
import {MdCallEnd} from "react-icons/md"
import {FiPhoneCall} from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import peeer from '../servies/peeer'

 
export default  function IncomingCall({socket,setIncomingCallStatus,incomingCallData,setMyStreme}) {


  const navigation = useNavigate()

 
  const sendStreme = async (streme)=>{

  const tracks = await streme.getTracks()
for(const track of tracks){
  await peeer.peer.addTrack(track,streme)
 console.log("i am donw");
}

}



        const getLocalMedia = async ()=>{
          try {
            const streme = await navigator.mediaDevices.getUserMedia({
              audio:true,
              video:true,
           })
           sendStreme(streme)
           setMyStreme(streme)
           
          } catch (error) {
            console.log(error);
          }
           
              }

  async function handleAnswer(){
  try {
    await getLocalMedia()
  const answer = await peeer.getAnswer(incomingCallData.data.offer)

   await  socket.emit("answer:accpected",{answer})
  
   navigation('/CallAnswer')
  } catch (error) {
    console.log(error);
  
  }
 
 
 }
 



 async function callRejected() {
    if (socket) {
      try {
      
        await  socket.emit("call:rejected",{dailerId:"dd"})
     

      } catch (error) {
        console.log("not done");
      }
   
      setIncomingCallStatus(false)
    }else{
      console.log("krishna");
    }


  }
  return (
    <IncomingCallStyle> 
    <div className='profile'> {incomingCallData.daillerName}  </div>
    <div className='button-accept' onClick={handleAnswer} ><FiPhoneCall/></div>
    <div className='button-reject' onClick={callRejected} ><MdCallEnd/></div>
     </IncomingCallStyle>
  )
}
const IncomingCallStyle = styled.div`
background: #16222A;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #3A6073, #16222A);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #3A6073, #16222A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
height: 100vh;
width: 100%;

.profile{
  position: absolute;
  top: 15%;
  left: 44%;
  height: 200px;
  width: 200px;
  font-size: 4rem;
  color: white;
}
.button-accept{
  position: absolute;
display: flex;
justify-content: center;
align-items: center;
  color: white;
  background: #4CB8C4;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #3CD3AD, #4CB8C4);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #3CD3AD, #4CB8C4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
height: 100px;
 width: 100px;
 bottom: 15%;
 right: 25%;
 border-radius: 100%;
 font-size: 3rem;
}
.button-reject{
  position: absolute;
  display: flex;
justify-content: center;
align-items: center;
  color: white;
height: 100px;
 width: 100px;
 font-size: 3rem;
 background: #FF512F;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #F09819, #FF512F);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #F09819, #FF512F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
bottom: 15%;
left: 25%;
border-radius: 100%;
}

`