import React, { useState } from 'react';

const Tile = ({ ships, tile, selectingWater }) => {
  const thisShip = ships.find(ship => ship.includes(tile));
  const [selected, setSelected] = useState(null);

  function setTile() {
    setSelected(selectingWater ? '~' : 'O');
  }

  return (
    <div className="tile" onClick={setTile}>
      {selected}
    </div>
  );
};
export default Tile;
