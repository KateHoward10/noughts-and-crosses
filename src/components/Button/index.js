import styled from 'styled-components';

const Button = styled.button(({ colour }) =>`
  background-color: ${colour || 'green'};
  color: ${colour === 'yellow' ? '#000' : '#fff'};
  font-family: 'Orbitron', sans-serif;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  border: 2px solid black;
  padding: 5px;
  margin: 5px;
  -webkit-backface-visibility: hidden;
  &:hover {
    box-shadow: 0 0 1px 1px grey;
    transform: scale(0.95);
  }
`);

export default Button;