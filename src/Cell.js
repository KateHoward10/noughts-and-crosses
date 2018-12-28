import React, { Component } from 'react';

class Cell extends Component {

  render() {
    const colour = this.props.fill==="me" ? this.props.myColour : this.props.fill==="computer" ? this.props.computerColour : "white";
    return (
      <div className="cell">
        <div
          className="circle"
          style={{backgroundColor: colour}}>
        </div>
      </div>
    );
  }
}

export default Cell;