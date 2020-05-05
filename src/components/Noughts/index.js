import React, { Component } from 'react';
import Button from '../Button';
import Box from './Box';
import { emptyBoard, possibleThrees } from '../../combinations';

class Noughts extends Component {
  state = {
    win: '',
    boxes: emptyBoard(),
    winningThree: [],
    mySymbol: ['O', 'X'][Math.round(Math.random())],
    playing: false
  };

  reset = () => {
    this.setState(
      {
        win: '',
        boxes: emptyBoard(),
        winningThree: [],
        mySymbol: ['O', 'X'][Math.round(Math.random())],
        playing: false
      }
    );
  };

  start = () => {
    this.setState(
      {
        win: '',
        boxes: emptyBoard(),
        winningThree: [],
        myTurn: Boolean(Math.random() < 0.5),
        playing: true
      },
      () => {
        if (!this.state.myTurn) {
          this.finishTurn();
        }
      }
    );
  };

  changeSymbol = () => {
    const { mySymbol } = this.state;
    this.setState({
      mySymbol: mySymbol === 'X' ? 'O' : 'X'
    });
  };

  checkForThree = player => {
    const { boxes } = this.state;
    if (possibleThrees.some(combination => combination.every(boxNumber => boxes[boxNumber] === player))) {
      this.setState({
        win: player,
        winningThree: possibleThrees.find(combination =>
          combination.every(boxNumber => boxes[boxNumber] === player)
        ),
        playing: false
      });
    } else if (boxes.filter(box => box !== '').length > 8) {
      this.setState({ win: 'draw', playing: false });
    }
  };

  select = (index, player) => {
    const { win, boxes, myTurn } = this.state;
    if (win !== '') {
      return;
    } else {
      boxes[index] = player;
      this.setState({ boxes }, () => this.checkForThree(player));
      setTimeout(() => this.setState({ myTurn: !myTurn }), 500);
    }
  };

  selectBox = key => {
    const { win, boxes, myTurn, playing } = this.state;
    if (playing && myTurn && boxes[key] === '' && win === '') {
      this.select(key, 'me');
      this.checkForThree('me');
      if (win !== '') {
        return;
      } else {
        this.finishTurn();
      }
    }
  };

  finishTurn = () => {
    const { boxes } = this.state;
    const indices = Object.keys(boxes).filter(key => boxes[key] === '');
    let computerChoice;
    if (
      possibleThrees.some(
        combination =>
          combination.filter(boxNumber => boxes[boxNumber] === 'computer').length === 2 &&
          combination.filter(boxNumber => boxes[boxNumber] === '').length === 1
      )
    ) {
      const combos = possibleThrees.filter(
        combination =>
          combination.filter(boxNumber => boxes[boxNumber] === 'computer').length === 2 &&
          combination.filter(boxNumber => boxes[boxNumber] === '').length === 1
      );
      const randomCombo = combos[Math.floor(Math.random() * combos.length)];
      computerChoice = randomCombo.find(boxNumber => boxes[boxNumber] === '');
    } else if (
      possibleThrees.some(
        combination =>
          combination.filter(boxNumber => boxes[boxNumber] === 'me').length === 2 &&
          combination.filter(boxNumber => boxes[boxNumber] === '').length === 1
      )
    ) {
      const combos = possibleThrees.filter(
        combination =>
          combination.filter(boxNumber => boxes[boxNumber] === 'me').length === 2 &&
          combination.filter(boxNumber => boxes[boxNumber] === '').length === 1
      );
      const randomCombo = combos[Math.floor(Math.random() * combos.length)];
      computerChoice = randomCombo.find(boxNumber => boxes[boxNumber] === '');
    } else {
      computerChoice = indices[Math.floor(Math.random() * indices.length)];
    }
    setTimeout(this.select, 500, computerChoice, 'computer');
  };

  render() {
    const { mySymbol, win, winningThree, boxes, myTurn, playing } = this.state;
    const computerSymbol = mySymbol === 'X' ? 'O' : 'X';
    const boxSideLength = Math.min(window.innerWidth, window.innerHeight) / 4;

    return !playing && win === '' ? (
      <div className="setup">
        <div className="option-picker">
          <p>You are: {mySymbol}s</p>
          <Button onClick={this.changeSymbol} colour='yellow'>
            Choose {computerSymbol}s
          </Button>
        </div>
        <Button onClick={this.start}>Start Game</Button>
      </div>
    ) : (
      <div className="console">
        <div className="game">
          <div
            className="container"
            style={{
              gridTemplateColumns: `repeat(3, ${boxSideLength}px)`,
              gridTemplateRows: `repeat(3, ${boxSideLength}px)`
            }}
          >
            {winningThree.length > 0 ? (
              <svg className="path-container" width={boxSideLength * 3} height={boxSideLength * 3}>
                <line
                  x1={(winningThree[0] % 3) * boxSideLength + boxSideLength / 2}
                  y1={Math.floor(winningThree[0] / 3) * boxSideLength + boxSideLength / 2}
                  x2={(winningThree[2] % 3) * boxSideLength + boxSideLength / 2}
                  y2={Math.floor(winningThree[2] / 3) * boxSideLength + boxSideLength / 2}
                />
              </svg>
            ) : null}
            {boxes.map((index, key) => (
              <Box
                index={index}
                key={key}
                win={win}
                box={boxes[key]}
                mySymbol={mySymbol}
                computerSymbol={computerSymbol}
                selectBox={() => this.selectBox(key)}
              />
            ))}
          </div>
        </div>
        <div className="controls">
          <p>{myTurn ? 'Your turn' : "The computer's turn"}</p>
          <Button onClick={this.reset}>New Game</Button>
          {win === 'draw' ? (
            <h2>It's a draw</h2>
          ) : win === 'me' ? (
            <h2>You win!</h2>
          ) : win === 'computer' ? (
            <h2>The computer wins!</h2>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Noughts;
