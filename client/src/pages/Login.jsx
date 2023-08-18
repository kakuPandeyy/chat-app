
import React ,{  useState } from 'react';
import FormContainer from '../style/FromContainer';
import logo from "../assets/logo.png";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {logInRouter} from "../utils/APIRoutes"

import Button from '../style/Button';

function LogIn() {
  const navigate = useNavigate();



  const [values,setValues] = useState({
    username:'',
    password:'',
  
  })
  const toastOptions = {
  position: "bottom-right",
  autoClose:5000,
  pauseOnHover: true,
  theme:"dark",
  draggable:true,

  }

   const handleSubmit = async (event)=>{
    event.preventDefault();
  if (handleValidtion()) {
    const {  username,password} = values
    try {
      const {data} = await axios.post(logInRouter,{username,password}).then(console.log("submit to go"))
       if (data.status) {
       await localStorage.setItem("chat-app-user",JSON.stringify(data.user));
        navigate("/")
       }else{
        toast.error(data.msg,toastOptions)

       }
    } catch (error) {
      console.log(error)
    }
    
    
  }
    
   }

   const handleChange = (event)=>{
 setValues({...values,[event.target.name]:event.target.value})
   }
   const handleValidtion = ()=>{
    const {  username,password} = values
 
   
      if (username==='') {
        toast.error("username is requried",toastOptions)
        return false
      } else if ( password===''){
        toast.error(" password is requried",toastOptions)
        return false
      }
      else{
        return true
      }
     
      
   
   }
  return (
    < >



    <FormContainer>
 
     <Link to='/register' > <div className='log-btn'>  Sign Up </div> </Link>


    <form onSubmit={(event)=>{
   handleSubmit(event)
    }}> 
  
  <div className="brand">
<img src={logo} alt="" />
 <h1>chatO</h1>
  </div>


<input

type="text"
placeholder='User Name'
name='username'

onChange={(event)=>{
  handleChange(event)
}}
/>

<input

type="password"
placeholder='passworld'
name='password'

onChange={(event)=>{
  handleChange(event)
}}
/>

<Button type='sumbit'> Log in </Button>

    </form>
 
    </FormContainer>
    <ToastContainer/>
    
     </>
  )
}


export default LogIn