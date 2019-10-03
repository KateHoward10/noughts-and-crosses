import React, { Component } from 'react';
import Cell from './Cell';
import Arrow from './Arrow';
import { possibleFours } from './combinations';

class Board extends Component {
  state = {
    cells: [
      { index: 0, selectedBy: '' },
      { index: 1, selectedBy: '' },
      { index: 2, selectedBy: '' },
      { index: 3, selectedBy: '' },
      { index: 4, selectedBy: '' },
      { index: 5, selectedBy: '' },
      { index: 6, selectedBy: '' },
      { index: 7, selectedBy: '' },
      { index: 8, selectedBy: '' },
      { index: 9, selectedBy: '' },
      { index: 10, selectedBy: '' },
      { index: 11, selectedBy: '' },
      { index: 12, selectedBy: '' },
      { index: 13, selectedBy: '' },
      { index: 14, selectedBy: '' },
      { index: 15, selectedBy: '' },
      { index: 16, selectedBy: '' },
      { index: 17, selectedBy: '' },
      { index: 18, selectedBy: '' },
      { index: 19, selectedBy: '' },
      { index: 20, selectedBy: '' },
      { index: 21, selectedBy: '' },
      { index: 22, selectedBy: '' },
      { index: 23, selectedBy: '' },
      { index: 24, selectedBy: '' },
      { index: 25, selectedBy: '' },
      { index: 26, selectedBy: '' },
      { index: 27, selectedBy: '' },
      { index: 28, selectedBy: '' },
      { index: 29, selectedBy: '' },
      { index: 30, selectedBy: '' },
      { index: 31, selectedBy: '' },
      { index: 32, selectedBy: '' },
      { index: 33, selectedBy: '' },
      { index: 34, selectedBy: '' },
      { index: 35, selectedBy: '' },
      { index: 36, selectedBy: '' },
      { index: 37, selectedBy: '' },
      { index: 38, selectedBy: '' },
      { index: 39, selectedBy: '' },
      { index: 40, selectedBy: '' },
      { index: 41, selectedBy: '' }
    ],
    winner: '',
    winningCombo: [],
    playing: false,
    rolling: false
  };

  reset = () => {
    this.setState(
      {
        cells: [
          { index: 0, selectedBy: '' },
          { index: 1, selectedBy: '' },
          { index: 2, selectedBy: '' },
          { index: 3, selectedBy: '' },
          { index: 4, selectedBy: '' },
          { index: 5, selectedBy: '' },
          { index: 6, selectedBy: '' },
          { index: 7, selectedBy: '' },
          { index: 8, selectedBy: '' },
          { index: 9, selectedBy: '' },
          { index: 10, selectedBy: '' },
          { index: 11, selectedBy: '' },
          { index: 12, selectedBy: '' },
          { index: 13, selectedBy: '' },
          { index: 14, selectedBy: '' },
          { index: 15, selectedBy: '' },
          { index: 16, selectedBy: '' },
          { index: 17, selectedBy: '' },
          { index: 18, selectedBy: '' },
          { index: 19, selectedBy: '' },
          { index: 20, selectedBy: '' },
          { index: 21, selectedBy: '' },
          { index: 22, selectedBy: '' },
          { index: 23, selectedBy: '' },
          { index: 24, selectedBy: '' },
          { index: 25, selectedBy: '' },
          { index: 26, selectedBy: '' },
          { index: 27, selectedBy: '' },
          { index: 28, selectedBy: '' },
          { index: 29, selectedBy: '' },
          { index: 30, selectedBy: '' },
          { index: 31, selectedBy: '' },
          { index: 32, selectedBy: '' },
          { index: 33, selectedBy: '' },
          { index: 34, selectedBy: '' },
          { index: 35, selectedBy: '' },
          { index: 36, selectedBy: '' },
          { index: 37, selectedBy: '' },
          { index: 38, selectedBy: '' },
          { index: 39, selectedBy: '' },
          { index: 40, selectedBy: '' },
          { index: 41, selectedBy: '' }
        ],
        winner: '',
        winningCombo: [],
        myTurn: Boolean(Math.random() < 0.5),
        myColour: ['red', 'yellow'][Math.round(Math.random())],
        playing: true,
        rolling: false
      },
      () => {
        if (!this.state.myTurn) {
          this.computerTurn();
        }
      }
    );
  };

  changeColour = () => {
    const { myColour } = this.state;
    this.setState({
      myColour: myColour === 'red' ? 'yellow' : 'red'
    });
  };

  findAvailableCells = columnNumber => {
    const columnCells = [
      41 - 6 + columnNumber,
      41 - 13 + columnNumber,
      41 - 20 + columnNumber,
      41 - 27 + columnNumber,
      41 - 34 + columnNumber,
      columnNumber
    ];
    const availableCells = columnCells.filter(
      cell => this.state.cells[cell] && this.state.cells[cell]['selectedBy'] === ''
    );
    return availableCells.sort((a, b) => {
      return a - b;
    });
  };

  findBottomNumber = columnNumber => {
    const availableCells = this.findAvailableCells(columnNumber);
    return Math.max(...availableCells);
  };

  checkForFour = player => {
    const { cells } = this.state;
    // If any combination achieved by same player
    if (
      possibleFours.some(combination => combination.every(cellNumber => cells[cellNumber]['selectedBy'] === player))
    ) {
      this.setState({
        playing: false,
        winner: player,
        winningCombo: possibleFours.find(combination =>
          combination.every(cellNumber => cells[cellNumber]['selectedBy'] === player)
        )
      });
      // If every cell filled by someone's counter
    } else if (cells.every(cell => cell['selectedBy'] !== '')) {
      this.setState({ playing: false, winner: 'draw' });
    }
  };

  selectColumn = (columnNumber, player) => {
    const { playing, winner, myTurn } = this.state;
    if (!playing || winner !== '') {
      return;
    } else {
      this.roll(columnNumber, player, () => {
        this.setState({ myTurn: !myTurn, rolling: false }, () => this.checkForFour(player));
        if (player === 'me' && playing) {
          setTimeout(this.computerTurn, Math.random() * 2000);
        }
      });
    }
  };

  roll = (columnNumber, player, finishRoll) => {
    const { cells, rolling } = this.state;
    if (rolling) return;
    const numbers = this.findAvailableCells(columnNumber);
    const lastNumber = this.findBottomNumber(columnNumber);
    this.setState({ rolling: true });
    const reachBottomCell = () => {
      cells[lastNumber].selectedBy = player;
      // For some reason this is needed to make sure it doesn't think you've scored a vertical 4 with only 3 counters
      if (lastNumber >= 7) {
        cells[lastNumber - 7].selectedBy = '';
      }
      this.setState({ cells }, () => finishRoll());
    };
    const slowLoop = (array, interval, callback) => {
      var i = 0;
      next();
      function next() {
        if (callback(array[i], i) !== false) {
          if (++i < array.length - 1) {
            setTimeout(next, interval);
          } else {
            reachBottomCell();
          }
        }
      }
    };
    if (numbers.length === 1 && numbers[0] === lastNumber) {
      reachBottomCell();
    } else {
      slowLoop(numbers, 100, i => {
        cells[i].selectedBy = player;
        this.setState({ cells });
        setTimeout(() => {
          cells[i].selectedBy = '';
          this.setState({ cells });
        }, 100);
      });
    }
  };

  computerTurn = () => {
    const { cells } = this.state;
    // Find columns which are not full
    const availableColumns = Object.keys(cells.slice(0, 7)).filter(
      key => this.findBottomNumber(parseFloat(key, 10)) > 0
    );
    let computerColumnChoice;
    // If there are any 3/4s for the computer
    if (
      possibleFours.some(
        combination =>
          combination.filter(cellNumber => cells[cellNumber]['selectedBy'] === 'computer').length === 3 &&
          combination.filter(cellNumber => cells[cellNumber]['selectedBy'] === '').length === 1 &&
          combination.find(cellNumber => cells[cellNumber]['selectedBy'] === '') ===
            this.findBottomNumber(combination.find(cellNumber => cells[cellNumber]['selectedBy'] === '') % 7)
      )
    ) {
      const combos = possibleFours.filter(
        combination =>
          combination.filter(cellNumber => cells[cellNumber]['selectedBy'] === 'computer').length === 3 &&
          combination.filter(cellNumber => cells[cellNumber]['selectedBy'] === '').length === 1 &&
          combination.find(cellNumber => cells[cellNumber]['selectedBy'] === '') ===
            this.findBottomNumber(combination.find(cellNumber => cells[cellNumber]['selectedBy'] === '') % 7)
      );
      const randomCombo = combos[Math.floor(Math.random() * combos.length)];
      computerColumnChoice = randomCombo.find(cellNumber => cells[cellNumber]['selectedBy'] === '') % 7;
      // If there are any 3/4s for me
    } else if (
      possibleFours.some(
        combination =>
          combination.filter(cellNumber => cells[cellNumber]['selectedBy'] === 'me').length === 3 &&
          combination.filter(cellNumber => cells[cellNumber]['selectedBy'] === '').length === 1 &&
          combination.find(cellNumber => cells[cellNumber]['selectedBy'] === '') ===
            this.findBottomNumber(combination.find(cellNumber => cells[cellNumber]['selectedBy'] === '') % 7)
      )
    ) {
      const combos = possibleFours.filter(
        combination =>
          combination.filter(cellNumber => cells[cellNumber]['selectedBy'] === 'me').length === 3 &&
          combination.filter(cellNumber => cells[cellNumber]['selectedBy'] === '').length === 1 &&
          combination.find(cellNumber => cells[cellNumber]['selectedBy'] === '') ===
            this.findBottomNumber(combination.find(cellNumber => cells[cellNumber]['selectedBy'] === '') % 7)
      );
      const randomCombo = combos[Math.floor(Math.random() * combos.length)];
      computerColumnChoice = randomCombo.find(cellNumber => cells[cellNumber]['selectedBy'] === '') % 7;
    } else {
      computerColumnChoice = parseFloat(availableColumns[Math.floor(Math.random() * availableColumns.length)], 10);
    }
    this.selectColumn(computerColumnChoice, 'computer');
  };

  render() {
    const { switchGame } = this.props;
    const { playing, myTurn, myColour, winner, cells, winningCombo, rolling } = this.state;
    const computerColour = myColour === 'red' ? 'yellow' : 'red';
    const cellSideLength = Math.min(window.innerWidth, window.innerHeight) / 8;
    return (
      <div className="console">
        <div className="game">
          <div className="arrows" style={{ gridTemplateColumns: `repeat(7, ${cellSideLength}px)` }}>
            {Object.keys(cells.slice(0, 7)).map(key => (
              <Arrow
                index={key}
                key={key}
                hidden={this.findBottomNumber(parseFloat(key, 10)) < 0}
                selectColumn={this.selectColumn}
                active={!rolling && myTurn}
                cellSideLength={cellSideLength}
              />
            ))}
          </div>
          <div
            className="board"
            style={{
              gridTemplateRows: `repeat(6, ${cellSideLength}px)`,
              gridTemplateColumns: `repeat(7, ${cellSideLength}px)`
            }}
          >
            <svg className="path-container" width={cellSideLength * 7} height={cellSideLength * 6}>
              {winningCombo.length > 0 && (
                <line
                  x1={(winningCombo[0] % 7) * cellSideLength + cellSideLength / 2}
                  y1={Math.floor(winningCombo[0] / 7) * cellSideLength + cellSideLength / 2}
                  x2={(winningCombo[3] % 7) * cellSideLength + cellSideLength / 2}
                  y2={Math.floor(winningCombo[3] / 7) * cellSideLength + cellSideLength / 2}
                />
              )}
            </svg>
            {Object.keys(cells).map(key => (
              <Cell
                index={key}
                key={key}
                fill={cells[key]['selectedBy']}
                myColour={myColour}
                computerColour={computerColour}
                cellSideLength={cellSideLength}
              />
            ))}
          </div>
        </div>
        <div className="controls">
          <button onClick={this.reset}>New Game</button>
          {playing && (
            <React.Fragment>
              <p>{myTurn ? 'Your turn' : "The computer's turn"}</p>
              <div className="option-picker">
                <p>Your colour: {myColour}</p>
                <button
                  onClick={this.changeColour}
                  style={{
                    backgroundColor: computerColour,
                    color: computerColour === 'yellow' ? 'black' : 'white'
                  }}
                >
                  Choose {computerColour}
                </button>
              </div>
            </React.Fragment>
          )}
          <button onClick={switchGame} className="secondary-button">
            Play Noughts & Crosses
          </button>
          {winner === 'me' ? (
            <h2>You win!</h2>
          ) : winner === 'computer' ? (
            <h2>The computer wins!</h2>
          ) : winner === 'draw' ? (
            <h2>It's a draw</h2>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Board;
