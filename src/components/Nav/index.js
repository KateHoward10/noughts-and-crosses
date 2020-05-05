import React, { Component } from 'react';
import { NavBar, Link } from './styles';

class Nav extends Component {
  render() {
    return (
      <NavBar>
        <Link to="/noughts&crosses">
          0s & Xs
        </Link>
        <Link to="/connect4">
          Connect 4
        </Link>
        <Link to="/battleships">
          Battleships
        </Link>
      </NavBar>
    );
  }
}

export default Nav;
