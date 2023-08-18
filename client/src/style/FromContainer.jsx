import styled from "styled-components";
const FormContainer =  styled.div`

height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
 background-color: #1d1d36;
 

 @media only screen and (max-width:500px) {
   overflow-y: scroll;
}
.log-btn{
  display: flex;
justify-content: center;
align-items: center;
  position: absolute;
  top: 6%;
  right: 6%;
  z-index: 99;
  background: linear-gradient(
    rgba(7, 251, 202, 0.6),
        #0dbfe3
    );
    height: 4.5rem;
    width: 4.5rem;
    border-radius: 50%;
    color: white;
    &:hover{
      box-shadow: 0 0 40px rgba(7, 251, 202, 0.6);
    }
}

.brand{
  img{
    height: 5rem;
  }
  margin-top: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px, 20px;
  gap: 1.7rem;

}
form{
 
  display: flex;
  gap: 2rem;
  flex-direction: column;
 border-radius: 3rem;
 backdrop-filter: blur(5px);
  background-color: rgba(8, 254, 225, 0.13);
 box-shadow: 0 0 4000px rgba(7, 251, 202, 0.6);
  padding: 3rem 5rem;
  @media only screen and (max-width:500px) {
    padding: 1.3rem 2.5rem;
}
  h1{
    color: rgba(7, 251, 202, 0.6);
    font-size: 3.5rem;
  }
 input{
  background-color: transparent;
  color: white;
  width: 100%;
 padding: 0.3rem 2.8rem;
 height: 2.4rem;
 border-radius: 0.6rem;
 border:2px solid rgba(13, 180, 192, 0.6);
 font-size: 1rem;
 &:focus{
  box-shadow: 0 0 40px rgba(7, 251, 202, 0.6);
  outline: none;
  background-color: transparent;
 }
 &:-webkit-autofill {

     -webkit-background-clip: text;
     -webkit-text-fill-color: white !important;
}
 }
}

`
export default FormContainer