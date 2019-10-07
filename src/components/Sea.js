import React, { useState } from 'react';
import Tile from './Tile';

function Sea() {
  const tiles = Array.from(Array(8), () => new Array(8).fill(''));
  const tileSideLength = Math.min(window.innerWidth, window.innerHeight) / 9;
  const ships = {
    a: [[0, 0, 0], [0, 'a', 0], [0, 0, 0]],
    b: [[0, 0, 0, 0], [0, 'b', 'b', 0], [0, 0, 0, 0]],
    c: [[0, 0, 0, 0, 0], [0, 'c', 'c', 'c', 0], [0, 0, 0, 0, 0]],
    d: [[0, 0, 0, 0, 0, 0], [0, 'd', 'd', 'd', 'd', 0], [0, 0, 0, 0, 0, 0]]
  };

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
          {tiles.map(row => row.map((tile, index) => <Tile index={index}>{tile}</Tile>))}
        </div>
      </div>
      <div className="controls"></div>
    </div>
  );
}

export default Sea;
