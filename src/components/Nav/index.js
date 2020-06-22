import React, { useState } from 'react';
import { NavBar, SmallMenu, LinkContainer, Link, MenuIcon } from './styles';

function Nav() {
  const [isOpen, toggleOpen] = useState(false);
  return (
    <NavBar>
      <SmallMenu>
        <Link to="/">Home</Link>
        <MenuIcon onClick={() => toggleOpen(!isOpen)}>{isOpen ? '✕' : '☰'}</MenuIcon>
      </SmallMenu>
      <LinkContainer isOpen={isOpen} >
        <Link to="/noughts&crosses">
          0s & Xs
        </Link>
        <Link to="/connect4">
          Connect 4
        </Link>
        <Link to="/battleships">
          Battleships
        </Link>
      </LinkContainer>
    </NavBar>
  );
} 

export default Nav;
