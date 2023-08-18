import React from "react";
import ProfileStyle from "../style/style-component/ProfileStyle";
function Profile(props){



return(

    <ProfileStyle image ={props.image} >
<div className={`profile-container ${props.customPic ?" selected":""}`}>
  
  <div className="profile-pic">

  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-person-fill ${props.customPic ?"bye":""}`} viewBox="0 0 16 16">
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
  </svg>


</div>
<div className="profile-selecter">


<div className="photo">
<input type="file"  onChange={(e) =>{ props.setCustomPic(true);
   props.setSelectedAvatar("customPic"); 
   props.handleProFile(e);
  
   
   }} accept="image/*"/>
<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-camera-fill " viewBox="0 0 16 16">
  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
</svg>

</div>
</div>

</div>

    </ProfileStyle>
)
}

export default Profile