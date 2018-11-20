import React, { Component } from 'react';
import Box from './Box';

class Grid extends Component {
  state = {
    mySymbol: "X",
    computerSymbol: "O",
    win: "",
    boxes: [
      {
        selectedBy: "",
      },
      {
        selectedBy: "",
      },
      {
        selectedBy: "",
      },
      {
        selectedBy: "",
      },
      {
        selectedBy: "",
      },
      {
        selectedBy: "",
      },
      {
        selectedBy: "",
      },
      {
        selectedBy: "",
      },
      {
        selectedBy: "",
      }
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

  select = (index, player) => {
    if (this.state.boxes[index].selectedBy==="") {
      const boxes = { ...this.state.boxes };
      boxes[index].selectedBy = player;
      this.setState({ boxes });
    }
    console.log(this.state.boxes);
  }

  checkForThree = (player) => {
    const playedBoxes = this.state.boxes.filter(box => box.selectedBy===player).map((box, index) => index);
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
    const indices = this.state.boxes.filter(box => box.selectedBy==="").map((box, index) => index);
    console.log(indices);
    const computerChoice = indices[Math.floor(Math.random() * indices.length)];
    this.select(computerChoice, "computer");
    this.checkForThree("computer");
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
          {Object.keys(this.state.boxes).map((box, index) => <Box
            index={index}
            key={index}
            myTurn={this.props.myTurn}
            box={box}
            mySymbol={this.state.mySymbol}
            computerSymbol={this.state.computerSymbol}
            select={this.select}
            checkForThree={this.checkForThree}
            finishTurn={this.finishTurn} />)}
        </div>
      </div>
    );
  }
}

export default Grid;
