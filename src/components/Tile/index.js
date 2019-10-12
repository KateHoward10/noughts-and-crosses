import React, { useState } from 'react';
import { SeaTile } from './styles';

function Tile({ ships, tile, selectingWater, initialValue }) {
  const thisShip = ships.find(ship => ship.includes(tile));
  const [selected, setSelected] = useState(initialValue);

  function setTile() {
    if (initialValue) return;
    if (selected) {
      setSelected(null);
    } else {
      setSelected(selectingWater ? 'water' : 'ship');
    }
  }

  return <SeaTile onClick={setTile} selected={initialValue || selected} />;
}

export default Tile;
