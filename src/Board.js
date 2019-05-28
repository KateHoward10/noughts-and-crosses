import React, { Component } from 'react';
import Cell from './Cell';
import Arrow from './Arrow';
import { possibleFours } from './combinations';

class Board extends Component {
  state = {
    cells: [
      {index: 0, selectedBy: ""}, {index: 1, selectedBy: ""}, {index: 2, selectedBy: ""},
      {index: 3, selectedBy: ""}, {index: 4, selectedBy: ""}, {index: 5, selectedBy: ""},
      {index: 6, selectedBy: ""}, {index: 7, selectedBy: ""}, {index: 8, selectedBy: ""},
      {index: 9, selectedBy: ""}, {index: 10, selectedBy: ""}, {index: 11, selectedBy: ""},
      {index: 12, selectedBy: ""}, {index: 13, selectedBy: ""}, {index: 14, selectedBy: ""},
      {index: 15, selectedBy: ""}, {index: 16, selectedBy: ""}, {index: 17, selectedBy: ""},
      {index: 18, selectedBy: ""}, {index: 19, selectedBy: ""}, {index: 20, selectedBy: ""},
      {index: 21, selectedBy: ""}, {index: 22, selectedBy: ""}, {index: 23, selectedBy: ""},
      {index: 24, selectedBy: ""}, {index: 25, selectedBy: ""}, {index: 26, selectedBy: ""},
      {index: 27, selectedBy: ""}, {index: 28, selectedBy: ""}, {index: 29, selectedBy: ""},
      {index: 30, selectedBy: ""}, {index: 31, selectedBy: ""}, {index: 32, selectedBy: ""},
      {index: 33, selectedBy: ""}, {index: 34, selectedBy: ""}, {index: 35, selectedBy: ""},
      {index: 36, selectedBy: ""}, {index: 37, selectedBy: ""}, {index: 38, selectedBy: ""},
      {index: 39, selectedBy: ""}, {index: 40, selectedBy: ""}, {index: 41, selectedBy: ""}
    ],
    winner: "",
    winningCombo: [],
    myColour: "red",
    computerColour: "yellow"
  }

  changeColour = () => {
    const myColour = this.state.myColour;
    const computerColour = this.state.computerColour;
    this.setState({
      myColour: myColour==="red" ? "yellow" : "red",
      computerColour: computerColour==="red" ? "yellow" : "red"
    });
  }

  findBottomNumber = (columnNumber) => {
    let columnCells = [41 - 6 + columnNumber, 41 - 13 + columnNumber, 41 - 20 + columnNumber, 41 - 27 + columnNumber, 41 - 34 + columnNumber, columnNumber];
    let availableCells = columnCells.filter(cell => this.state.cells[cell]["selectedBy"]==="");
    return Math.max(...availableCells);
  }

  checkForFour = (player) => {
    if (possibleFours.some(combination => combination.every(cellNumber => this.state.cells[cellNumber]["selectedBy"]===player))) {
      this.setState({
        winner: player,
        winningCombo: possibleFours.find(combination => combination.every(cellNumber => this.state.cells[cellNumber]["selectedBy"]===player))
      })
    } else if (this.state.cells.every(cell => cell["selectedBy"]!=="")) {
      this.setState({ winner: "draw" });
    }
  }

  selectColumn = (columnNumber, player) => {
    if (this.state.winner==="") {
      const fillNumber = this.findBottomNumber(columnNumber);
      const cells = [ ...this.state.cells ];
      cells[fillNumber].selectedBy = player;
      this.setState({ cells });
      this.checkForFour(player);
    }
  }

  computerTurn = () => {
    const availableColumns = Object.keys(this.state.cells.slice(0,7)).filter(key => this.findBottomNumber(parseFloat(key, 10))>0);
    const computerColumnChoice = parseFloat(availableColumns[Math.floor(Math.random() * availableColumns.length)], 10);
    setTimeout(this.selectColumn, 500, computerColumnChoice, "computer");
  }

  render() {
    return (
      <div className="game">
        <div className="controls">
          <p>Your colour: {this.state.myColour}</p>
          <button onClick={this.changeColour}>Choose {this.state.computerColour}s instead</button>
        </div>
        {this.state.winner==="me" ? <h2>You win!</h2> : this.state.winner==="computer" ? <h2>The computer wins!</h2> : this.state.winner==="draw" ? <h2>It's a draw</h2> : null}
        <div className="arrows">
          {Object.keys(this.state.cells.slice(0,7)).map(key => <Arrow
            index={key}
            key={key}
            hidden={this.findBottomNumber(parseFloat(key, 10))<0}
            selectColumn={this.selectColumn}
            computerTurn={this.computerTurn}
          />)}
        </div>
        <div className="board">
          {this.state.winningCombo.length ? <svg className="path-container" width="560" height="480">
            <line
              x1={((this.state.winningCombo[0] % 7) * 80) + 40}
              y1={(Math.floor(this.state.winningCombo[0] / 7) * 80) + 40}
              x2={((this.state.winningCombo[3] % 7) * 80) + 40}
              y2={(Math.floor(this.state.winningCombo[3] / 7) * 80) + 40}
            />
          </svg> : null}
          {Object.keys(this.state.cells).map(key => <Cell
            index={key}
            key={key}
            fill={this.state.cells[key]["selectedBy"]}
            myColour={this.state.myColour}
            computerColour={this.state.computerColour}
            selectColumn={this.selectColumn}
            computerTurn={this.computerTurn}
          />)}
        </div>
      </div>
    );
  }
}

export default Board;
