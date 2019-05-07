import React, { Component } from 'react';
import Box from './Box';

class Grid extends Component {
  state = {
    mySymbol: "X",
    computerSymbol: "O",
    win: "",
    boxes: [
      {index: 0, selectedBy: ""},
      {index: 1, selectedBy: ""},
      {index: 2, selectedBy: ""},
      {index: 3, selectedBy: ""},
      {index: 4, selectedBy: ""},
      {index: 5, selectedBy: ""},
      {index: 6, selectedBy: ""},
      {index: 7, selectedBy: ""},
      {index: 8, selectedBy: ""}
    ],
    winningThree: []
  }

  changeSymbol = () => {
    const mySymbol = this.state.mySymbol;
    const computerSymbol = this.state.computerSymbol;
    this.setState({
      mySymbol: mySymbol==="X" ? "O" : "X",
      computerSymbol: computerSymbol==="X" ? "O" : "X"
    });
  }

  checkForThree = (player) => {
    const possibleThrees = [
      [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];
    if (possibleThrees.some(combination => combination.every(boxNumber => this.state.boxes[boxNumber]["selectedBy"]===player))) {
      this.setState({
        win: player,
        winningThree: possibleThrees.find(combination => combination.every(boxNumber => this.state.boxes[boxNumber]["selectedBy"]===player))
      });
    } else if (this.state.boxes.filter(box => box["selectedBy"]!=="").length>8) {
      this.setState({ win: "draw" });
    };
  }

  select = (index, player) => {
    if (this.state.win!=="") {
      return;
    } else {
      const boxes = [ ...this.state.boxes ];
      boxes[index].selectedBy = player;
      this.setState({ boxes });
    }
  }

  finishTurn = () => {
    const indices = Object.keys(this.state.boxes).filter(key => this.state.boxes[key]["selectedBy"]==="");
    const computerChoice = indices[Math.floor(Math.random() * indices.length)];
    setTimeout(this.select, 100, computerChoice, "computer");
    this.checkForThree("computer");
  }

  render() {
    return (
      <div className="game">
        <div className="controls">
          <p>You are: {this.state.mySymbol}s</p>
          <button onClick={this.changeSymbol}>Choose {this.state.computerSymbol}s instead</button>
        </div>
          {this.state.win==="draw" ? <h2>It's a draw</h2> : this.state.win==="me" ? <h2>You win!</h2> : this.state.win==="computer" ? <h2>The computer wins!</h2> : null}
          <div className="container">
            {this.state.winningThree.length ? <svg className="path-container" width="540" height="540">
              <line
                x1={((this.state.winningThree[0] % 3) * 180) + 90}
                y1={(Math.floor(this.state.winningThree[0] / 3) * 180) + 90}
                x2={((this.state.winningThree[2] % 3) * 180) + 90}
                y2={(Math.floor(this.state.winningThree[2] / 3) * 180) + 90}
              />
            </svg> : null}
            {Object.keys(this.state.boxes).map(key => <Box
              index={key}
              key={key}
              win={this.state.win}
              box={this.state.boxes[key]}
              mySymbol={this.state.mySymbol}
              computerSymbol={this.state.computerSymbol}
              select={this.select}
              checkForThree={this.checkForThree}
              finishTurn={this.finishTurn}
            />)}
        </div>
      </div>
    );
  }
}

export default Grid;
