import React, { useState } from 'react';
import { SeaTile, BitOfShip } from './styles';

function Tile({ ships, tile, selectingWater, initialValue }) {
  const thisShip = ships.find(ship => ship.includes(tile));
  const indexInShip = thisShip ? thisShip.indexOf(tile) : null;
  const solo = thisShip && thisShip.length === 1;
  const position = thisShip
    ? indexInShip === 0
      ? 'start'
      : indexInShip === thisShip.length - 1
      ? 'end'
      : 'middle'
    : null;
  const [selected, setSelected] = useState(initialValue);

  function getDirection() {
    if (position === 'start') {
      return thisShip[indexInShip + 1] - indexInShip === 7 ? 'vertical' : 'horizontal';
    } else if (position === 'end') {
      return indexInShip - thisShip[indexInShip - 1] === 7 ? 'vertical' : 'horizontal';
    }
    return null;
  }

  function setTile() {
    if (initialValue) return;
    if (selected) {
      setSelected(null);
    } else {
      setSelected(selectingWater ? 'water' : 'ship');
    }
  }

  return (
    <SeaTile onClick={setTile} selected={initialValue || selected}>
      {(selected === 'ship' || initialValue === 'ship') && (
        <BitOfShip position={position} direction={getDirection()} solo={solo} />
      )}
    </SeaTile>
  );
}

export default Tile;
