import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <nav>
        <NavLink to="/noughts&crosses" className="nav-link">
          Noughts & Crosses
        </NavLink>
        <NavLink to="/connect4" className="nav-link">
          Connect 4
        </NavLink>
        <NavLink to="/battleships" className="nav-link">
          Battleships
        </NavLink>
      </nav>
    );
  }
}

export default Nav;
