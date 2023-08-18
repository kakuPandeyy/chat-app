
import React ,{ useState } from 'react';
import FormContainer from '../style/FromContainer';
import logo from "../assets/logo.png";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {registerRoute} from "../utils/APIRoutes"

import Button from '../style/Button';
function Register() {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    username:'',
    email:'',
    password:'',
  confirmPassword:''
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
    const {  username,email,password} = values
    try {
      const {data} = await axios.post(registerRoute,{username,email,password}).then(console.log("submit to go"))
       if (data.status) {
        localStorage.setItem("chat-app-user",JSON.stringify(data.user));
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
    const {  username,email,password,confirmPassword} = values
 
   
      if (password!==confirmPassword) {
        toast.error("password & confirm password should be same",toastOptions)
        return false
      } else if (email===''){
        toast.error("email is requried",toastOptions)
        return false
      }else if (password.length<6){
        toast.error("password should be greater then 6 digits",toastOptions)
        return false
      }else if (username.length<3){
        toast.error("user name should have more then 3 charecter",toastOptions)
        return false
      }
      else{
        return true
      }
     
      
   
   }
  return (
    < >



    <FormContainer>
     <Link to='/login' > <div className='log-btn'>log In</div> </Link>


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

type="email"
placeholder='Email'
name='email'
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
<input

type="password"
placeholder=' confirm password'
name='confirmPassword'
onChange={(event)=>{
  handleChange(event)
}}
/>
<Button type="submit"> Create User </Button>

    </form>
 
    </FormContainer>
    <ToastContainer/>
    
     </>
  )
}


export default Register