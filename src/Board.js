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
    playing: false,
    rolling: null
  }

  reset = () => {
    this.setState({
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
      myTurn: Boolean(Math.random() < 0.5),
      myColour: ["red", "yellow"][Math.round(Math.random())],
      playing: true,
      rolling: null
    }, () => {
      if (!this.state.myTurn) {
        this.computerTurn();
      }
    })
  }

  changeColour = () => {
    const { myColour } = this.state;
    this.setState({
      myColour: myColour==="red" ? "yellow" : "red"
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
    const { playing, winner, cells, myTurn } = this.state;
    if (!playing || winner!=="" || (player==="me" && !myTurn)) {
      return;
    } else {
      this.setState({ rolling: columnNumber });
      setTimeout(() => this.setState({ rolling: null }, () => {
        const fillNumber = this.findBottomNumber(columnNumber);
        cells[fillNumber].selectedBy = player;
        this.setState({ cells, myTurn: !myTurn }, () => this.checkForFour(player));
      }), 1000);
    }
  }

  computerTurn = () => {
    const { cells } = this.state;
    const availableColumns = Object.keys(cells.slice(0,7)).filter(key => this.findBottomNumber(parseFloat(key, 10))>0);
    let computerColumnChoice;
    if (possibleFours.some(combination =>
      combination.filter(cellNumber => cells[cellNumber]["selectedBy"]==="computer").length===3
      && combination.filter(cellNumber => cells[cellNumber]["selectedBy"]==="").length===1
      && combination.find(cellNumber => cells[cellNumber]["selectedBy"]==="")===this.findBottomNumber(combination.find(cellNumber => cells[cellNumber]["selectedBy"]==="")%7)
    )) {
      const combos = possibleFours.filter(combination =>
        combination.filter(cellNumber => cells[cellNumber]["selectedBy"]==="computer").length===3
        && combination.filter(cellNumber => cells[cellNumber]["selectedBy"]==="").length===1
        && combination.find(cellNumber => cells[cellNumber]["selectedBy"]==="")===this.findBottomNumber(combination.find(cellNumber => cells[cellNumber]["selectedBy"]==="")%7)
      );
      const randomCombo = combos[Math.floor(Math.random() * combos.length)];
      computerColumnChoice = randomCombo.find(cellNumber => cells[cellNumber]["selectedBy"]==="")%7;
    } else if (possibleFours.some(combination =>
      combination.filter(cellNumber => cells[cellNumber]["selectedBy"]==="me").length===3
      && combination.filter(cellNumber => cells[cellNumber]["selectedBy"]==="").length===1
      && combination.find(cellNumber => cells[cellNumber]["selectedBy"]==="")===this.findBottomNumber(combination.find(cellNumber => cells[cellNumber]["selectedBy"]==="")%7)
    )) {
      const combos = possibleFours.filter(combination =>
        combination.filter(cellNumber => cells[cellNumber]["selectedBy"]==="me").length===3
        && combination.filter(cellNumber => cells[cellNumber]["selectedBy"]==="").length===1
        && combination.find(cellNumber => cells[cellNumber]["selectedBy"]==="")===this.findBottomNumber(combination.find(cellNumber => cells[cellNumber]["selectedBy"]==="")%7)
      );
      const randomCombo = combos[Math.floor(Math.random() * combos.length)];
      computerColumnChoice = randomCombo.find(cellNumber => cells[cellNumber]["selectedBy"]==="")%7;
    } else {
      computerColumnChoice = parseFloat(availableColumns[Math.floor(Math.random() * availableColumns.length)], 10);
    }
    setTimeout(this.selectColumn, 500, computerColumnChoice, "computer");
  }

  render() {
    const { playing, myTurn, myColour, winner, cells, winningCombo, rolling } = this.state;
    const computerColour = myColour==="red" ? "yellow" : "red";
    return (
      <div className="game">
        <button onClick={this.reset}>New Game</button>
        {playing && (
          <React.Fragment>
            <p>{myTurn ? "Your turn" : "The computer's turn"}</p>
            <div className="controls">
        <p>Your colour: {myColour}</p>
        <button onClick={this.changeColour}>Choose {computerColour}s instead</button>
            </div>
          </React.Fragment>
        )}
        {winner==="me" ? <h2>You win!</h2> : winner==="computer" ? <h2>The computer wins!</h2> : winner==="draw" ? <h2>It's a draw</h2> : null}
        <div className="arrows">
          {Object.keys(cells.slice(0,7)).map(key => <Arrow
            index={key}
            key={key}
            hidden={this.findBottomNumber(parseFloat(key, 10))<0}
            selectColumn={this.selectColumn}
            computerTurn={this.computerTurn}
          />)}
        </div>
        <div className="board">
          <svg className="path-container" width="560" height="480">
            {winningCombo.length > 0 && (
              <line
                x1={((winningCombo[0] % 7) * 80) + 40}
                y1={(Math.floor(winningCombo[0] / 7) * 80) + 40}
                x2={((winningCombo[3] % 7) * 80) + 40}
                y2={(Math.floor(winningCombo[3] / 7) * 80) + 40}
              />
            )}
            {rolling && (
              <circle cx={(rolling * 80) + 40} cy="40" r="30" className="rolling-counter" fill={myTurn ? myColour : computerColour} />
            )}
          </svg>
          {Object.keys(cells).map(key => <Cell
            index={key}
            key={key}
            fill={cells[key]["selectedBy"]}
            myColour={myColour}
            computerColour={computerColour}
          />)}
        </div>
      </div>
    );
  }
}

export default Board;
