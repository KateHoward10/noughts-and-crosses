import React, { Component } from 'react';
import Box from './Box';

class Grid extends Component {
  state = {
    mySymbol: "X",
    computerSymbol: "O",
    win: "",
  }

  chooseSymbol = (event) => {
    this.setState({
      mySymbol: event.target.value,
      computerSymbol: event.target.value==="X" ? "O" : "X"
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
    console.log(this.props.boxes);
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
          <h2>Noughts and Crosses</h2>
          <p>Choose noughts or crosses...</p>
          <select name="symbol" onChange={this.chooseSymbol} >
            <option value="X">X</option>
            <option value="O">O</option>
          </select>
          <h2>{this.state.win==="me" ? "You win!" : this.state.win==="computer" ? "The computer wins!" : null}</h2>
          <h3>{this.props.myTurn ? "Your Turn" : "The Computer's Turn"}</h3>
          {this.props.myTurn ? <button onClick={this.finishTurn}>Finish Turn</button> : null}
        </div>
        <div className="container">
          {this.props.boxes.map((box, index) => <Box index={index} key={index} myTurn={this.props.myTurn} selected={box.selected} mySymbol={this.state.mySymbol} computerSymbol={this.state.computerSymbol} selectBox={this.props.selectBox} />)}
        </div>
      </div>
    );
  }
}

export default Grid;
