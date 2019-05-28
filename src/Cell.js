import React, { Component } from 'react';

class Cell extends Component {

  render() {
    const { fill, myColour, computerColour } = this.props;
    const colour = fill==="me" ? myColour : fill==="computer" ? computerColour : "#9f7062";
    const image = fill==="" ? "initial !important" : "none";
    return (
      <div className="cell">
        <div
          className="circle"
          style={{ backgroundColor: colour, backgroundImage: image }}>
        </div>
      </div>
    );
  }
}

export default Cell;