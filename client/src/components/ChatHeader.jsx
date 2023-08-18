import React,{useContext,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import theme from '../style/theme'
import {ReciveMsg} from "../pages/Chat"
import {FiPhoneCall} from "react-icons/fi"


export default function ChatHeader({contact,welcome,userThemeDark,socket,currentUserId}) {
  

  const localData=   JSON.parse(localStorage.getItem("chat-app-user")) 


const daillerToReciverData =  {
  "dailler_id":currentUserId,
  "daillerName":localData.username,
  "reciver_id":contact[welcome]._id,
  "reciverName":contact[welcome].username,
}



const {contactHidden} = useContext(ReciveMsg)
  const navigate = useNavigate()
  const handleCall = ()=>{
    navigate(`/Call`)
  
socket.emit("dialing:call",daillerToReciverData)

  }

  return (
    <HeaderStytle userThemeDark={userThemeDark} welcome={welcome} contact={contact} contactHidden={contactHidden} > 

        <div className="contact-pic"></div>
        <div className="contact-username">{contact[welcome].username}</div>
        <div className='callMoblie' onClick={()=>{  handleCall()  }} > 
        <FiPhoneCall className=' call'/>
        </div>
 </HeaderStytle>

  )
}

const HeaderStytle = styled.div`
width: 77%;
height: 8rem;

border-radius: 1em 4em;
position: fixed;
top: 50px;
left: 39%;
display: flex;
align-items: center;
.callMoblie{
color: green;
position: relative;
left: 20em;
 top: 10px;
 cursor: pointer;
 .call{
  height: 50px;
  width: 50px;
 }

}
@media (min-width: 501px) and (max-width: 800px) {
overflow: hidden;
}
@media only screen and (max-width: 500px) {

/* for Contact show */



position: fixed;
left: 25%;
top: 10px;

border-radius: 2rem;
height: 6rem;
//test

/* 
left: 12%;
top: 10px;

border-radius: 2rem;
height: 6rem;
width: 88%; */
${props => props.contactHidden &&`left: 12%;
top: 10px;
border-radius: 2rem;
height: 6rem;
width: 88%; `  } 
}

background-color: ${ props => props.userThemeDark?theme.color.back4:theme.color.blue3};
.contact-pic{
    height: 6.5rem;
    width: 6.5rem;
    border: 4px outset ${ props => props.userThemeDark? `#ffffff93` :theme.color.pattern.themeGreen};
    position: relative;
    left: 7em;
    top: 10px;
    border-radius: 4rem;
    @media (min-width: 501px) and (max-width: 800px) {
      left: 7px;
    top: 10px;
}
@media only screen and (max-width: 500px) {

/* for Contact show */
height: 5rem;
width: 5rem;
left: 4em;
top: 10px;
}


    background-image: url(${ props => props.contact[props.welcome].myProfile? `${ props.contact[props.welcome].avatarImage}`:`data:image/svg+xml;base64,${ props.contact[props.welcome].avatarImage}`});
    background-size: cover;
    background-position: center;
}
.contact-username{
color:white;
font-weight:600;
font-size:2rem;
position: relative;
left: 7em;
 top: 10px;
 @media (min-width: 501px) and (max-width: 800px) {
      left: 2rem;
    top: 10px;
}
@media only screen and (max-width: 500px) {

/* for Contact show */

left:6rem;
top: 10px;
}

}
.call{
font-size:2.4rem;
color: #0cd189;
display:flex;
gap: 3rem;
justify-self:flex-end;
align-self:center;
position: relative;
right:33%;
top:44%;
@media (min-width: 501px) and (max-width: 800px) {
  
  position:fixed;
  right:5px;
  top: 50px;


}
 @media only screen and (max-width: 500px) {
position:fixed;
  right:1px;
top: 1px;

} 

}

`
