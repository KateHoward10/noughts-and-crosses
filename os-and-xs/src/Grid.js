import React, { Component } from 'react';
import Box from './Box';

class Grid extends Component {
  state = {
    mySymbol: "X",
    computerSymbol: "O",
    win: "",
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
    const playedBoxes = this.props.boxes.filter(box => box.selected===player).map(box => box.index);
    if ((playedBoxes.indexOf(0)>-1 && playedBoxes.indexOf(1)>-1 && playedBoxes.indexOf(2)>-1)
      || (playedBoxes.indexOf(3)>-1 && playedBoxes.indexOf(4)>-1 && playedBoxes.indexOf(5)>-1)
      || (playedBoxes.indexOf(6)>-1 && playedBoxes.indexOf(7)>-1 && playedBoxes.indexOf(8)>-1)
      || (playedBoxes.indexOf(0)>-1 && playedBoxes.indexOf(3)>-1 && playedBoxes.indexOf(6)>-1)
      || (playedBoxes.indexOf(1)>-1 && playedBoxes.indexOf(4)>-1 && playedBoxes.indexOf(7)>-1)
      || (playedBoxes.indexOf(2)>-1 && playedBoxes.indexOf(5)>-1 && playedBoxes.indexOf(8)>-1)
      || (playedBoxes.indexOf(0)>-1 && playedBoxes.indexOf(4)>-1 && playedBoxes.indexOf(8)>-1)
      || (playedBoxes.indexOf(2)>-1 && playedBoxes.indexOf(4)>-1 && playedBoxes.indexOf(6)>-1)) {
      this.setState({ win: player })
    }
  }

  finishTurn = () => {
    this.checkForThree("me");
    this.props.swapTurn();
    const indices = this.props.boxes.filter(box => box.selected==="").map(box => box.index);
    const computerChoice = indices[Math.floor(Math.random() * indices.length)];
    this.props.selectBox(computerChoice, "computer");
    this.checkForThree("computer");
    this.props.swapTurn();
  }

  render() {
    return (
      <div className="game">
        <div>
          <p>You are: {this.state.mySymbol}s</p>
          <button onClick={this.changeSymbol}>Choose {this.state.computerSymbol}s instead</button>
          <h1>{this.state.win==="me" ? "You win!" : this.state.win==="computer" ? "The computer wins!" : ""}</h1>
        </div>
        <div className="container">
          {this.props.boxes.map((box, index) => <Box index={index} key={index} myTurn={this.props.myTurn} selected={box.selected} mySymbol={this.state.mySymbol} computerSymbol={this.state.computerSymbol} selectBox={this.props.selectBox} finishTurn={this.finishTurn} />)}
        </div>
      </div>
    );
  }
}

export default Grid;
