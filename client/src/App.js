import React,{useEffect, useRef,useState} from 'react'
import { BrowserRouter,Routes,Route, } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import SetAvatar from './pages/SetAvatar';
import Call from './pages/Call';
import { io } from 'socket.io-client';
import { host } from './utils/APIRoutes';

import CallAnswer from './pages/CallAnswer';

export default function App() {

  const [myStreme,setMyStreme] = useState(null)

  const socket = useRef()
  useEffect(()=>{

    socket.current = io(host)
  
  },[])



  const iceConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.relay.metered.ca:80",
      },
      {
        urls: "turn:a.relay.metered.ca:80",
        username: "650f76d9dd8224a9af1ba00c",
        credential: "yiemxruOaAmNMgOb",
      },
      {
        urls: "turn:a.relay.metered.ca:80?transport=tcp",
        username: "650f76d9dd8224a9af1ba00c",
        credential: "yiemxruOaAmNMgOb",
      },
      {
        urls: "turn:a.relay.metered.ca:443",
        username: "650f76d9dd8224a9af1ba00c",
        credential: "yiemxruOaAmNMgOb",
      },
      {
        urls: "turn:a.relay.metered.ca:443?transport=tcp",
        username: "650f76d9dd8224a9af1ba00c",
        credential: "yiemxruOaAmNMgOb",
      },
    ]
}
const peer =  new RTCPeerConnection(iceConfiguration)



  
  return (
  


    <BrowserRouter>
  
    <Routes>
     <Route path='/' element={<Chat socket={socket} setMyStreme={setMyStreme} />} />
     <Route path='/login' element={<Login/>} />
     <Route path='/register' element={<Register/>} />
     <Route path='/setAvatar' element={<SetAvatar/>} />
     <Route path='/Call' element={<Call socket={socket} iceConfiguration={iceConfiguration} peer={peer} />} />
     <Route path='/CallAnswer' element={<CallAnswer peer={peer} socket={socket}  myStreme={myStreme}/>} />
    </Routes>
 
     </BrowserRouter>


     
  )
}


// "editor.semanticHighlissghting.enabled": false