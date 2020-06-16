import React, { useState } from 'react';
import Button from '../Button';
import Tile from './Tile';
import OptionToggle from '../OptionToggle';

function Battleships() {
  const tileSideLength = Math.min(window.innerWidth, window.innerHeight) / 9;
  const lengths = [4, 3, 2, 2, 1, 1];
  const [ships, setShips] = useState([]);
  const [numbers, setNumbers] = useState([[], []]);
  const [selectingWater, toggleSelectingWater] = useState(true);
  const [visiblePositions, setVisiblePositions] = useState([]);
  const [selectedAsShips, setSelectedAsShips] = useState([]);
  const [selectedAsWater, setSelectedAsWater] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [mouseDown, toggleMouseDown] = useState(false);

  function generateShips() {
    let newShips = [];
    setNumbers([[], []]);
    setSelectedAsWater([]);
    setCompleted(false);
    for (let i = 0; i < lengths.length; i++) {
      let latestShip = placeShip(lengths[i], newShips);
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

  function getForbiddenTiles(ship) {
    let tiles = [...ship];
    if (ship[1] - ship[0] === 1) {
      tiles.push(
        ...(ship[0] >= 7 ? ship.map(part => part - 7) : []),
        ...(ship[0] <= 42 ? ship.map(part => part + 7) : []),
        ...(ship[0] % 7 !== 0 ? [ship[0] - 8, ship[0] - 1, ship[0] + 6] : []),
        ...(ship[ship.length - 1] % 7 !== 7
          ? [ship[ship.length - 1] + 8, ship[ship.length - 1] + 1, ship[ship.length - 1] - 6]
          : [])
      );
    } else {
      tiles.push(
        ...(ship[0] % 7 !== 0 ? ship.map(part => part - 1) : []),
        ...(ship[0] % 7 !== 7 ? ship.map(part => part + 1) : []),
        ...(ship[0] >= 7 ? [ship[0] - 8, ship[0] - 7, ship[0] - 6] : []),
        ...(ship[ship.length - 1] <= 42
          ? [ship[ship.length - 1] + 8, ship[ship.length - 1] + 7, ship[ship.length - 1] + 6]
          : [])
      );
    }
    return tiles.filter(tile => 0 <= tile && tile <= 48);
  }

  function placeShip(length, existingShips) {
    const filledTiles = [...new Set(existingShips.map(ship => getForbiddenTiles(ship)).flat())];
    const horizontalPossibilities = Array.from(Array(49).keys())
      .filter(number => number % 7 < 8 - length)
      .filter(tile => filledTiles.indexOf(tile) === -1);
    const verticalPossibilities = Array.from(Array(length * 7).keys()).filter(tile => filledTiles.indexOf(tile) === -1);

    function getDirection() {
      if (horizontalPossibilities.length === 0) {
        return 'vertical';
      } else if (verticalPossibilities.length === 0) {
        return 'horizontal';
      } else return Math.random() > 0.5 ? 'horizontal' : 'vertical';
    }
    const dir = getDirection();

    function getFirstPos() {
      return dir === 'horizontal'
        ? horizontalPossibilities[Math.floor(Math.random() * horizontalPossibilities.length)]
        : verticalPossibilities[Math.floor(Math.random() * verticalPossibilities.length)];
    }

    const firstPos = getFirstPos();
    let ship = [firstPos];
    for (let i = 1; i < length; i++) {
      ship.push(dir === 'horizontal' ? firstPos + i : firstPos + i * 7);
    }
    if (ship.some(tile => filledTiles.indexOf(tile) >= 0)) {
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
      setCompleted(true);
    }
  }

  function clear() {
    setSelectedAsShips([]);
    setSelectedAsWater([]);
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
            {Array.from(Array(49).keys()).map(tile => {
              const selected = selectedAsShips.includes(tile)
                ? 'ship'
                : selectedAsWater.includes(tile)
                ? 'water'
                : null;
              return (
                <Tile
                  key={tile}
                  tile={tile}
                  ships={ships}
                  selectingWater={selectingWater}
                  initialValue={visiblePositions.includes(tile) ? 'ship' : null}
                  selectAsShip={selectAsShip}
                  unselectAsShip={index => setSelectedAsShips(selectedAsShips.filter(selected => selected !== index))}
                  selectAsWater={index => setSelectedAsWater([...selectedAsWater, index])}
                  unselectAsWater={index => setSelectedAsWater(selectedAsWater.filter(selected => selected !== index))}
                  selected={selected}
                  completed={completed}
                  toggleMouseDown={toggleMouseDown}
                  mouseDown={mouseDown}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="controls">
        <Button onClick={generateShips}>New Game</Button>
        <p>Selecting:</p>
        <OptionToggle options={['water', 'ship']} colours={['blue', 'yellow']} firstOptionSelected={selectingWater} setOption={() => toggleSelectingWater(!selectingWater)} />
        <p>{completed && "That's it, well done!"}</p>
        {ships.map((ship, index) => (
          <p key={index} style={{ color: ship.every(part => selectedAsShips.includes(part)) ? 'grey' : 'black' }}>
            {ship.map(part => 'O')}
          </p>
        ))}
        <Button colour="purple" onClick={clear}>
          Start again
        </Button>
      </div>
    </div>
  );
}

export default Battleships;
