import theme from '../theme'
import styled from 'styled-components'


const SearchStyle = styled.input`
 @media only screen and (max-width: 500px) {


display: none;
}
  width: 90%;
  height: 1.7rem;
 margin-left: 8px;
outline: none;
border: 3px solid ${theme.color.pattern.themeBlue};
color: white;
font-size: 1.2rem;
border-radius: 2rem;
border-top: none;
background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search set-search' viewBox='0 0 16 16' fill='%23ffffff' %3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 13px center;
background-position: 88% 0%;

&:focus{
  border: 3px outset rgb(0, 255, 204);
  color: #89bba8;
  border-top: none;
  font-size: 1.3rem;
&::-webkit-search-cancel-button {
display: none;
}


}


`
export default SearchStyle;