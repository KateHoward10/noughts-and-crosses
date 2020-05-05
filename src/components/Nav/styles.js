import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin: 5px;
  @media screen and (min-width: 800px) {
    transform: rotate(-90deg);
  }
`;

export const NavBar = styled.nav`
  background-color: indigo;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  @media screen and (min-width: 800px) {
    flex-direction: column;
  }
  
`;