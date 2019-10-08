import React from 'react';

const Tile = ({ ships, tile }) => {
  const thisShip = ships.find(ship => ship.includes(tile));
  return <div className="tile">{thisShip && thisShip.indexOf(tile)}</div>;
};
export default Tile;
