import React from 'react'
import robo from "../assets/robot.gif"
import RoboSty from '../style/style-component/RoboSty'
export default function Welcome({currentUserName}) {
 
  return (
    <RoboSty>
     
        <img src={robo} alt="" />
         <h1> welcome  {currentUserName}</h1>
         <span>select the person you want to chat</span>
        
     
    </RoboSty>
   
  )
}

