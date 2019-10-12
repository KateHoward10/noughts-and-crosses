import React, { useState } from 'react';
import { SeaTile, BitOfShip } from './styles';

function Tile({ ships, tile, selectingWater, initialValue, selectAsShip, unselectAsShip }) {
  const thisShip = ships.find(ship => ship.includes(tile));
  const indexInShip = thisShip ? thisShip.indexOf(tile) : null;
  const solo = thisShip && thisShip.length === 1;
  const position =
    thisShip && !solo ? (indexInShip === 0 ? 'start' : indexInShip === thisShip.length - 1 ? 'end' : 'middle') : null;
  const [selected, setSelected] = useState(initialValue);

  function getDirection() {
    if (position === 'start') {
      return thisShip[1] - tile === 7 ? 'vertical' : 'horizontal';
    } else if (position === 'end') {
      return tile - thisShip[indexInShip - 1] === 7 ? 'vertical' : 'horizontal';
    }
    return null;
  }

  function setTile() {
    if (initialValue) return;
    if (selected) {
      setSelected(null);
      if (selected === 'ship') unselectAsShip(tile);
    } else {
      setSelected(selectingWater ? 'water' : 'ship');
      if (!selectingWater) selectAsShip(tile);
    }
  }

  return (
    <SeaTile onClick={setTile} selected={initialValue || selected}>
      {(initialValue === 'ship' || selected === 'ship') && (
        <BitOfShip position={position} direction={getDirection()} solo={solo} />
      )}
    </SeaTile>
  );
}

export default Tile;
