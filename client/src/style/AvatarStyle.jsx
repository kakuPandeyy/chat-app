import styled from "styled-components"

 
const AvatarStyle = styled.div`



height: 100vh;
width: 100vw;

 display: flex;
 justify-content: center;
 align-items: center;
 background-color: #1d1d36;
 flex-direction: column;
 @media only screen and (max-width: 415px) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;


     }




 
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4rem;
  padding: 50px;
  background-color: rgba(8, 254, 225, 0.13);
  border-radius: 3rem;
  padding: 5rem;
  backdrop-filter: blur(5px);
  border:  0.2rem double #03fbffd3;
  box-shadow: 0 0 5000px #03fbffd3;
  @media only screen and (max-width: 415px) {
  max-width: 290px;
  padding: 30px;
  gap: 2.6rem;
  overflow: hidden;

}
.titleContainer{
  display: flex;
 justify-content: center;
 
  h1{
  color: white;
  text-align: center;
 }
 }

 .avatars{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  transition: 3s ease-out;
  @media only screen and (max-width: 415px) {
    grid-template-columns: 1fr 1fr ;
    gap: 2.4rem;
}

  }
 
  .selected{
   box-shadow: 0 0 50px rgba(7, 251, 202, 0.6);
   border:  0.4rem groove #03fbffd3;
  }
 .avatar{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
 
  img{
    height: 6rem;
 
    
  }
 }
}
  `



export default AvatarStyle