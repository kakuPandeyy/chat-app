import React from 'react'
import styled from 'styled-components'
export default function Swich({setuserThemeDark}) {

  return (
	<StyledSwich>
	<label className="switch">
  <input type="checkbox" onChange={(event)=>setuserThemeDark(event.target.checked)} />
  <span className="slider"></span>
</label>
	</StyledSwich>
  )
}

const StyledSwich = styled.div`
position: absolute;
bottom: 15%;
left: 15px;
@media (min-width: 501px) and (max-width: 800px) {
 
}
@media only screen and (max-width: 500px) {

/* for Contact show */
bottom: 50%;
margin-left:60%;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
 input{
	opacity: 3px;
  width: 1px;
  height: 1px;
 }
 .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #27d6cabb;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
  &::before{
	border-radius: 50%;
	position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  }
}
}


input:checked + .slider {
  background-color: #ccc;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}




`