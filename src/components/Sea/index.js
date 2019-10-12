import React, { useState } from 'react';
import Tile from '../Tile';

function Sea() {
  const tileSideLength = Math.min(window.innerWidth, window.innerHeight) / 9;
  const [ships, setShips] = useState([]);
  const [numbers, setNumbers] = useState([[], []]);

  function generateShips() {
    let newShips = [];
    const lengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    for (let i = 0; i < lengths.length; i++) {
      let latestShip = placeShip(lengths[i], newShips.flat());
      newShips.push(latestShip);
    }
    setShips(newShips);
    let topNumbers = [];
    let sideNumbers = [];
    for (let i = 0; i < 8; i++) {
      topNumbers.push(newShips.flat().filter(part => part % 8 === i).length);
      sideNumbers.push(newShips.flat().filter(part => Math.floor(part / 8) === i).length);
    }
    setNumbers([topNumbers, sideNumbers]);
  }

  function placeShip(length, existingShips) {
    const dir = Math.random() > 0.5 ? 'horizontal' : 'vertical';
    const firstPos =
      dir === 'horizontal'
        ? Math.floor(Math.random() * (9 - length)) + 8 * Math.ceil(Math.random() * 7)
        : Math.floor(Math.random() * (length + 1) * 8);
    let ship = [firstPos];
    for (let i = 1; i < length; i++) {
      ship.push(dir === 'horizontal' ? firstPos + i : firstPos + i * 8);
    }
    function isTooClose(ship) {
      let adjacentTiles = [...ship];
      if (dir === 'horizontal') {
        adjacentTiles.push(
          ...(ship[0] > 7 ? ship.map(part => part - 8) : []),
          ...(ship[0] < 56 ? ship.map(part => part + 8) : []),
          ...(ship[0] % 8 !== 0 ? [ship[0] - 9, ship[0] - 1, ship[0] + 7] : []),
          ...(ship[ship.length - 1] % 8 !== 7
            ? [ship[ship.length - 1] + 9, ship[ship.length - 1] + 1, ship[ship.length - 1] - 7]
            : [])
        );
      } else {
        adjacentTiles.push(
          ...(ship[0] % 8 !== 0 ? ship.map(part => part - 1) : []),
          ...(ship[0] % 8 !== 7 ? ship.map(part => part + 1) : []),
          ...(ship[0] > 7 ? [ship[0] - 9, ship[0] - 8, ship[0] - 7] : []),
          ...(ship[ship.length - 1] < 56
            ? [ship[ship.length - 1] + 9, ship[ship.length - 1] + 8, ship[ship.length - 1] + 7]
            : [])
        );
      }
      return adjacentTiles.some(tile => existingShips.indexOf(tile) >= 0);
    }
    if (isTooClose(ship)) {
      ship = placeShip(length, existingShips);
    }
    return ship;
  }

  return (
    <div className="console">
      <div className="sea-game">
        <div
          className="sea"
          style={{
            gridTemplateColumns: `repeat(8, ${tileSideLength}px)`,
            gridTemplateRows: `repeat(1, ${tileSideLength / 2}px)`
          }}
        >
          {numbers[0].map((number, index) => (
            <div key={index} className="number">
              {number}
            </div>
          ))}
        </div>
        <div className="inner-sea">
          <div
            className="sea"
            style={{
              gridTemplateColumns: `repeat(1, ${tileSideLength / 2}px)`,
              gridTemplateRows: `repeat(8, ${tileSideLength}px)`
            }}
          >
            {numbers[1].map((number, index) => (
              <div key={index} className="number">
                {number}
              </div>
            ))}
          </div>
          <div
            className="sea"
            style={{
              gridTemplateColumns: `repeat(8, ${tileSideLength}px)`,
              gridTemplateRows: `repeat(8, ${tileSideLength}px)`
            }}
          >
            {Array.from(Array(64).keys()).map(tile => (
              <Tile key={tile} tile={tile} ships={ships} />
            ))}
          </div>
        </div>
      </div>
      <div className="controls">
        <button onClick={generateShips}>New Game</button>
      </div>
    </div>
  );
}

export default Sea;
