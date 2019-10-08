import React, { useState } from 'react';
import Tile from './Tile';

function Sea() {
  const tileSideLength = Math.min(window.innerWidth, window.innerHeight) / 9;
  const [ships, setShips] = useState([]);

  function generateShips() {
    let newShips = [];
    const lengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    for (let i = 0; i < lengths.length; i++) {
      let latestShip = placeShip(lengths[i]);
      newShips.push(latestShip);
    }
    setShips(newShips);
  }

  function placeShip(length) {
    const dir = Math.random() > 0.5 ? 'horizontal' : 'vertical';
    const firstPos =
      dir === 'horizontal'
        ? Math.floor(Math.random() * (9 - length)) + 8 * Math.ceil(Math.random() * 7)
        : Math.floor(Math.random() * (length + 1) * 8);
    let ship = [firstPos];
    for (let i = 1; i < length; i++) {
      ship.push(dir === 'horizontal' ? firstPos + i : firstPos + i * 8);
    }
    return ship;
  }

  return (
    <div className="console">
      <div className="game">
        <div
          className="sea"
          style={{
            gridTemplateColumns: `repeat(8, ${tileSideLength}px)`,
            gridTemplateRows: `repeat(8, ${tileSideLength}px)`
          }}
        >
          {Array.from(Array(64).keys()).map(tile => (
            <Tile key={tile} ship={ships && ships.find(ship => ship.includes(tile))} />
          ))}
        </div>
      </div>
      <div className="controls">
        <button onClick={generateShips}>New Game</button>
      </div>
    </div>
  );
}

export default Sea;
