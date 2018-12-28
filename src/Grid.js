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
    console.log(this.state.boxes);
    const possibleThrees = [
      [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];
    if (possibleThrees.some(combination => combination.every(boxNumber => this.state.boxes[boxNumber]["selectedBy"]===player))) {
      this.setState({ win: player });
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
    setTimeout(this.select, 500, computerChoice, "computer");
    this.checkForThree("computer");
  }

  render() {
    return (
      <div className="game">
        <div>
          <p>You are: {this.state.mySymbol}s</p>
          <button onClick={this.changeSymbol}>Choose {this.state.computerSymbol}s instead</button>
          <h1>{this.state.win==="draw" ? "It's a draw" : this.state.win==="me" ? "You win!" : this.state.win==="computer" ? "The computer wins!" : ""}</h1>
        </div>
        <div className="container">
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
