import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import theme from '../style/theme'
import peeer from '../servies/peeer'
import {MdCallEnd} from "react-icons/md"
import { useNavigate } from 'react-router-dom';
import {BsMicFill} from "react-icons/bs"
import {FaVideo} from "react-icons/fa"

export default function CallAnswer({socket,myStreme}) {


  const [callDiaing,setCallDialing] = useState(false)

const [remoteStreme,setRemoteStreme] = useState(null)




const navigation = useNavigate()
  

              const handleTracks = async (ev)=>{
               console.log("also working");
               const remoteStream = await ev.streams
              await setRemoteStreme(remoteStream[0])
           console.log("handleTracks", ev);
            console.log(peeer.peer);
            setCallDialing(true)
                }    
   const socketWork = async()=>{
    try {
      socket.current.on("peer:incoming:nego",async(data)=>{
      console.log(data.data.offer);
      const ans = await peeer.getAnswer(data.data.offer)
      socket.current.emit("nego:incoming:accepted",{ans:ans,to:data.daillerSocketId})
      })
    } catch (error) {
      console.log("answer nego err" ,error);
    }
   }      
  
                              
 useEffect(()=>{

  
  socketWork()
peeer.peer.ontrack = handleTracks
peeer.peer.onclose = ()=>{
  alert("connection closed")
}
peeer.peer.oniceconnectionstatechange = async function() {
  if(peeer.peer.iceConnectionState === 'disconnected') {
    alert("disconnected peer")
    navigation("/")
  }else{
    console.log(peeer.peer.iceConnectionState);
  }
}
return ()=>{  
  peeer.peer.removeEventListener("track",handleTracks)

}


},[])
       

const disconnectButton = ()=>{
  peeer.peer.close()
  navigation("/")
}
useEffect(()=>{
  if (remoteStreme!==null) {
    setCallDialing(true)
  }

  console.log("remoteStreme",remoteStreme);
},[remoteStreme])

    
  return (
    <CallStyle> 
      <div className='remotePerson'>
 
    { remoteStreme!==null  ?   <ReactPlayer width="100%" height="100%" playing="false" url={remoteStreme} />:<h1>sorry not ava</h1> }

    </div> 
   
    

   <div className="disconnect" onClick={disconnectButton}> 
   <MdCallEnd/>
   </div>
   <div className="mic" > <BsMicFill/></div>
   <div className="video" > <FaVideo/> </div>
   <div className="cover"></div>
    <div className="localPerson">
 
    {myStreme?<ReactPlayer width="250px" height="250px" playing="false" url={myStreme} muted="true" />:<h1>sorry not avalaable</h1>}</div>

     </CallStyle>
  )
}
const CallStyle = styled.div`

.localPerson{
 position: absolute;
bottom: 3rem;
right: 1rem;

}
.remotePerson{
    position: absolute;
    z-index: -9;
    top: 0px;
    height: 75%;
    width: 100%;
    background: #232526;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.disconnect{
  position: absolute;
  height: 100px;
  width: 100px;
  border-radius: 100%;
  background-color: #FF6666;
  bottom: 5%;
left: 10%;
font-size: 2rem;
color: white;
display: flex;
justify-content: center;
align-items: center;
border: 2px dotted white;
}
.cover{
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -10;

  background: #232526;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.video{
  position: absolute;
  height: 100px;
  width: 100px;
  border-radius: 100%;
  bottom: 5%;
left: 50%;
font-size: 2rem;
color: white;
display: flex;
justify-content: center;
align-items: center;
&:hover{
  color: red;
}
}
.mic{
  position: absolute;
  height: 100px;
  width: 100px;
  border-radius: 100%;
  bottom: 5%;
left: 30%;
font-size: 2rem;
color: white;
display: flex;
justify-content: center;
align-items: center;
&:hover{
  color: red;
}
}
.dialing{

font-size: 5rem;
font-weight: bolder;
position: absolute;
    z-index: -1;
    top: 0px;
    height: 75%;
    width: 100%;
display: flex;
justify-content: center;
align-items: center;
background: #232526;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
color: aliceblue;
}
`