import React ,{ useEffect, useState } from 'react'
import axios  from 'axios';
import {useNavigate } from "react-router-dom";

import { Buffer } from 'buffer';
import loader from "../assets/loader.gif";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRouter } from '../utils/APIRoutes';

import Button from '../style/Button';
import Profile from '../components/Profile';
import AvatarStyle from '../style/AvatarStyle';


export default function SetAvatar() {

  

 const avatarApi = "https://api.multiavatar.com/";
//  
const [avatar,setAvatar] = useState([]);
const [loading,setLoading] = useState(true);
const [selectedAvatar,setSelectedAvatar] = useState(undefined);
const [file,setFile] = useState();
const [customPic,setCustomPic] = useState(false);
const [image, setImage] = useState()

  const navigate = useNavigate();




  async function handleProFile(e){
    try {
    
    await setFile(e.target.files[0])
    setImage(URL.createObjectURL(e.target.files[0]));
 
   

    } catch (error) {
    
    }
    

  }

 const convertBase64 = (img) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(img)
      fileReader.onload = () => {
       resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
        toast.error(" please try again",toastOptions)
      }
    })
  }

  const toastOptions = {
  position: "bottom-right",
  autoClose:5000,
  pauseOnHover: true,
  theme:"dark",
  draggable:true,

  }


  async  function setProfilePic() {
    if (selectedAvatar===undefined) {
      toast.error("please select your profile avatar",toastOptions)
    }
    else if(selectedAvatar==="customPic"){

 const base64Flie = await convertBase64(file)

 const user = await JSON.parse(localStorage.getItem("chat-app-user"))
 const {data} = await axios.post(setAvatarRouter, {
  id:user._id,
  image:base64Flie,
  setStatus:user.isAvatarImageSet,
  custom:true
 } )

 
 if (data.setStatus&&  data.userData.avatarImage ) {
  
  await localStorage.setItem("chat-app-user",JSON.stringify(data.userData))
  await navigate("/")

   }else{
    setProfilePic()
   }

    }
    
    else{
      
    const user = await JSON.parse(localStorage.getItem("chat-app-user"))
 const {data} = await axios.post(setAvatarRouter, {
  id:user._id,
  image:avatar[selectedAvatar],
  custom:false
 } )
 
    if (data.setStatus && data.userData.avatarImage) {
  
    await localStorage.setItem("chat-app-user",JSON.stringify(data.userData))
    
    navigate("/")
  
  

 }else{
  setProfilePic()
}

    }
  }

  

useEffect(()=>{
 
  


  async function fetchData(){
try{
  if (!localStorage.getItem("chat-app-user")) {
    navigate("/login")
  }
  const data = [];
   try{
  for (let i = 0; i < 1; i++) {
   
    const image = await axios.get(`${avatarApi}/${Math.round(Math.random()*1000)}?${process.env.REACT_APP_AVATAR_URL}`)
    const buffer = new Buffer(image.data)
   data.push(buffer.toString("base64"))
   setAvatar(data)
   
  }
  setLoading(false)
}catch{
  setLoading(false)
}
  


 
}catch(ex){

}
   
  }
  fetchData()
  fetchData()
},[])




  return (
    <>
 {loading? <AvatarStyle>
<img src={loader} alt="loading" />
 </AvatarStyle> :
 ( <AvatarStyle >
 
  <div className="container">
 <div className='titleContainer'>
 <h1> pick up your avatar</h1>
 
 </div>
<div className="avatars">



{avatar.map((avatar,index)=>{
return(
 <div
 key={index}
  className={`avatar ${selectedAvatar===index? "selected":""}`}>
<img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" 
onClick={()=>{
setSelectedAvatar(index)
setCustomPic(false)
setImage("")
}} />
 </div>
)
})}

<Profile customPic={customPic} 
setCustomPic ={setCustomPic} 
setSelectedAvatar={setSelectedAvatar}
 image={image}
  handleProFile= {handleProFile}/>

</div>

<Button onClick={setProfilePic} className='selectAvatar' > select your avatar </Button>
 </div>

 </AvatarStyle>)
 }
<ToastContainer/>
  

    </>

  )
}





// 

// 

// 
// 
// 

// 
// function SetAvatar() {

// // const setProfilPicture = async ()=>{

// // }

// // const bufffer  = new Bufffer();

  

//   return (
//     < >


// <h1>  hello world </h1>

    
//      </>
//   )


// }

 