import theme from '../theme'
import styled from 'styled-components'


const StyleChatDisplay = styled.div`


 @media only screen and (max-width: 500px) {

/* for Contact show */
 
margin-top: 5rem;
margin-right: 0.3rem;
height: 90vh;

}
margin-top: 10rem;
margin-right: 3.7rem;

height: 74vh;
padding: 1rem 0rem 0rem 4rem;
overflow-x: hidden;
overflow-y: scroll;
flex-direction: column;
@media only screen and (max-width: 800px) {

/* for Contact show */

padding: 1rem 0rem 0rem 1.2rem;
}
gap: 1.2rem;
&::-webkit-scrollbar{
  height: 0px;
  width: 0px;
}
.lastSpace{
  position: relative;
  width: 100%;
 bottom: 10px;
 height: 4.5rem;
 display: flex;
 @media only screen and (max-width: 500px) {

  height: 5rem;

}
}
.message{
  display: flex;
overflow-wrap: break-word;
align-items: center;

margin-top:  1.5rem ;


.content{
   padding: 1rem;
   font-size: 1.3rem;
   border-radius: 1rem;
  }
}
.sender{
  display: flex;
justify-content: flex-end;

  .content{

   color: white;

background: #16222A; 
background: -webkit-linear-gradient(to right, #3A6073, #16222A);  
background: linear-gradient(to right, #3A6073, #16222A); 

} 
}
.reciver{
  align-self: flex-end;
  justify-content: flex-start;
 
  .content{
    color: white;

    background: #2980b9; 
background: -webkit-linear-gradient(to right, #2c3e50, #2980b9); 
background: linear-gradient(to right, #2c3e50, #2980b9); 

  }
  
}
`
export default StyleChatDisplay