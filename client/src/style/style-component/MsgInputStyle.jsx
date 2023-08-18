import theme from '../theme'
import styled from 'styled-components'


const MsgInputStyle = styled.div`


.input-msg{
   @media only screen and (max-width: 500px) {

/* for Contact show */
 
 position: fixed;
 left: 30%;
 bottom:1.3rem;
 width: 70%;
 /* test */
 /* left: 6%;
 bottom:0.8rem;
 width: 94%; */
 ${props => props.contactHidden &&`left: 6%;
 bottom:0.8rem;
 width: 94%; `  } 
}
 position: fixed;
 bottom: 1.4rem;
 left: 39%;
 width: 59%;
 height: 3.2rem;

 border-radius: 2rem;
 display: flex;
 justify-content: center;


gap: 0.2rem;
input{
 width:  80%;
background-color: ${(props)=>props.userThemeDark? theme.color.back7:theme.color.blue3};
border: none;
border-radius: 2rem;
color: white;
font-size: 1.4rem;
&:focus{
 outline: 0;
}
&::placeholder{
padding: 0.4rem;
}
}
 .emoji-btn{
  cursor: pointer;
width: 7%;
border-radius: 2rem;
font-size: 1.7rem;
background-color: transparent;
color: white;
backdrop-filter: blur(5px);

border-color: ${(props)=>props.userThemeDark? `#ffffff93` :theme.color.pattern.themeBlue};
.EmojiPickerReact{
   background-color:black;
 position:absolute;
 top:-450px;


 box-shadow: 5px 5px 10px ${ (props)=>props.userThemeDark? theme.color.pattern.themeGreen :theme.color.pattern.themeBlue };
 --epr-search-input-bg-color:transparent;

  --epr-category-label-bg-color: transparent;
  
  .epr-search{
   border: 0.1px solid ${ (props)=>props.userThemeDark? theme.color.pattern.themeGreen :theme.color.pattern.themeBlue };
}




}



 }
 .send-btn{
    cursor: pointer;
   width: 13%;
   border-radius: 2rem;
   font-size: 1.5rem;
   background-color: transparent;
color: white;
backdrop-filter: blur(5px);
border-color: ${(props)=>props.userThemeDark? `#ffffff93` :theme.color.pattern.themeGreen};

 }
} 
`
export default MsgInputStyle