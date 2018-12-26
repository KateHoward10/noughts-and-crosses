import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {
  state = {
    cells: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42]
  }

  selectColumn = (columnNumber) => {
    const fillNumber = 41 - 6 + columnNumber;
    const cells = [ ...this.state.cells ];
    cells[fillNumber] = "me";
    this.setState({ cells });
  }

  render() {
    return (
      <div className="game">
        <div className="board">
          {Object.keys(this.state.cells).map(key => <Cell index={key} key={key} fill={this.state.cells[key]} selectColumn={this.selectColumn}/>)}
        </div>
      </div>
    );
  }
}

export default Board;
