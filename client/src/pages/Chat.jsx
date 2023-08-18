import React, { useEffect,useState,useRef }  from 'react'
import { useNavigate } from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {CiLogout} from 'react-icons/ci'
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import logo from "../assets/logo.png";
import axios from 'axios';
import { getContactRouter } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import theme from '../style/theme';
import Swich from '../components/Swich';
import Conntainer from '../style/ChatStyle';
import Welcome from '../components/Welcome'; 
import ChatContainer from './ChatContainer';
import Search from '../components/Search';
import IncomingCall from '../components/IncomingCall';
import {CiMenuBurger} from "react-icons/ci"

export const ReciveMsg = React.createContext() 
export default function Chat({socket,setMyStreme}) {
  const navigate = useNavigate()
  const [userThemeDark,setuserThemeDark] = useState(false)

  const [contact,setContact] = useState([]);
  const [currentUserName,setCurrentUserName] = useState()
  const [currentUserImage,setCurrentUserImage] = useState()
  const [currentUserId,setCurrentUserId] = useState()
  const [myProfile,setMyProfile] = useState()
  const [welcome,setWelcome] = useState()
  const [searchInput,setSearchInput] = useState()
  const [searchFilter, setSearchFilter] = useState(undefined)
  const [ searchOn,setSearchOn ] = useState(false)
  const [arrivalMsg,setArrivalMsg] =useState()

  const [showOnline,setShowOnline] = useState([])
  const  [ contactHidden,setContactHidden] = useState(false)
  const [renderOnline,setRenderOnline] = useState(false)
  const [ openMenu ,setOpenMenu]  =useState(false)
  const [incomingCallStatus,setIncomingCallStatus] = useState(false)
  const [incomingCallData,setIncomingCallData] = useState({})

async function logOut(){
  try {
  await localStorage.removeItem("chat-app-user")
  navigate("/login")
  } catch (error) {
    alert("try again")
  }
 

}


useEffect(()=>{
  setIncomingCallStatus(false)
    if ( !localStorage.getItem("chat-app-user")) {
        navigate("/login")
       }else{
        setUserData()
        async function setUserData(){
try {
  const localData=  await JSON.parse(localStorage.getItem("chat-app-user")) 
  
   setCurrentUserName(localData.username)

  setCurrentUserId(localData._id)
  setCurrentUserImage(localData.avatarImage)
  setMyProfile(localData.myProfile)
  setRenderOnline(true)
  if (localData.avatarImage) {
    
       const data = await axios.get(  `${getContactRouter}/${localData._id}` )
       setContact(data.data.contacts)
       console.log(data.data.contacts);
         }else{
          navigate("/setAvatar")
         }
} catch (error) {

 
}
        }
       }
       console.log(currentUserName);

},[])

useEffect(()=>{
if(searchInput===""){
  setSearchOn(false)
}else{
  const result = contact.filter((per)=>{
    setSearchOn(true)
 return per.username.includes(searchInput)
 
 
  })
  setSearchFilter(result)
}
},[searchInput])


const getSelected = (data)=>{
setWelcome(data)


}

 useEffect(()=>{
if (currentUserId) {
   socket.current.emit("addUser",currentUserId)
   if (socket) {
  
  socket.current.on("showOnline",(onlineData)=>{
     
    setShowOnline(onlineData)


  })
  socket.current.on("incoming:call",(data)=>{

    setIncomingCallStatus(true)
    console.log("radha");
    console.log(data);
    setIncomingCallData(data)
 
  })
 
    socket.current.on("msgRecieve",(msgReciveData)=>{
      setArrivalMsg({ from: msgReciveData.from, fromSelf:false,message:msgReciveData.message})
     
    })
 
  }else{

  }
}
 },[currentUserId,renderOnline])




  return (
  <>
 { incomingCallStatus ? <IncomingCall incomingCallData={incomingCallData} socket= {socket.current} setIncomingCallStatus={setIncomingCallStatus} setMyStreme={setMyStreme} />: 
 <ThemeProvider theme={theme}  >
 <Conntainer currentUserName={currentUserName} currentUserId={currentUserId}  userThemeDark= {userThemeDark} myProfile= {myProfile} currentUserImage={currentUserImage}  contactHidden={contactHidden}  openMenu={openMenu}>
 
 <ReciveMsg.Provider value={ {arrivalMsg,welcome,contactHidden}}>

  <div className="menu-column">


<div className="profile"></div>
<div> <CiLogout className='logOut' onClick={logOut} /></div>
<div><Swich setuserThemeDark={setuserThemeDark} /></div>


  </div>

<div className="brand">
  <img src={logo} alt=""  />
  <h3>chatO</h3>
</div>
  <div className="box">
 <div className="contact" >
  <div className="tital-bar">
  <CiMenuBurger className ="menu" onClick={()=>  setOpenMenu(!openMenu)}/>
  <h2>chat</h2>


  <Search setSearchInput={setSearchInput}/>
  </div>
<div className="contact-list">

 <Contacts contact ={searchOn? searchFilter:contact} openMenu={openMenu} welcome={welcome} searchFilter={searchFilter} getSelected={getSelected} userThemeDark={userThemeDark} searchInput={searchInput} showOnline={showOnline} currentUserId={currentUserId} setContactHidden={setContactHidden}/>
</div>

 </div>
<div className="chat">

<AiOutlineDoubleLeft className='contactShower' onClick={()=>setContactHidden(false)}/>
  {welcome===undefined?<Welcome currentUserName ={currentUserName}  />
  :
  <ChatContainer className="chatContainer" contact={contact} welcome={welcome} userThemeDark={userThemeDark} currentUserId={currentUserId} socket={socket.current} arrivalMsg={arrivalMsg} />  }

 
</div>

 </div>
 </ReciveMsg.Provider>





 </Conntainer>

 </ThemeProvider>}
  </>
  )
}






