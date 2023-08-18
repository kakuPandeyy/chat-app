import theme from "./theme";
import styled from "styled-components";

//userthemdark
//myProfile
//currentuser
//contactHidden
const Conntainer = styled.div`
background-color: ${props => props.userThemeDark? theme.color.back7 :theme.color.blue1 };
height: 100vh;
width: 100vw; 
position: relative;


.menu-column{
width: 7vw;
height: 100vh;
position: absolute;
left: 0px;
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
@media only screen and (max-width: 500px) {
  //test
    /* display: none; */
  
   
   top: 0%;
   width: 100vw;
   height: 2rem;
   z-index: -10;
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   height:100%;
   /* openMenu */


   ${props => props.openMenu&& `   z-index: 10;
   backdrop-filter: blur(60px);
   `}
  
}
z-index: 10px;
.logOut{
  cursor: pointer;
  font-size: 2em;
  color: #57C5B6;
}
.profile{
height: 75px;
width: 75px;
border: 2px double ${props => props.userThemeDark? theme.color.back1: theme.color.pattern.themeGreen};
position: fixed;
top: 16vh;
border-radius: 50%;
background-image: url(${ props=> props.myProfile? props.currentUserImage :`data:image/svg+xml;base64,${props.currentUserImage}`});
background-position: center;
background-size: cover;

@media (min-width: 501px) and (max-width: 800px) {

}
}

}

.brand{
  position: absolute;
  width: 100vw;
  height: 4vh;
  top: 0px;
  @media only screen and (max-width: 500px) {
    display: none;

}
  background-color: ${(props)=>props.userThemeDark? theme.color.back7 :theme.color.blue2 };
  z-index: 7;
  display: flex;
  flex-direction: row;
  img{
    height: 2.5rem;
  }
 h3{
margin-top: 5px;
color: white;
 }
}
  .box{
height: 97vh;
width: 92.5vw;
position: absolute;
  bottom: 0px;
  right: 0px;
display: grid;

grid-template-columns: 26% 74%;
grid-template-columns: 26% 74%;
gap: 2.8rem;

@media only screen and (max-width: 500px) {


    height: 100vh;
width: 100vw;
   

grid-template-columns: 23% 77%;
gap :0rem;

// test 
 grid-template-columns: 100% 0%;
//1
//TEST



}

.contact{

    user-select:none;
position: relative;
background-color:${ props => props.userThemeDark? theme.color.back4 :theme.color.blue3 };
border-radius: 3rem 5rem;
@media only screen and (max-width: 500px) {
  border-radius: 0rem;
  //test
  ${props => props.contactHidden&& `display: none;`  }
}
padding: 1rem;
overflow-y: scroll;
 max-height: auto;
 &::-webkit-scrollbar { /* WebKit */
  width: 0;
  height: 0;
}


.tital-bar{
margin-top: 40px;
  display: flex;
 justify-content: flex-start;
 flex-direction: column;
 margin-left:1rem;
 gap: 1.7rem;
 .menu{
  display:none;
 }
 @media only screen and (max-width: 500px) {

  flex-direction: row;
  .menu{
  height:2rem;
  display:flex;
  color:green;
  position:absolute;
  top:10px;
  left:10px;
  font-weight:100px;
  font-size:25px;
  cursor: pointer;
  ${props => props.openMenu&& `   z-index: 20;
  
   `}
 }
}
 h2{
 
  color: white;
 font-size: 3rem;
 align-self: flex-start;
 margin-left: 2px;
 margin-top:2.5rem;
 @media only screen and (max-width: 500px) {
font-size:3.5rem;
align-self: flex-start;
 margin-left: 0px;
 padding:0;


}
 }
 .threeDot{
  display:none;
 }
 @media only screen and (max-width: 500px) {
margin-bottom: 5rem;
.threeDot{
  display:inline-block;
  color: #57C5B6;
 font-size:1.6rem;
  position: absolute;
  top:15px;
  right: 2px;
 }

}
  

 
}
.contact-list{
 height: 100%;
 width: 90%;
margin-top: 4.8vh;
margin-left: 11px;
cursor:pointer;
transition: 0.6 ease-out;

}
}

.chat{
  background-color: ${props => props.userThemeDark? theme.color.back2 :theme.color.blue4 };
  border-radius: 5rem 3rem;
  overflow-y: scroll;
  position: relative;
  ${props => !props.contactHidden &&`  display:none; `  } 
.contactShower{


display:none;
@media screen and (max-width: 500px){

  color:green;
  position:fixed;
  top:30px;
left:0px;
z-index:10;
height:3rem;
width:7%;
 ${props => props.contactHidden &&`  display:flex; `  } 
}
}
  
  &::-webkit-scrollbar {
  width: 0;
  height: 0;
}

@media screen and (max-width: 500px){
  border-radius:0.5rem;
  //test
  /* position:fixed;
  height:100%;
  width:100%; */
 ${props => props.contactHidden &&`position:fixed;
  height:100%;
  width:100%; `  } 
}
}

}


`
export default Conntainer


