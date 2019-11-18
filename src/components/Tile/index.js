import React from 'react';
import { SeaTile, BitOfShip } from './styles';

function Tile({
  ships,
  tile,
  selectingWater,
  initialValue,
  selectAsShip,
  unselectAsShip,
  selectAsWater,
  unselectAsWater,
  selected,
  completed,
  mouseDown,
  toggleMouseDown
}) {
  const thisShip = ships.find(ship => ship.includes(tile));
  const indexInShip = thisShip ? thisShip.indexOf(tile) : null;
  const solo = thisShip && thisShip.length === 1;
  const position =
    thisShip && !solo ? (indexInShip === 0 ? 'start' : indexInShip === thisShip.length - 1 ? 'end' : 'middle') : null;

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
      selected === 'ship' ? unselectAsShip(tile) : unselectAsWater(tile);
    } else {
      selectingWater ? selectAsWater(tile) : selectAsShip(tile);
    }
  }

  return (
    <SeaTile
      onMouseDown={() => {
        toggleMouseDown(true);
        setTile();
      }}
      onMouseUp={() => toggleMouseDown(false)}
      onMouseEnter={() => {
        if (mouseDown) setTile();
      }}
      selected={initialValue || selected}
    >
      {(initialValue === 'ship' || selected === 'ship') && (
        <BitOfShip
          position={position}
          direction={getDirection()}
          solo={solo}
          visible={initialValue === 'ship'}
          completed={completed}
        >
          {!initialValue && !completed && '?'}
        </BitOfShip>
      )}
    </SeaTile>
  );
}

export default Tile;
