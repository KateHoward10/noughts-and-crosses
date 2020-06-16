import React, { Component } from 'react';
import Cell from './Cell';
import Arrow from './Arrow';
import Button from '../Button';
import OptionToggle from '../OptionToggle';
import { emptyCells, possibleFours } from '../../combinations';

class Connect4 extends Component {
  state = {
    cells: emptyCells(),
    winner: '',
    winningCombo: [],
    myColour: ['red', 'yellow'][Math.round(Math.random())],
    playing: false,
    rolling: false
  };

  reset = () => {
    this.setState(
      {
        cells: emptyCells(),
        winner: '',
        winningCombo: [],
        playing: false,
        rolling: false
      }
    );
  };

  start = () => {
    this.setState(
      {
        cells: emptyCells(),
        winner: '',
        winningCombo: [],
        myTurn: Boolean(Math.random() < 0.5),
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
      cell => this.state.cells[cell] === ''
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
      possibleFours.some(combination => combination.every(cellNumber => cells[cellNumber] === player))
    ) {
      this.setState({
        playing: false,
        winner: player,
        winningCombo: possibleFours.find(combination =>
          combination.every(cellNumber => cells[cellNumber] === player)
        )
      });
      // If every cell filled by someone's counter
    } else if (cells.every(cell => cell !== '')) {
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
      cells[lastNumber] = player;
      // For some reason this is needed to make sure it doesn't think you've scored a vertical 4 with only 3 counters
      if (lastNumber >= 7) {
        cells[lastNumber - 7] = '';
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
        cells[i] = player;
        this.setState({ cells });
        setTimeout(() => {
          cells[i] = '';
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
          combination.filter(cellNumber => cells[cellNumber] === 'computer').length === 3 &&
          combination.filter(cellNumber => cells[cellNumber] === '').length === 1 &&
          combination.find(cellNumber => cells[cellNumber] === '') ===
            this.findBottomNumber(combination.find(cellNumber => cells[cellNumber] === '') % 7)
      )
    ) {
      const combos = possibleFours.filter(
        combination =>
          combination.filter(cellNumber => cells[cellNumber] === 'computer').length === 3 &&
          combination.filter(cellNumber => cells[cellNumber] === '').length === 1 &&
          combination.find(cellNumber => cells[cellNumber] === '') ===
            this.findBottomNumber(combination.find(cellNumber => cells[cellNumber] === '') % 7)
      );
      const randomCombo = combos[Math.floor(Math.random() * combos.length)];
      computerColumnChoice = randomCombo.find(cellNumber => cells[cellNumber] === '') % 7;
      // If there are any 3/4s for me
    } else if (
      possibleFours.some(
        combination =>
          combination.filter(cellNumber => cells[cellNumber] === 'me').length === 3 &&
          combination.filter(cellNumber => cells[cellNumber] === '').length === 1 &&
          combination.find(cellNumber => cells[cellNumber] === '') ===
            this.findBottomNumber(combination.find(cellNumber => cells[cellNumber] === '') % 7)
      )
    ) {
      const combos = possibleFours.filter(
        combination =>
          combination.filter(cellNumber => cells[cellNumber] === 'me').length === 3 &&
          combination.filter(cellNumber => cells[cellNumber] === '').length === 1 &&
          combination.find(cellNumber => cells[cellNumber] === '') ===
            this.findBottomNumber(combination.find(cellNumber => cells[cellNumber] === '') % 7)
      );
      const randomCombo = combos[Math.floor(Math.random() * combos.length)];
      computerColumnChoice = randomCombo.find(cellNumber => cells[cellNumber] === '') % 7;
    } else {
      computerColumnChoice = parseFloat(availableColumns[Math.floor(Math.random() * availableColumns.length)], 10);
    }
    this.selectColumn(computerColumnChoice, 'computer');
  };

  render() {
    const { playing, myTurn, myColour, winner, cells, winningCombo, rolling } = this.state;
    const computerColour = myColour === 'red' ? 'yellow' : 'red';
    const cellSideLength = Math.min(window.innerWidth, window.innerHeight) / 8;

    return !playing && winner === '' ? (
      <div className="setup">
        <div className="option-picker">
          <p>Select your colour:</p>
          <OptionToggle options={['yellow', 'red']} firstOptionSelected={myColour === 'yellow'} setOption={this.changeColour} />
        </div>
        <Button onClick={this.start}>Start Game</Button>
      </div>
    ) : (
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
              {winningCombo.length === 4 && (
                <line
                  x1={(winningCombo[0] % 7) * cellSideLength + cellSideLength / 2}
                  y1={Math.floor(winningCombo[0] / 7) * cellSideLength + cellSideLength / 2}
                  x2={(winningCombo[3] % 7) * cellSideLength + cellSideLength / 2}
                  y2={Math.floor(winningCombo[3] / 7) * cellSideLength + cellSideLength / 2}
                />
              )}
            </svg>
            {cells.map((cell, index) => (
              <Cell
                index={index}
                key={index}
                fill={cell}
                myColour={myColour}
                computerColour={computerColour}
                cellSideLength={cellSideLength}
              />
            ))}
          </div>
        </div>
        <div className="controls">
          <Button onClick={this.reset}>New Game</Button>
          {playing && (
            <p>{myTurn ? 'Your turn' : "The computer's turn"}</p>
          )}
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

export default Connect4;
