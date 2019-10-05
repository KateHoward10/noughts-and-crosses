import React from 'react';

const Cell = ({ fill, myColour, computerColour, cellSideLength }) => (
  <div className="cell">
    <div
      className="circle"
      style={{
        width: `${cellSideLength * 0.75}px`,
        height: `${cellSideLength * 0.75}px`,
        backgroundColor: fill === 'me' ? myColour : fill === 'computer' ? computerColour : '#80acf2',
        borderRadius: '50%'
      }}
    />
  </div>
);

export default Cell;
