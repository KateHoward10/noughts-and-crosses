import React, { Component } from 'react';

class Cell extends Component {

  selectArrow = () => {
    if (!this.props.hidden && this.props.active) {
      this.props.selectColumn(parseFloat(this.props.index, 10), "me");
    }
  }

  render() {
    const { cellSideLength, hidden } = this.props;
    return (
      <div
        onClick={this.selectArrow}
        style={{ fontSize: `${cellSideLength / 2}px`, fontWeight: "bold", width: `${cellSideLength}px`, cursor: "pointer" }}
      >
        <span style={{display: hidden ? "none" : "block"}}>↓</span>
      </div>
    );
  }
}

export default Cell;