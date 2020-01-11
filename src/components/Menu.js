import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <div className="menu">
      <NavLink to="/noughts&crosses" className="preview-link">
        Noughts & Crosses
        <img className="preview" src={require('../images/noughts&crosses.png')} alt="Noughts & Crosses" />
      </NavLink>
      <NavLink to="/connect4" className="preview-link">
        Connect 4
        <img className="preview" src={require('../images/connect4.png')} alt="Connect 4" />
      </NavLink>
      <NavLink to="/battleships" className="preview-link">
        Battleships
        <img className="preview" src={require('../images/battleships.png')} alt="Battleships" />
      </NavLink>
    </div>
  );
}

export default Menu;
