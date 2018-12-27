import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {
  state = {
    cells: [
      {index: 0, selectedBy: ""},
      {index: 1, selectedBy: ""},
      {index: 2, selectedBy: ""},
      {index: 3, selectedBy: ""},
      {index: 4, selectedBy: ""},
      {index: 5, selectedBy: ""},
      {index: 6, selectedBy: ""},
      {index: 7, selectedBy: ""},
      {index: 8, selectedBy: ""},
      {index: 9, selectedBy: ""},
      {index: 10, selectedBy: ""},
      {index: 11, selectedBy: ""},
      {index: 12, selectedBy: ""},
      {index: 13, selectedBy: ""},
      {index: 14, selectedBy: ""},
      {index: 15, selectedBy: ""},
      {index: 16, selectedBy: ""},
      {index: 17, selectedBy: ""},
      {index: 18, selectedBy: ""},
      {index: 19, selectedBy: ""},
      {index: 20, selectedBy: ""},
      {index: 21, selectedBy: ""},
      {index: 22, selectedBy: ""},
      {index: 23, selectedBy: ""},
      {index: 24, selectedBy: ""},
      {index: 25, selectedBy: ""},
      {index: 26, selectedBy: ""},
      {index: 27, selectedBy: ""},
      {index: 28, selectedBy: ""},
      {index: 29, selectedBy: ""},
      {index: 30, selectedBy: ""},
      {index: 31, selectedBy: ""},
      {index: 32, selectedBy: ""},
      {index: 33, selectedBy: ""},
      {index: 34, selectedBy: ""},
      {index: 35, selectedBy: ""},
      {index: 36, selectedBy: ""},
      {index: 37, selectedBy: ""},
      {index: 38, selectedBy: ""},
      {index: 39, selectedBy: ""},
      {index: 40, selectedBy: ""},
      {index: 41, selectedBy: ""}
    ],
    winner: ""
  }

  findBottomNumber = (columnNumber) => {
    let fillNumber;
    if (this.state.cells[41 - 6 + columnNumber]!=="") {
      fillNumber = 41 - 6 + columnNumber;
    } else if (this.state.cells[41 - 13 + columnNumber]!=="") {
      fillNumber = 41 - 13 + columnNumber;
    } else if (this.state.cells[41 - 20 + columnNumber]!=="") {
      fillNumber = 41 - 20 + columnNumber;
    } else if (this.state.cells[41 - 27 + columnNumber]!=="") {
      fillNumber = 41 - 27 + columnNumber;
    } else if (this.state.cells[41 - 34 + columnNumber]!=="") {
      fillNumber = 41 - 34 + columnNumber;
    } else if (this.state.cells[columnNumber]!=="") {
      fillNumber = columnNumber;
    }
    return fillNumber;
  }

  checkForFour = (player) => {
    const possibleFours = [
      [0,1,2,3],[1,2,3,4],[2,3,4,5],[3,4,5,6],
      [7,8,9,10],[8,9,10,11],[9,10,11,12],[10,11,12,13],
      [14,15,16,17],[15,16,17,18],[16,17,18,19],[17,18,19,20],
      [21,22,23,24],[22,23,24,25],[23,24,25,26],[24,25,26,27],
      [28,29,30,31],[29,30,31,32],[30,31,32,33],[31,32,33,34],
      [35,36,37,38],[36,37,38,39],[37,38,39,40],[38,39,40,41],
      [0,7,14,21],[7,14,21,28],[14,21,28,35],
      [1,8,15,22],[8,15,22,29],[15,22,29,36],
      [2,9,16,23],[9,16,23,30],[16,23,30,37],
      [3,10,17,24],[10,17,24],[17,24,31,38],
      [4,11,18,25],[11,18,25,32],[18,25,32,39],
      [5,12,19,26],[12,19,26,33],[19,26,33,40],
      [6,13,20,27],[13,20,27,34],[20,27,34,41],
      [0,8,16,24],[1,9,17,25],[2,10,18,26],[3,11,19,27],
      [7,15,23,31],[8,16,24,32],[9,17,25,33],[10,18,26,34],
      [14,22,30,38],[15,23,31,39],[16,24,32,40],[17,25,33,41],
      [21,15,9,3],[22,16,10,4],[23,17,11,5],[24,18,12,6],
      [28,22,16,10],[29,23,17,11],[30,24,18,12],[31,25,19,13],
      [35,29,23,17],[36,30,24,18],[37,31,25,19],[38,32,26,20]
    ]
    if (possibleFours.some(combination => combination.every(cellNumber => this.state.cells[cellNumber]["selectedBy"]===player))) {
      this.setState({ winner: player });
    }
  }

  selectColumn = (columnNumber) => {
    const fillNumber = this.findBottomNumber(columnNumber);
    const cells = [ ...this.state.cells ];
    cells[fillNumber].selectedBy = "me";
    this.setState({ cells });
    this.checkForFour("me");
  }

  render() {
    return (
      <div className="game">
        <p>{this.state.winner}</p>
        <div className="board">
          {Object.keys(this.state.cells).map(key => <Cell
            index={key}
            key={key}
            fill={this.state.cells[key]["selectedBy"]}
            selectColumn={this.selectColumn}
          />)}
        </div>
      </div>
    );
  }
}

export default Board;
