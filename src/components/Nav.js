import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <nav>
        <NavLink to="/" className="nav-link">
          Noughts & Crosses
        </NavLink>
        <NavLink to="/connect4" className="nav-link">
          Connect 4
        </NavLink>
      </nav>
    );
  }
}

export default Nav;
