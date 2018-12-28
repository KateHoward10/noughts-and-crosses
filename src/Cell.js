import React, { Component } from 'react';

class Cell extends Component {

  render() {
    const colour = this.props.fill==="me" ? "red" : this.props.fill==="computer" ? "yellow" : "white";
    return (
      <div className="cell">
        <div
          className="circle"
          style={{backgroundColor: colour}}>
          {this.props.index}
        </div>
      </div>
    );
  }
}

export default Cell;