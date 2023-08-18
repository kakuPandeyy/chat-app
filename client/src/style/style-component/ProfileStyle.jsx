
import styled from 'styled-components'
const ProfileStyle = styled.div`
    .profile-container{
    color: #F1DEC9;
    position: relative;
    
   height: 6.3rem;
   width: 6.3rem;
   
 
  border-radius: 50%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    .profile-pic{
      display: flex;
      justify-content: center;
      
      background-image: url(${(props)=>props.image});
      background-size: cover;
background-position: center;
     .bye{
      opacity: 0;
     }
    }
  .profile-selecter{
color: #FF5F9E;
 
position: absolute;
right: 12px;
bottom: 7px;
z-index: 8;
  

    .photo{
      z-index: 12;
      input[type=file]{
          cursor: pointer;
          position: absolute;
          right: 1px;
          transform: scale(1.3);
            opacity: 0;
           }
      }
    &:hover{
      color: #db4141;
    }
  }
  
  }
`
export default ProfileStyle