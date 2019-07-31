import React from 'react';

function Arrow(props) {
  const { cellSideLength, hidden, active, index, selectColumn } = props;

  function selectArrow() {
    if (!hidden && active) {
      selectColumn(parseFloat(index, 10), 'me');
    }
  }

  return (
    <div
      onClick={selectArrow}
      style={{
        fontSize: `${cellSideLength / 2}px`,
        fontWeight: 'bold',
        width: `${cellSideLength}px`,
        cursor: 'pointer'
      }}
    >
      <span style={{ display: hidden ? 'none' : 'block' }}>↓</span>
    </div>
  );
}

export default Arrow;
