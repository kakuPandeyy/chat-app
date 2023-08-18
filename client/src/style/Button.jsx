
import styled from "styled-components";


const Button = styled.button`
    padding: 1rem 2rem;
  background-color: rgb(29, 155, 183);
  font-size: 1.3rem;
  border-radius: 1.4rem;
  color: white;
  transition: 1s ease-in-out;
  position: relative;
  

  &:hover{
    background-color: rgba(7, 251, 202, 0.6);
    transition: 0.5s ease;
    bottom: 2.5px;}
`
export default Button;