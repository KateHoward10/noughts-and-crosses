import styled from "styled-components";

export const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Toggle = styled.label`
  width: 60px;
  height: 36px;
  border-radius: 18px;
  background-color: lightgrey;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px;
  box-shadow: inset 0 0 5px grey;
  justify-content: ${props => (props.firstOptionSelected ? "flex-start" : "flex-end")};
`;

export const Hidden = styled.input`
  display: none;
`;

export const Slider = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 3px;
  box-shadow: 0 0 5px grey;
  background-color: ${props => props.firstOptionSelected ? "yellow" : "red"};
`;