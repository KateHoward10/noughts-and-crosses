import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavBar = styled.nav`
  background-color: indigo;
`;

export const Link = styled(NavLink)`
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  margin: 5px;
  @media screen and (min-width: 800px) {
    transform: rotate(-90deg);
  }
`;

export const LinkContainer = styled.div(({ isOpen }) =>`
  display: ${isOpen ? 'flex' : 'none'};
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  @media screen and (min-width: 800px) {
    display: flex;
  }
`);

export const SmallMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  @media screen and (min-width: 800px) {
    display: none;
  }
`;

export const MenuIcon = styled.div`
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  margin: 5px;
`;