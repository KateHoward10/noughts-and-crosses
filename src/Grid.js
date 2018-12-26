import React, { Component } from 'react';
import Box from './Box';

class Grid extends Component {
  state = {
    mySymbol: "X",
    computerSymbol: "O",
    win: "",
    boxes: [
      {
        index: 0,
        selectedBy: "",
      },
      {
        index: 1,
        selectedBy: "",
      },
      {
        index: 2,
        selectedBy: "",
      },
      {
        index: 3,
        selectedBy: "",
      },
      {
        index: 4,
        selectedBy: "",
      },
      {
        index: 5,
        selectedBy: "",
      },
      {
        index: 6,
        selectedBy: "",
      },
      {
        index: 7,
        selectedBy: "",
      },
      {
        index: 8,
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
    if (this.state.win==="" && this.state.boxes[index]) {
      const boxes = [ ...this.state.boxes ];
      boxes[index].selectedBy = player;
      this.setState({ boxes });
    }
  }

  checkForThree = (player) => {
    const playedBoxes = Object.keys(this.state.boxes).filter(key => this.state.boxes[key]["selectedBy"]===player);
    const fullBoxes = Object.keys(this.state.boxes).filter(key => this.state.boxes[key]["selectedBy"]!=="");
    console.log(fullBoxes.length);
    if (fullBoxes.length>8) {
      this.setState({
        win: "draw"
      })
    }
    if ((playedBoxes.indexOf("0")>-1 && playedBoxes.indexOf("1")>-1 && playedBoxes.indexOf("2")>-1)
      || (playedBoxes.indexOf("3")>-1 && playedBoxes.indexOf("4")>-1 && playedBoxes.indexOf("5")>-1)
      || (playedBoxes.indexOf("6")>-1 && playedBoxes.indexOf("7")>-1 && playedBoxes.indexOf("8")>-1)
      || (playedBoxes.indexOf("0")>-1 && playedBoxes.indexOf("3")>-1 && playedBoxes.indexOf("6")>-1)
      || (playedBoxes.indexOf("1")>-1 && playedBoxes.indexOf("4")>-1 && playedBoxes.indexOf("7")>-1)
      || (playedBoxes.indexOf("2")>-1 && playedBoxes.indexOf("5")>-1 && playedBoxes.indexOf("8")>-1)
      || (playedBoxes.indexOf("0")>-1 && playedBoxes.indexOf("4")>-1 && playedBoxes.indexOf("8")>-1)
      || (playedBoxes.indexOf("2")>-1 && playedBoxes.indexOf("4")>-1 && playedBoxes.indexOf("6")>-1)) {
      this.setState({
        win: player
      })
    }
  }

  finishTurn = () => {
    this.checkForThree("me");
    if (this.state.win==="") {
      const indices = Object.keys(this.state.boxes).filter(key => this.state.boxes[key]["selectedBy"]==="");
      const computerChoice = indices[Math.floor(Math.random() * indices.length)];
      this.select(computerChoice, "computer");
      this.checkForThree("computer");
    }
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
            myTurn={this.props.myTurn}
            box={this.state.boxes[key]}
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
