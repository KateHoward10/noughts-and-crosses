import React, { Component } from 'react';

class Cell extends Component {

  render() {
    const { fill, myColour, computerColour, cellSideLength } = this.props;
    const colour = fill==="me" ? myColour : fill==="computer" ? computerColour : "#80acf2";
    return (
      <div className="cell">
        <div
          className="circle"
          style={{
            width: `${cellSideLength * 0.75}px`,
            height: `${cellSideLength * 0.75}px`,
            backgroundColor: colour,
            borderRadius: "50%"
          }}
        />
      </div>
    );
  }
}

export default Cell;