import React, { Component } from 'react';

class Cell extends Component {

  selectArrow = () => {
    this.props.selectColumn(parseFloat(this.props.index, 10), "me");
    this.props.computerTurn();
  }

  render() {
    return (
      <div className="arrow" onClick={this.selectArrow}>↓</div>
    );
  }
}

export default Cell;