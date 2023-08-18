import theme from '../style/theme'
import styled from 'styled-components'


const StyledContacts = styled.div`
  
display: flex;
gap: 3rem;
flex-direction: column;
transition: 0.7s ease-in-out;

@media only screen and (max-width: 500px) {


text-align: center;
gap:4rem;

}
.selected-chat{


  background: ${props =>props.userThemeDark? `linear-gradient(0.09turn, ${theme.nextLevel.bluie}, ${theme.nextLevel.bluie2}, ${theme.color.pattern.themeBlue},${theme.color.pattern.themeBlue})`:`linear-gradient(to right, #99f2c8, #1f4037);` };
box-shadow: 1px 1px 1px #9ae7d0;
transition: 0.7s ease-in-out;
@media (min-width: 501px) and (max-width: 800px) {
  box-shadow: 0px 0px 20px #9ae7d0;
  border:  8px groove #03fbffd3;
}
@media (max-width: 500px)  {
  box-shadow: 0px 0px 20px #9ae7d0;
  border:  8px groove #03fbffd3;
}

}

.contact-container{
border: 2px solid ${theme.color.pattern.themeBlue};


.onlineIndicator{
color:#ff5601e9;
font-size:1.5rem;
position:absolute;
right:15px;
@media (min-width: 501px) and (max-width: 800px) {
  right:4px;
  bottom:0.3px;
  font-size:2.3rem;
  color:#ff5601e9;
}
@media (max-width: 500px)  {
  right:4px;
  bottom:0.3px;
  font-size:2rem;
  color:#ff5e01e9;
}
}

color: white;
height: 5.8rem;
width: 100%;
border-radius: 1rem 3rem;
display: flex;
flex-direction: row;
gap: 4rem;
justify-content: center;
align-items: center;
transition: 0.7s ease-in-out;
position:relative;
@media (min-width: 501px) and (max-width: 800px) {
  border-radius: 50%;
  position: relative;
  
}


img{
  display: flex;
  max-height: 8.4rem;
  width: 33%;
justify-self: flex-start;
border-radius: 54%;
@media (min-width: 501px) and (max-width: 800px) {
position: absolute;
width: 100%;
height: 100%;
}
@media (min-width: 701px) and (max-width: 1050px) {

}
@media only screen and (max-width: 500px) {

/* for Contact show */


}
}
.username{
  display: flex;
 justify-self: flex-end;
 width: 77%;
overflow-y: hidden;
&::-webkit-scrollbar{
height: 0px;
width: 0px;
}
@media (min-width: 501px) and (max-width: 800px) {
display: none;
}
}

&:hover{
border: 2px solid ${theme.color.pattern.themeGreen} ;
}


}

` 
export default StyledContacts