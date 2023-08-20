import React,{useState , useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import ReactPlayer from "react-player"
import peeer from '../servies/peeer';
import {MdCallEnd} from "react-icons/md"
import {BsMicFill} from "react-icons/bs"
import {FaVideo} from "react-icons/fa"

export default function Call({socket}) {
 
  const [callDiaing,setCallDialing] = useState(false)
const [myStreme,setMyStreme] = useState(null)
const [remoteStreme,setRemoteStreme] = useState(null)
const [callingStatus,setCallingStatue] = useState("...")
const [callingData,setCallingData] = useState()
const [signalingStable, setSignalingStable] = useState(false)

  const navigation = useNavigate()
  
 async function handleAnswerAccpectedEmiter(data){

  

 try {
  
  
    
    
    await setSignalingStable(true)
    console.log("now signalingState is",signalingStable  );
    await peeer.setLocalDescription(data.answer)
    

    


 
  

 } catch (error) {
  console.log("ok 2");
  console.log( data.answer );
  console.log( "handleAnswerAccpectedEmiter", error);
 }
  
 }

  async function handleAnwer() {
    /*   answer:accpected:emiter */ 
    
    try {
      socket.current.on("answer:accpected:emiter",handleAnswerAccpectedEmiter)

      return ()=>{
socket.current.off("answer:accpected:emiter",handleAnswerAccpectedEmiter)
      }
    } catch (error) {
      console.log(error);
      console.log("radha2");
    }
    
    }


  // async  function handleCall  (){

  
  // try {
   
  //   const offer = await peer.createOffer()
    
  //   peer.setLocalDescription(offer)
  
   
  // } catch (error) {
  //   console.log(error);
  //   console.log("nhi hua")
  // }
  
  


  // }

const handleConnectionCheck = (data)=>{
  setCallingStatue(data.status)
      setCallingData(data)
      console.log("change");
}

async function statusCheck() {

 
  try {
    await socket.current.on("connection:check",handleConnectionCheck)

    return ()=>{
       socket.current.off("connection:check",handleConnectionCheck)

    }
    
  } catch (error) {
    console.log("stat check");
    navigation("/")
  }
  
}

  const socketToConnection = async()=>{
    try {
      if (socket) {
        statusCheck()
       
    }
    } catch (error) {
      console.log("socketToConnection");
      navigation("/")
    }
    
  }
  

  const sendStreme = async (streme)=>{
    const tracks = await streme.getTracks()
   for(const track of tracks){
    peeer.peer.addTrack(track,streme)
 console.log("stream",track,streme);
  }
  

  }



    const getLocalMedia = async ()=>{
        const streme = await navigator.mediaDevices.getUserMedia({
           audio:true,
           video:true,
        })
        const offer = await peeer.getOffer()

        socket.current.emit("outgoing:call",{offer:offer,callingData:callingData})
        console.log("ok1");
        sendStreme(streme)
        setMyStreme(streme)
        console.log("only print one time radha ");
          handleAnwer()  
        
          }
           const handleNegotiotionneeded = async ()=>{
            try {
              console.log("ok2");
              const offer = await peeer.getOffer();
              console.log("negatiotion offer done");
              socket.current.emit("peer:nego:needed", { offer:offer});
              socket.current.on("nego:incoming:final",async(data)=>{
             await peeer.setLocalDescription(data.data.ans)
  console.log(peeer.peer);
              })
            } catch (error) {
              console.log("negatiotion offer not done", error);
            }
           
           }

           
          useEffect(() => {
            peeer.peer.addEventListener("track", async (ev) => {
              const remoteStream = ev.streams;

             
              setRemoteStreme(remoteStream[0]);
              
            });
          }, []);

  useEffect(()=>{
    console.log( " only one");
    socketToConnection()
    getLocalMedia()

    peeer.peer.addEventListener("negotiationneeded", handleNegotiotionneeded);
    peeer.peer.oniceconnectionstatechange = function() {
      if(peeer.peer.iceConnectionState === 'disconnected') {
         alert("disconnected peer")
         navigation("/")
      }else{
        console.log(peeer.peer.iceConnectionState);
      }
  }
return ()=>{   

  peeer.peer.removeEventListener("negotiationneeded", handleNegotiotionneeded);
}
    

  },[])



 function handleRejectShow() {
  setCallingStatue("rejected")
 }

useEffect(()=>{
  statusCheck() 
socket.current.on("reject:show",handleRejectShow) 
return ()=>{
  socket.current.off("reject:show",handleRejectShow) 
}
},[])


useEffect(()=>{
  
  if (remoteStreme!==null) {
    setCallDialing(true)
  }

  console.log("remoteStreme",remoteStreme);
},[remoteStreme])
             
const disconnectButton = async()=>{



  peeer.peer.close()

  navigation("/")
}
       
const handleMuteAudio = ()=>{

}
const handleMuteVideo = ()=>{

}
 


  return (
    <CallStyle> 
    {callDiaing &&  <div className='remotePerson'>
 
    { remoteStreme  ?   <ReactPlayer width="100%" height="100%" playing="false" url={remoteStreme} />:<h1>sorry not ava</h1> }

    </div> 
   
    }

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
border-radius: 10%;

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
@media only screen and (max-width: 600px) {
  height: 90px;
  width: 90px;
  bottom: 3%;
  left: 1%;
}
}
.remotePerson{
    position: absolute;
    z-index: -1;
    top: 0px;
    height: 75%;
    width: 100%;
    overflow: hidden;
    background: #232526;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

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
@media only screen and (max-width: 600px) {
  height: 50px;
  width: 50px;
  bottom: 3%;
}
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
@media only screen and (max-width: 600px) {
  height: 50px;
  width: 50px;
  bottom: 3%;
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
color: aliceblue;
background: #232526;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
`
// if (pc.addTrack !== undefined) {
//   pc.ontrack = (ev) => {
//     ev.streams.forEach((stream) => doAddStream(stream));
//   };
// } else {
//   pc.onaddstream = (ev) => {
//     doAddStream(ev.stream);
//   };
// }