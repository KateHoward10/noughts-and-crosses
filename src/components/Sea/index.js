import React, { useState, useEffect } from 'react';
import Tile from '../Tile';

function Sea() {
  const tileSideLength = Math.min(window.innerWidth, window.innerHeight) / 8;
  const [ships, setShips] = useState([]);
  const [numbers, setNumbers] = useState([[], []]);
  const [selectingWater, toggleSelectingWater] = useState(true);
  const [visiblePositions, setVisiblePositions] = useState([]);
  const [selectedAsShips, setSelectedAsShips] = useState([]);
  const [message, setMessage] = useState('');

  function generateShips() {
    let newShips = [];
    const lengths = [4, 3, 2, 2, 1, 1, 1];
    for (let i = 0; i < lengths.length; i++) {
      let latestShip = placeShip(lengths[i], newShips.flat());
      newShips.push(latestShip);
    }
    setShips(newShips);
    let randomised = newShips.flat().sort(() => Math.random() - 0.5);
    setVisiblePositions(randomised.slice(-3));
    setSelectedAsShips(randomised.slice(-3));
    let topNumbers = [];
    let sideNumbers = [];
    for (let i = 0; i < 7; i++) {
      topNumbers.push(newShips.flat().filter(part => part % 7 === i).length);
      sideNumbers.push(newShips.flat().filter(part => Math.floor(part / 7) === i).length);
    }
    setNumbers([topNumbers, sideNumbers]);
  }

  function placeShip(length, existingShips) {
    const dir = Math.random() > 0.5 ? 'horizontal' : 'vertical';
    const firstPos =
      dir === 'horizontal'
        ? Math.floor(Math.random() * (7 - length)) + 7 * Math.ceil(Math.random() * 6)
        : Math.floor(Math.random() * length * 7);
    let ship = [firstPos];
    for (let i = 1; i < length; i++) {
      ship.push(dir === 'horizontal' ? firstPos + i : firstPos + i * 7);
    }
    function isTooClose(ship) {
      let adjacentTiles = [...ship];
      if (dir === 'horizontal') {
        adjacentTiles.push(
          ...(ship[0] > 7 ? ship.map(part => part - 7) : []),
          ...(ship[0] < 42 ? ship.map(part => part + 7) : []),
          ...(ship[0] % 7 !== 0 ? [ship[0] - 8, ship[0] - 1, ship[0] + 6] : []),
          ...(ship[ship.length - 1] % 7 !== 7
            ? [ship[ship.length - 1] + 8, ship[ship.length - 1] + 1, ship[ship.length - 1] - 6]
            : [])
        );
      } else {
        adjacentTiles.push(
          ...(ship[0] % 7 !== 0 ? ship.map(part => part - 1) : []),
          ...(ship[0] % 7 !== 7 ? ship.map(part => part + 1) : []),
          ...(ship[0] > 7 ? [ship[0] - 8, ship[0] - 7, ship[0] - 6] : []),
          ...(ship[ship.length - 1] < 42
            ? [ship[ship.length - 1] + 8, ship[ship.length - 1] + 7, ship[ship.length - 1] + 6]
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

  function selectAsShip(index) {
    const newSelected = [...selectedAsShips, index];
    setSelectedAsShips(newSelected);
    if (
      newSelected.sort((a, b) => a - b).join('') ===
      ships
        .flat()
        .sort((a, b) => a - b)
        .join('')
    ) {
      setMessage("That's it, well done!");
    }
  }

  function unselectAsShip(index) {
    setSelectedAsShips(selectedAsShips.filter(selected => selected !== index));
  }

  return (
    <div className="console">
      <div className="sea-game">
        <div
          className="sea"
          style={{
            gridTemplateColumns: `repeat(7, ${tileSideLength}px)`,
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
              gridTemplateRows: `repeat(7, ${tileSideLength}px)`
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
              gridTemplateColumns: `repeat(7, ${tileSideLength}px)`,
              gridTemplateRows: `repeat(7, ${tileSideLength}px)`
            }}
          >
            {Array.from(Array(49).keys()).map(tile => (
              <Tile
                key={tile}
                tile={tile}
                ships={ships}
                selectingWater={selectingWater}
                initialValue={visiblePositions.includes(tile) ? 'ship' : null}
                selectAsShip={selectAsShip}
                unselectAsShip={unselectAsShip}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="controls">
        <button onClick={generateShips}>New Game</button>
        <p>Selecting: {selectingWater ? 'water' : 'ship'}</p>
        <button className="secondary-button" onClick={() => toggleSelectingWater(!selectingWater)}>
          Select {selectingWater ? 'ship' : 'water'} instead
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Sea;
