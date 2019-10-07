import React, { useState } from 'react';
import Tile from './Tile';

function Sea() {
  const tileSideLength = Math.min(window.innerWidth, window.innerHeight) / 9;

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
          {Array.from(Array(64).keys()).map(key => (
            <Tile index={key} />
          ))}
        </div>
      </div>
      <div className="controls"></div>
    </div>
  );
}

export default Sea;
