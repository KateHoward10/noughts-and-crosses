import React, { Component } from 'react';
import Box from './Box';

class Grid extends Component {
  state = {
    mySymbol: "X",
    computerSymbol: "O"
  }

  chooseSymbol = (event) => {
    this.setState({
      mySymbol: event.target.value,
      computerSymbol: event.target.value==="X" ? "O" : "O"
    });
  }

  finishTurn = () => {
    this.props.swapTurn();
    console.log(this.props.boxes);
    const indices = this.props.boxes.filter(box => box.selected==="").map(box => box.index);
    console.log(indices);
    const computerChoice = indices[Math.floor(Math.random() * indices.length)];
    console.log(computerChoice);
    this.props.selectBox(computerChoice, "computer");
    this.props.swapTurn();
  }

  render() {
    return (
      <div>
        <p>Choose noughts or crosses...</p>
        {this.props.myTurn ? <button onClick={this.finishTurn}>Finish Turn</button> : null}
        <select name="symbol" onChange={this.chooseSymbol} >
          <option value="X">X</option>
          <option value="O">O</option>
        </select>
        <h3>{this.props.myTurn ? "Your Turn" : "The Computer's Turn"}</h3>
        <div className="container">
          {this.props.boxes.map((box, index) => <Box index={index} key={index} myTurn={this.props.myTurn} selected={box.selected} mySymbol={this.state.mySymbol} computerSymbol={this.state.computerSymbol} selectBox={this.props.selectBox} />)}
        </div>
      </div>
    );
  }
}

export default Grid;
